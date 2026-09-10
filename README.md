# WEBooked

Modern web design and client booking studio landing page with a lead generation form.

## Overview

A responsive single-page landing site built with Tailwind CSS featuring a consultation form that submits to a Make.com (Integromat) webhook.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/knots11521/Webooked.git
cd WEBooked
```

### 2. Configure your webhook URL

Create a `.env` file in the project root:

```bash
touch .env
```

Add your Make.com webhook URL:

```
WEBHOOK_URL=https://hook.us2.make.com/your-webhook-id-here
```

### 3. Generate config.js

The `.env` file is git-ignored. Run the build script to generate `config.js` (also git-ignored) which contains the webhook URL as a JavaScript constant:

```bash
node build.js
```

> On Vercel, this step runs automatically during deployment.

### 4. Open locally

Open `index.html` in your browser. The form submits via `fetch()` to the webhook URL defined in `config.js`.

## Deployment (Vercel)

1. Push to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add:

   | Name | Value |
   |------|-------|
   | `WEBHOOK_URL` | `https://hook.us2.make.com/your-webhook-id` |

4. Deploy. Vercel runs `npm run build` (executes `build.js`) which generates `config.js` from the environment variable.

## How the form works

- The HTML `<form>` has `action=""` (intentionally empty).
- `script.js` intercepts the submit event, collects form data, and sends it via `fetch()` to the `WEBHOOK_URL` from `config.js`.
- On success, the user is redirected to `thank-you.html`.
- On failure, an error alert is shown and the submit button is restored.

## Files

| File | Description |
|------|-------------|
| `index.html` | Landing page markup |
| `script.js` | Form submission logic (reads `WEBHOOK_URL` from `config.js`) |
| `build.js` | Generates `config.js` from `.env` or Vercel env vars |
| `vercel.json` | Vercel static-build configuration |
| `package.json` | Build script for `npm run build` |
| `.env` | Local environment variables (git-ignored) |
| `.env.example` | Example environment template (git-ignored) |
| `config.js` | Generated at build time from env vars (git-ignored) |
