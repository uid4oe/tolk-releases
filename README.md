# tolk

System-wide dictation and writing tools for macOS.
Press your shortcut, speak, and press again to paste the transcript into the active app.

[Download the latest release](https://github.com/uid4oe/tolk-releases/releases/latest).

## Requirements and installation

The distributed app requires Apple Silicon and macOS 15 or later.
Apple Intelligence also requires macOS 26 and supported hardware.

1. Download the DMG from Releases.
2. Open the DMG and drag tolk into Applications.
3. Open tolk and complete setup.
4. Allow microphone and Accessibility access when macOS requests them.
5. Choose a speech engine and your shortcut.

These releases are not notarized by Apple.
If macOS blocks the first launch, use System Settings → Privacy & Security → Open Anyway.
Sparkle checks for signed updates after installation.

## Dictation

The shortcut starts and stops recording.
Tolk transcribes speech on the device and pastes the result into the frontmost application.
Optional AI processing cleans up the transcript before insertion.
Hold the stop press past the long-press threshold to send Return after pasting.

## Quick Actions

Select text and press the shortcut to open writing tools when AI is available.
Choose an action or speak a custom instruction.
Results stream into the card.
Replace requires a supported editable selection. Copy also works with read-only selections.
Customize the actions in Settings.

## Speech engines

| Engine | Purpose |
|---|---|
| Parakeet Ultra | Default on Apple Silicon; multilingual recognition |
| Parakeet Redux | Smaller Parakeet alternative |
| Parakeet v2 and v3 | Existing model choices remain available |
| Whisper Base | Multilingual recognition through whisper.cpp |
| Apple Speech | Built-in on-device recognition |

Downloadable engines require model files during setup.
Recording and transcription run on the device.

## AI processing

Use Apple Intelligence, OpenAI, Anthropic, Google Gemini, xAI, OpenRouter, Ollama, or a custom OpenAI-compatible endpoint.
Settings separates provider connections, model selection, reasoning options, and processing behavior.
Suggested models use current provider capabilities. Exact model IDs remain available for compatible endpoints.
Cloud providers require your own credentials and may charge for use.
Ollama and Apple Intelligence offer local processing options.

Vocabulary entries preserve names and technical terms during AI processing.
Cloud AI receives those entries with the text submitted for processing.

## Privacy and local data

Audio capture runs during recording. Speech recognition runs locally.
Optional cloud AI receives the transcript or selected text and the applicable instructions.
History stores transcription records locally. Manage those records in Settings → History.
Provider credentials stay in an owner-only file on the Mac.
Diagnostics include local timing and error logs.

## Distribution

Tolk is closed source.
This repository contains the download page, release information, and update feed.
Release assets contain the compiled app and required runtime resources.
The private application source, development files, and signing keys are not distributed.
GitHub's automatic source archives contain only this public repository's metadata.
