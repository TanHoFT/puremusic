# PureMusic V6 — Cinematic Player

Upload all 8 files to the root of the existing GitHub repository `TanHoFT/puremusic`, replacing files with the same names. Do not upload the ZIP itself. GitHub Pages will publish automatically.

New: cinematic fullscreen player, actual audio-frequency bars via Web Audio Analyser (when the AudioContext runs), FLAC Vorbis tags and embedded cover parsing, Google Drive `cover.jpg`/`folder.jpg` fallback, exact-match iTunes album art when metadata includes artist, LRCLIB synced/static lyrics, lyric preview and fullscreen synchronized lyrics, dynamic background from cover colors.

Existing Google Drive login, folder selection, OneDrive, offline, and Audio Lab are preserved. Google OAuth tokens are not embedded in the ZIP. The Google OAuth Client ID is public and is preconfigured as in V5.

Limitations: internet artwork and lyrics depend on external catalogs and metadata; remixes or files without artists may have no reliable match. Safari may restrict audio analysis, autoplay and FLAC playback. Frequency bars represent real audio only when Web Audio initializes; otherwise a low idle pattern appears. This release has passed JavaScript syntax checks but has not been end-to-end tested on an iPhone with the user's Drive.
