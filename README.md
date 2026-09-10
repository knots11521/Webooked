# WEBooked

Modern web design and client booking studio landing page with a lead generation form that submits to a Make.com webhook via a secure serverless function proxy.

## Overview

A responsive single-page landing site built with Tailwind CSS featuring a consultation form. The form submits to a Vercel serverless function (`/api/submit`) that validates input, checks for spam, and forwards the data to your Make.com webhook — keeping the webhook URL hidden from the client.

## Security features

- **Webhook URL never exposed to the browser** — stays server-side in Vercel Environment Variables
- **Honeypot anti-spam field** — hidden field that bots fill in but humans can't see
- **Server-side validation** — required fields, email format, and input length checks
- **Error masking** — generic error messages that don't leak server internals

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

### 3. Deploy to Vercel

1. Push to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `WEBHOOK_URL` | `https://hook.us2.make.com/your-webhook-id` | Production, Preview, Development |

4. Deploy.

For local testing, install the [Vercel CLI](https://vercel.com/docs/cli) and run `vercel dev` — it loads `.env` automatically.

## How the form works

1. User fills in the form (name, email, business, service).
2. `script.js` intercepts the submit and sends the data via `fetch()` to `/api/submit`.
3. `api/submit.js` (serverless function) validates the data and checks the honeypot field.
4. On validation success, the webhook URL from `WEBHOOK_URL` env var is used to forward the data.
5. On success, the user is redirected to `thank-you.html`.

## Project structure

```
├── index.html          # Landing page with lead form
├── script.js           # Client-side form submission logic
├── api/
│   └── submit.js       # Vercel serverless function (validation + webhook proxy)
├── thank-you.html      # Thank you page
├── package.json        # Project metadata
└── .env.example        # Example environment template (git-ignored)
```

## Development

```bash
# Install Vercel CLI
npm install -g vercel

# Run locally (serves static files + serverless function)
vercel dev
```

Visit `http://localhost:3000` to test the form locally.
