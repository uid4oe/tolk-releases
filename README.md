# tolk

System-wide dictation, writing tools, and meeting workflows for macOS.
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
Results appear in the card as generation progresses when the connection supports streaming.
Replace requires a supported editable selection. Copy also works with read-only selections.
Customize the actions in Settings.

## Speech engines

| Engine | Purpose |
|---|---|
| Parakeet Ultra | Default on Apple Silicon; multilingual recognition |
| Parakeet Redux | Smaller Parakeet alternative |
| Apple Speech | Built-in on-device recognition |

Downloadable engines require model files during setup.
Recording and transcription run on the device.

## AI processing

Use installed Claude Code or Codex CLIs with their existing subscription login.
Install and sign in through the command first, then add its connection in Tolk.
CLI connections send text to their provider servers. Account limits still apply.
Tolk does not store CLI login credentials.

API-key connections include OpenAI, Anthropic, Google Gemini, xAI, OpenRouter, and custom OpenAI-compatible endpoints.
Cloud providers can require your own credentials and charge for use.
Ollama and available Apple Intelligence offer local processing options.
Settings separates provider connections, model selection, reasoning options, and processing behavior.

Vocabulary entries preserve names and technical terms during AI processing.
Cloud AI receives those entries with the text submitted for processing.

## Meetings

Record your microphone or your microphone with system audio.
Meetings use the input device selected in Dictation.
System capture includes application audio and requests macOS permission when needed.
Pause and resume recording, then transcribe saved audio with your local speech engine.
Completed audio parts and transcription progress remain available after interruption.

Correct transcript passages, then prepare cited notes and work briefs through your chosen AI connection.
Recording and transcription work without AI processing.
Review statements and source evidence before copying a brief or exporting the meeting.
Exports contain readable Markdown and versioned JSON. Audio is excluded.
Take prepared work to the human or agent workflow you prefer.

## Privacy and local data

Audio capture runs during recording. Speech recognition runs locally.
Optional cloud AI receives submitted text and the applicable instructions through API or CLI connections.
History stores transcription records locally. Manage those records in Settings → History.
Meetings retain audio, transcripts, and prepared work on the Mac until you delete or export them.
Provider credentials stay in an owner-only file on the Mac.
Diagnostics include local timing and error logs.

## Distribution

Tolk is closed source.
This repository contains the download page, release information, and update feed.
Release assets contain the compiled app and required runtime resources.
The private application source, development files, and signing keys are not distributed.
GitHub's automatic source archives contain only this public repository's metadata.
