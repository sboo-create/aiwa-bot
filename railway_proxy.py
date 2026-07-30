"""Тонкий reverse-proxy для Railway на время миграции на i167.

После T0 Railway-сервис worker-production запускает этот файл вместо
aiwa_bot.py (override start command: `python railway_proxy.py`). Сервис
сохраняет свой публичный домен, поэтому Mini App и все ранее отправленные
inline-кнопки продолжают работать, а реальное приложение живёт на i167.

Конфигурация:
- AIWA_PROXY_TARGET — базовый URL приложения на i167
  (например https://aiwa-candidate-167.158-160-163-167.sslip.io);
- PORT — порт, который слушает Railway (выдаётся платформой).

Прокси не хранит состояние, не видит секретов приложения и не пишет на диск.
"""
import asyncio
import logging
import os

import aiohttp
from aiohttp import web

log = logging.getLogger("railway-proxy")

TARGET = os.environ.get("AIWA_PROXY_TARGET", "").rstrip("/")

# hop-by-hop заголовки не пересылаются (RFC 9110 §7.6.1)
_HOP_BY_HOP = {
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailers", "transfer-encoding", "upgrade", "host", "content-length",
}


def _forward_headers(headers, client_ip=None, proto=None):
    out = {k: v for k, v in headers.items() if k.lower() not in _HOP_BY_HOP}
    if client_ip:
        prior = headers.get("X-Forwarded-For")
        out["X-Forwarded-For"] = f"{prior}, {client_ip}" if prior else client_ip
    if proto:
        out["X-Forwarded-Proto"] = proto
    return out


async def _handle(request: web.Request) -> web.StreamResponse:
    url = TARGET + request.rel_url.raw_path
    if request.rel_url.query_string:
        url += "?" + request.rel_url.query_string
    peer = request.remote
    headers = _forward_headers(
        request.headers, client_ip=peer,
        proto=request.headers.get("X-Forwarded-Proto", "https"),
    )
    body = None
    if request.body_exists:
        body = await request.read()
    session = request.app["client"]
    try:
        async with session.request(
            request.method, url, headers=headers, data=body,
            allow_redirects=False,
        ) as upstream:
            resp = web.StreamResponse(status=upstream.status)
            for k, v in upstream.headers.items():
                if k.lower() not in _HOP_BY_HOP:
                    resp.headers[k] = v
            await resp.prepare(request)
            async for chunk in upstream.content.iter_chunked(64 * 1024):
                await resp.write(chunk)
            await resp.write_eof()
            return resp
    except (aiohttp.ClientError, asyncio.TimeoutError) as exc:
        log.warning("upstream error for %s %s: %s", request.method, url, exc)
        return web.json_response({"status": "upstream_unavailable"}, status=502)


async def _make_app() -> web.Application:
    # loopback-http разрешён только для тестов; production-цель всегда https
    if not (TARGET.startswith("https://") or TARGET.startswith("http://127.0.0.1")):
        raise RuntimeError("AIWA_PROXY_TARGET must be an https:// base URL")
    app = web.Application(client_max_size=64 * 1024 * 1024)
    # auto_decompress=False: тело ответа передаётся байт-в-байт вместе с
    # Content-Encoding, прокси не перепаковывает контент.
    # skip_auto_headers: пересылается ровно клиентский Accept-Encoding, иначе
    # клиент без поддержки сжатия получит сжатое тело.
    app["client"] = aiohttp.ClientSession(
        timeout=aiohttp.ClientTimeout(total=300, connect=10),
        auto_decompress=False,
        skip_auto_headers=("Accept-Encoding",),
    )
    async def _close_client(app):
        await app["client"].close()
    app.on_cleanup.append(_close_client)
    app.router.add_route("*", "/{tail:.*}", _handle)
    return app


def main():
    logging.basicConfig(level=logging.INFO)
    port = int(os.environ.get("PORT", "8080"))
    log.info("railway proxy -> %s on :%s", TARGET, port)
    web.run_app(_make_app(), host="0.0.0.0", port=port)  # nosec B104


if __name__ == "__main__":
    main()
