# 🚀 AI Educational Video Generator

This Node.js project creates interactive 1-minute landscape educational videos locally on your machine. Enter a prompt, generate a script with custom SVGs and voiceover using Google Gemini AI, and render a dynamic video with Remotion, D3, Rough.js, and Framer Motion.

---

## 📽️ Key Features

- 🎥 **Video Generation**: Built with [Remotion](https://remotion.dev) for local video rendering (1920x1080 landscape).
- 🧠 **Script Writing**: Uses **Google Gemini AI** to generate engaging narratives, custom animated SVGs, and voiceover text.
- 🔊 **Voiceover**: AI-generated audio using Gemini TTS for each scene.
- 📊 **Interactive Elements**: Integrates **D3** for charts, **Rough.js** for sketches, **Framer Motion** for animations.
- 🌐 **Web Interface**: Simple HTML form to input prompts and generate videos.
- 💻 **Local Operation**: Everything runs locally, no cloud services required.
- 📁 **Unique Naming**: Videos named based on prompt with timestamp, no overwrites.
- 🎨 **Custom Illustrations**: Multiple animated SVGs per scene with educational visuals.

---

## 🛠️ Tech Stack

| Feature               | Technology               |
|----------------------|--------------------------|
| Backend              | Node.js, Express         |
| Video                | Remotion                 |
| AI Scripting         | Gemini AI                |
| Voiceover            | Gemini TTS               |
| Charts               | D3                      |
| Sketches             | Rough.js                |
| Animations           | Framer Motion           |

---

## ⚙️ How It Works

1. ✍️ User enters a prompt in the web interface.
2. 🧠 Generate video script with custom SVGs and voiceover using Gemini AI.
3. 🔊 Generate audio for each scene using Gemini TTS.
4. 🎬 Render interactive video locally using Remotion with D3 charts, Rough sketches, Framer animations, and synced audio.
5. 📁 Video saved as [prompt]_[timestamp].mp4 in public folder.

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

Open http://localhost:4000 in browser, enter prompt, generate 1-min video with voiceover.

🧑‍🚀 Author
Ayushman
Enhanced for interactive educational videos with voiceover ✨
