# tolk

A lightweight, system-wide macOS app. Press a hotkey to start recording, press again to stop — tolk transcribes and types into whatever app is active.

---

## Demo

| Dictation | Quick Action |
|:---:|:---:|
| ![Dictation demo](media/dictation-demo.gif) | ![Quick Action demo](media/quickaction-demo.gif) |
| Press hotkey → speak → press again → typed | Select text → press hotkey → edit inline |

---

## What it does

tolk gives you two hotkey-driven modes that work in any app:

### Dictation
Press your hotkey → speak → press again → your words are transcribed and typed directly into whatever app is active. No clicking, no switching windows.

Hold the toggle-off press past the long-press threshold to auto-send (press Return after pasting).

### Quick Action
Select any text → press your hotkey → an inline card appears near the selection with one-tap writing tools:

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

## Vocabulary

Add proper nouns, names, or technical terms that the model should keep spelled correctly when AI post-processing is on. Each entry is a canonical spelling plus an optional one-line hint to disambiguate from common-word collisions.

| Term | Hint |
|---|---|
| **Claude** | Anthropic's AI; not "cloud" |
| **Parakeet** | Speech model name; not the bird |
| **TanStack** | JavaScript library family |

Vocabulary terms are injected into the system prompt your AI provider sees during dictation cleanup and Quick Action rewrites — no ASR-layer customization, just LLM-layer hints. Entries never leave your machine unless you've enabled an external AI provider.

---

## Speech Models

tolk runs transcription on-device. Pick the model that fits your needs:

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
3. Launch tolk and follow the setup assistant (permissions + speech model + AI provider)

tolk auto-updates in the background via Sparkle — you'll be notified when a new version is available.

### First Launch — Gatekeeper

tolk is not notarized by Apple. macOS will block it on the first launch with a security warning.

**Option 1 — right-click to open (recommended):**
1. Open Finder → Applications
2. Right-click **Tolk** → **Open**
3. Click **Open** in the security dialog (one-time prompt)

**Option 2 — Terminal:**
```bash
xattr -dr com.apple.quarantine /Applications/Tolk.app
```

After either step, tolk opens normally on every subsequent launch.

---

## Privacy

- Audio is captured only during an active recording session and processed entirely on-device
- Transcribed text is never stored or sent anywhere unless you explicitly use an AI provider
- AI providers are opt-in and only receive the text you choose to transform
