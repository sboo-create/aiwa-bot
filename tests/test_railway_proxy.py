import asyncio
import json
import unittest

from aiohttp import web, ClientSession

import railway_proxy


async def _echo(request):
    body = await request.read()
    return web.json_response({
        "method": request.method,
        "path": request.rel_url.raw_path,
        "query": dict(request.rel_url.query),
        "body": body.decode("utf-8", "replace"),
        "init_data": request.headers.get("X-Telegram-Init-Data", ""),
        "xff": request.headers.get("X-Forwarded-For", ""),
    })


async def _run_case(check):
    upstream = web.Application()
    upstream.router.add_route("*", "/{tail:.*}", _echo)
    up_runner = web.AppRunner(upstream)
    await up_runner.setup()
    up_site = web.TCPSite(up_runner, "127.0.0.1", 0)
    await up_site.start()
    up_port = up_runner.addresses[0][1]

    railway_proxy.TARGET = "http://127.0.0.1:%d" % up_port
    proxy_app = await railway_proxy._make_app()
    px_runner = web.AppRunner(proxy_app)
    await px_runner.setup()
    px_site = web.TCPSite(px_runner, "127.0.0.1", 0)
    await px_site.start()
    px_port = px_runner.addresses[0][1]

    try:
        async with ClientSession() as session:
            await check(session, "http://127.0.0.1:%d" % px_port)
    finally:
        await px_runner.cleanup()
        await up_runner.cleanup()


class RailwayProxyTest(unittest.TestCase):
    def test_get_with_query_and_headers(self):
        async def check(session, base):
            async with session.get(
                base + "/api/data?day=2026-07-30",
                headers={"X-Telegram-Init-Data": "sig"},
            ) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(await resp.text())
            self.assertEqual(data["method"], "GET")
            self.assertEqual(data["path"], "/api/data")
            self.assertEqual(data["query"], {"day": "2026-07-30"})
            self.assertEqual(data["init_data"], "sig")
            self.assertTrue(data["xff"])
        asyncio.run(_run_case(check))

    def test_post_body_roundtrip(self):
        async def check(session, base):
            payload = json.dumps({"title": "Творог", "grams": 200})
            async with session.post(base + "/api/meal", data=payload) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(await resp.text())
            self.assertEqual(data["method"], "POST")
            self.assertEqual(json.loads(data["body"])["grams"], 200)
        asyncio.run(_run_case(check))

    def test_rejects_non_https_production_target(self):
        railway_proxy.TARGET = "http://evil.example"
        with self.assertRaises(RuntimeError):
            asyncio.run(railway_proxy._make_app())
