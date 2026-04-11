# tolk

A lightweight, system-wide macOS app for seamless dictation and writing tools.

---

## What it does

Tolk gives you two hotkey-driven modes that work in any app:

### Dictation
Press and hold your dictate hotkey → speak → release → your words are transcribed and typed directly into whatever app is active. No clicking, no switching windows.

Hotkey mode is configurable: use press-and-hold or toggle (press to start, press to stop).

### Quick Action
Select any text → press your ask hotkey → an inline card appears near the selection with one-tap writing tools:

| Action | What it does |
|---|---|
| **Fix** | Fix grammar, spelling, and punctuation |
| **Shorten** | Trim while preserving meaning |
| **Formal** | Rewrite in a professional tone |
| **Summarize** | Condense to 1–2 sentences |
| **Continue** | Keep writing from where you left off |

Or skip the chips and speak a custom instruction — tolk will apply it using your configured AI provider. Results stream inline; choose to replace, copy, or retry.

Quick actions are fully customizable in Settings.

---

## Speech Models

Tolk runs transcription on-device. Pick the model that fits your needs:

| Model | Languages | Size |
|---|---|---|
| **Parakeet TDT v3** *(recommended)* | 25 languages | ~500 MB |
| **Parakeet TDT v2** | English | ~500 MB |
| **Whisper Base** | 99 languages | ~150 MB |
| **Apple Speech** | 60+ languages | Built-in |

All models run locally — audio never leaves your machine.

---

## AI Providers

Quick Action and AI post-processing support any of these providers:

- **Apple Intelligence** — on-device, free, no API key required
- **OpenAI** — GPT-4.1, o3, and more
- **Anthropic** — Claude Sonnet, Opus, Haiku
- **Google Gemini** — Gemini 2.5 Flash and Pro
- **xAI** — Grok models
- **OpenRouter** — unified access to 200+ models
- **Ollama** — run models locally
- **Custom** — any OpenAI-compatible endpoint

Configure multiple providers and switch between them in Settings.

---

## Install

1. Download the latest `.dmg` from [Releases](https://github.com/uid4oe/tolk-releases/releases)
2. Open the `.dmg` and drag **Tolk** to your Applications folder
3. Launch Tolk and follow the setup assistant (permissions + speech model + AI provider)

Tolk auto-updates in the background via Sparkle — you'll be notified when a new version is available.

---

## Privacy

- Audio is captured only while your hotkey is held (or during a toggle session) and processed entirely on-device
- Transcribed text is never stored or sent anywhere unless you explicitly use an AI provider
- AI providers are opt-in and only receive the text you choose to transform
