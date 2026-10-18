# PureMusic V5 — Google Drive sign-in fix

Upload all five files to the root of GitHub repository `puremusic`, replacing existing files. Do not upload ZIP directly. The Google OAuth public Client ID is already configured. No client secret is included.

Google sign-in uses Google Identity Services token client (popup), not authorization-code exchange. Open https://tanhoft.github.io/puremusic/ in Safari, tap Google Drive, authorize, then Choose Google Drive Folder > Music > Follow Folder.

The Google token expires and must be requested again. If Safari blocks the popup, retry directly in Safari rather than an embedded browser. The PWA cannot guarantee native FLAC decoding or Google Cast.

The Microsoft OneDrive login remains unchanged and has not been independently tested. No cloud credentials are stored in the repository. Audio files remain in the user's Drive.
