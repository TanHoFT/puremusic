# PureMusic V3 — Audio Lab

Upload 5 files in this ZIP to the **root** of `TanHoFT/puremusic`, replacing existing files. GitHub Pages: Settings → Pages → main / (root).

## Included
Cloud OAuth integration retained from V2 (Google Drive + Microsoft OneDrive; public Client IDs must be configured separately); full-screen player; offline IndexedDB; 5-band Web Audio parametric EQ, preamp, balance, mono, crossfeed, WAV convolution IR; audio routing information with honest limitations; optional LRCLIB lyrics lookup; settings and presets.

## Known limitations
Cloud OAuth is not configured automatically and has not been end-to-end verified. Playback downloads entire files before starting, which can use substantial memory. Safari may not decode some FLAC/ALAC files. PWA cannot guarantee bit-perfect, DSD/DoP, identify exact Bluetooth codec, or directly Cast to Google Home Mini. AirPlay is controlled through iOS. DSP depends on Web Audio support and can affect background playback and routing. Cover art metadata is not yet extracted. Offline tracks require current session library indexing to appear. No user files or credentials are embedded.
