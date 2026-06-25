# spaKo

spaKo is a polished, modern language-learning and translation web app designed to help users practice languages, translate text, and track their progress in one place.

## Overview

spaKo combines:
- a landing page and authentication flow
- a translation experience with history and text-to-speech support
- a learning center with language selection and lesson structure
- a dashboard for progress tracking and daily goals

The project is built as a lightweight static web application using HTML, CSS, and JavaScript.

## Features

- Responsive landing page with hero section and feature highlights
- User authentication pages for login and registration
- Dashboard with learning stats, progress indicators, and quick access cards
- Translator with sample translations, history, copy/download/share actions, and voice input support
- Learning center with multiple languages, levels, and lesson cards
- Local storage-based demo behavior for user state, streaks, and translation history

## Project Structure

- index.html – home/landing page
- dashboard.html – main user dashboard
- translator.html – translation interface
- learning.html – language learning center
- login.html – login page
- register.html – registration page
- css/style.css – shared styles
- js/main.js – shared UI behavior and helpers
- js/translator.js – translation logic and UI interactions

## Getting Started

Since this is a static site, you can run it locally in either of these ways:

1. Open any page directly in a browser, such as index.html
2. Or serve the project from the root folder with a simple local server, for example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage for simple demo persistence

## Notes

- This project is currently a frontend demo and uses sample content and mock interactions.
- Some features, such as authentication and translation APIs, are implemented as frontend demos and can be extended with a backend or real API integration.

## License

This project is for educational and demonstration purposes.
