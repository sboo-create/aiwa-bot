import React, { useEffect, useState } from "react";
import { TMAProvider, Page, Text, Tappable } from "../lib/tma";
import { AiwaSequence } from "../components/AiwaSequence";
import { AIWA_CARD_SEQUENCE_FRAMES } from "../lib/sequence";
import { CrossIcon } from "../lib/icons";
import { apiCall, showToast, call } from "../lib/api";

export function ChatScreen({ initialMessages = [] }) {
  const [messages, setMessages] = useState(() => initialMessages.map((message, index) => ({
    id: `initial-${index}`,
    role: message.role === "user" ? "user" : "assistant",
    text: message.text || "",
    suggestions: [],
  })));
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const recorderRef = React.useRef(null);
  const endRef = React.useRef(null);

  useEffect(() => {
    if (!messages.length) {
      setMessages([{
        id: "hello",
        role: "assistant",
        text: "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",
        suggestions: ["Можно ли тренироваться?", "Что съесть сегодня?", "Как моё самочувствие?"],
      }]);
    }
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [messages, busy]);

  const send = async (message = value) => {
    const text = String(message || "").trim();
    if (!text || busy) return;
    setValue("");
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: "user", text, suggestions: [] }]);
    setBusy(true);
    const result = await apiCall("/api/chat", { message: text }).catch(() => null);
    setMessages((current) => [...current, {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: result?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: result?.suggestions || [],
    }]);
    setBusy(false);
  };

  const uploadVoice = async (blob, type) => {
    setBusy(true);
    const form = new FormData();
    form.append("initData", window.aiwaInit || "");
    form.append("audio", blob, type?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const response = await fetch("/api/voice", { method: "POST", body: form });
      const result = await response.json();
      if (result.transcript) setMessages((current) => [...current, { id: `voice-${Date.now()}`, role: "user", text: result.transcript, suggestions: [] }]);
      setMessages((current) => [...current, {
        id: `voice-answer-${Date.now()}`,
        role: "assistant",
        text: result.answer || "Не получилось распознать голос.",
        suggestions: result.suggestions || [],
      }]);
    } catch {
      showToast("Не получилось отправить голос", { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  const toggleVoice = async () => {
    if (recording) {
      recorderRef.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      showToast("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data?.size) chunks.push(event.data); };
      recorder.onstop = () => {
        setRecording(false);
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        if (blob.size > 900) uploadVoice(blob, recorder.mimeType);
      };
      recorder.start();
      setRecording(true);
    } catch {
      showToast("Нет доступа к микрофону", { type: "error" });
    }
  };

  return (
    <TMAProvider>
      <Page mode="secondary">
        <div className="aiwa-chat-screen">
          <div className="aiwa-chat-header">
            <AiwaSequence size={50} frames={AIWA_CARD_SEQUENCE_FRAMES} pauseMs={0} />
            <div>
              <Text variant="title3" weight="semibold">Айва</Text>
              <Text variant="caption1" weight="regular">учитывает твои данные</Text>
            </div>
            <Tappable as="button" type="button" mode="opacity" className="aiwa-sheet-close" aria-label="Закрыть чат" onClick={() => call("go", "today")}>
              <CrossIcon />
            </Tappable>
          </div>
          <div className="aiwa-chat-messages">
            {messages.map((message) => (
              <div className={message.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai"} key={message.id}>
                <Text variant="body" weight="regular">{message.text}</Text>
                {message.suggestions?.length ? (
                  <div className="aiwa-chat-suggestions">
                    {message.suggestions.slice(0, 3).map((suggestion) => (
                      <Tappable as="button" type="button" mode="opacity" onClick={() => send(suggestion)} key={suggestion}>
                        <Text variant="caption1" weight="semibold">{suggestion}</Text>
                      </Tappable>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {busy ? <div className="aiwa-chat-bubble is-ai"><Text variant="body" weight="regular">Айва думает…</Text></div> : null}
            <span ref={endRef} />
          </div>
          <div className="aiwa-chat-composer">
            <input
              value={value}
              placeholder="Спроси Айву…"
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") send(); }}
            />
            <Tappable as="button" type="button" mode="opacity" className={recording ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon"} aria-label="Голос" onClick={toggleVoice}>
              <Text variant="body" weight="semibold">{recording ? "■" : "Голос"}</Text>
            </Tappable>
            <Tappable as="button" type="button" mode="opacity" className="aiwa-chat-send" aria-label="Отправить" onClick={() => send()}>
              <Text variant="title3" weight="semibold">↑</Text>
            </Tappable>
          </div>
        </div>
      </Page>
    </TMAProvider>
  );
}
