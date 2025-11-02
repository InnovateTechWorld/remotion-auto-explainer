# 🚀 AI Educational Video Generator

This Node.js project creates interactive 1-minute landscape educational videos locally on your machine. Enter a prompt, generate a script with custom SVGs using Google Gemini AI, and render a dynamic video with Remotion, D3, Rough.js, and Framer Motion.

---

## 📽️ Key Features

- 🎥 **Video Generation**: Built with [Remotion](https://remotion.dev) for local video rendering (1920x1080 landscape).
- 🧠 **Script Writing**: Uses **Google Gemini AI** to generate engaging narratives and custom animated SVGs.
- 📊 **Interactive Elements**: Integrates **D3** for charts, **Rough.js** for sketches, **Framer Motion** for animations.
- 🌐 **Web Interface**: Simple HTML form to input prompts and generate videos.
- 💻 **Local Operation**: Everything runs locally, no cloud services required.
- 📁 **Unique Naming**: Videos named based on prompt with timestamp, no overwrites.

---

## 🛠️ Tech Stack

| Feature               | Technology               |
|----------------------|--------------------------|
| Backend              | Node.js, Express         |
| Video                | Remotion                 |
| AI Scripting         | Gemini AI                |
| Charts               | D3                      |
| Sketches             | Rough.js                |
| Animations           | Framer Motion           |

---

## ⚙️ How It Works

1. ✍️ User enters a prompt in the web interface.
2. 🧠 Generate video script with custom SVGs using Gemini AI.
3. 🎬 Render interactive video locally using Remotion with D3 charts, Rough sketches, and Framer animations.
4. 📁 Video saved as [prompt]_[timestamp].mp4 in public folder.

---

## 🔐 Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key_here

🧪 Local Development

git clone https://github.com/CoderAyushman/auto-shorts.git
cd auto-shorts
npm install
npm install d3 roughjs framer-motion
npm install --save-dev @types/d3
npm start

Open http://localhost:4000 in browser, enter prompt, generate 1-min video.

🧑‍🚀 Author
Ayushman
Enhanced for interactive educational videos ✨
