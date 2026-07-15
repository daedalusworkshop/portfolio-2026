# Kasra Radio

Kasra Radio is a curated hosted program, not a general music library. The homepage entry starts the program; the provider in the app shell keeps the widget alive while visitors browse between pages.

Audio files can be added under `public/audio/kasra-radio/` and referenced from `src/lib/radio.ts`. Until final recordings are present, segments without `src` render their metadata and keep the widget stable with a skip path.

Manual verification:

- Activate Kasra Radio from the homepage entry.
- Confirm the widget persists after visiting `/art/poetry` and `/about/philosophy`.
- Hover and keyboard-focus the widget to reveal now playing, back, play/pause, skip, and progress.
- Check the homepage and widget at desktop and mobile widths.
