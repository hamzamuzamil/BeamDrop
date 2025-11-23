# 🐼 BeamDrop

**Drop it. Beam it. Done.**

A cute, playful, premium peer-to-peer file-sharing application with a friendly panda mascot. BeamDrop uses WebRTC to transfer files directly between browsers — no servers, no storage, just direct beaming.

## ✨ Features

* **Direct P2P Transfers** — Files are beamed directly from your browser to the recipient's browser using WebRTC. No intermediary servers.
* **Cute & Playful UI** — Soft bamboo/panda-inspired design with smooth animations and friendly microcopy.
* **Premium Experience** — Apple-like minimal interface with beautiful gradients and glassmorphism effects.
* **Dark Mode** — Deep navy to purple gradients with glowing accents for a premium feel.
* **Password Protection** — Optional password protection for your beams.
* **Multiple Files** — Upload multiple files at once, which downloaders receive as a zip file.
* **Mobile Support** — Works on most mobile browsers, including Mobile Safari.
* **Real-time Progress** — Monitor transfer progress with animated beam indicators.
* **No Storage** — Files never touch a server. Everything is peer-to-peer.

## 🚀 Quick Start

```bash
$ git clone https://github.com/hamzamuzamil/fileshare.git
$ cd fileshare
$ pnpm install
$ pnpm dev
```

Visit `http://localhost:3000` and start beaming files!

## 🐼 How It Works

1. **Drop** a file (or multiple files) on the BeamDrop interface
2. **Beam** it by sharing the generated link with your recipient
3. **Done!** The panda handles the rest — files transfer directly between browsers

The panda mascot will guide you through the process with friendly animations and helpful messages.

## 🛠️ Development

```bash
$ pnpm install
$ pnpm dev      # Start development server
$ pnpm build    # Build for production
$ pnpm start    # Start production server
```

## 🐳 Docker

```bash
$ pnpm docker:build
$ pnpm docker:up
$ pnpm docker:down
```

## 🎨 Tech Stack

* **Next.js** — React framework with server-side rendering
* **Tailwind CSS** — Utility-first CSS with custom BeamDrop theme
* **TypeScript** — Type-safe development
* **React** — UI library
* **PeerJS** — WebRTC peer-to-peer connections
* **View Transitions** — Smooth page transitions
* **Redis** (optional) — Out-of-process state storage

## ⚙️ Configuration

The server can be customized with the following environment variables:

- `REDIS_URL` – Connection string for a Redis instance used to store channel metadata. If not set, BeamDrop falls back to in-memory storage.
- `COTURN_ENABLED` – When set to `true`, enables TURN support for connecting peers behind NAT.
- `TURN_HOST` – Hostname or IP address of the TURN server. Defaults to `127.0.0.1`.
- `TURN_REALM` – Realm used when generating TURN credentials. Defaults to `beamdrop.app`.
- `STUN_SERVER` – STUN server URL to use when `COTURN_ENABLED` is disabled. Defaults to `stun:stun.l.google.com:19302`.

## ❓ FAQ

**How are my files sent?** Your files are beamed directly from your browser to the downloader's browser. They never pass through our servers. BeamDrop uses WebRTC to send files. This requires that the uploader leave their browser window open until the transfer is complete.

**Can multiple people download my file at once?** Yes! Just send them your short or long URL. The panda can handle multiple beams at once!

**How big can my files be?** As big as your browser can handle. The panda doesn't judge!

**What happens when I close my browser?** The URLs for your files will no longer work. If a downloader has completed the transfer, that downloader will continue to seed to incomplete downloaders, but no new downloads may be initiated.

**Are my files encrypted?** Yes, all WebRTC communications are automatically encrypted using public-key cryptography because of DTLS. You can add an optional password to your upload for an extra layer of security.

**Why a panda?** Pandas are cute, friendly, and great at beaming files! 🐼

## 📄 License

BeamDrop is released under the BSD 3-Clause license.
