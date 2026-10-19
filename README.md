# PureMusic 11.4.0 – Next-track preparation (beta)

- Removed duplicate download arrow from track menu.
- Preloads one upcoming track (up to 90 MB) while foreground execution is available, and reuses the downloaded Blob at transition.
- Existing queue and playback controls remain.

**Important:** Safari iOS may suspend JavaScript in the background, including the `ended` handler. Prefetching cannot guarantee continuous next-track playback while locked. A truly reliable background playlist needs a native iOS playback engine or a compatible continuous media stream. This build is not verified on an iPhone.
