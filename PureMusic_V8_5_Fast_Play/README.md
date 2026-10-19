# PureMusic V8.5 — Fast Play
by Ho Tan

## Changes
- Reuse simultaneous cloud file downloads (prevents duplicate download for playback and metadata).
- Cache the next track in memory up to 35 MB, with option in Settings to disable prefetch.
- Skip outdated playback requests when rapidly switching tracks.
- Report measured wait time from tap to playback.
- Maintain offline storage, cloud logins, library, Audio Lab, lyrics and existing player.

## Limitations
Google Drive OAuth downloads still fetch the complete FLAC before playback. This update does **not** implement true HTTP Range streaming or guarantee gapless playback. Prefetch may use mobile data and extra memory. Safari/iOS may limit background activity.

Upload all five files to GitHub Pages. Do not upload the ZIP itself.
