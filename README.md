# PostVoice ✍️
> LinkedIn posts that sound like **you** — not AI.

## The Problem
Every LinkedIn post generator on the market produces the same generic, buzzword-filled output. PostVoice is different: it studies your past writing and generates posts that genuinely match your tone, rhythm, and personality.

## How It Works
1. **Paste 2–3 of your past LinkedIn posts** — the AI analyses your writing DNA
2. **Tell it what to post about** and choose a post type
3. **Get a post** written in your voice, not a template

## Project Structure
```
postvoice/
├── public/
│   └── index.html
├── src/
│   ├── components/         # One component per step + shared UI
│   │   ├── StepIndicator.jsx
│   │   ├── Step1PastPosts.jsx
│   │   ├── Step2Topic.jsx
│   │   ├── Step3Loading.jsx
│   │   └── Step4Result.jsx
│   ├── constants/
│   │   └── postTypes.js    # Post type definitions (single source of truth)
│   ├── hooks/
│   │   └── usePostGenerator.js  # All state & generation logic
│   ├── styles/
│   │   └── global.css      # CSS variables + global resets
│   ├── utils/
│   │   ├── analyzeStyle.js  # Writing style analyser
│   │   ├── buildPrompt.js   # Hyper-specific prompt builder
│   │   └── claudeApi.js     # Anthropic API wrapper
│   ├── App.jsx              # Root — thin orchestrator only
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started
```bash
npm install
npm run dev
```

### Setup API Key
1. Get a free **Gemini API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env` file in the project root:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Restart the dev server and you're ready to generate posts!

## Tech Stack
- **React 18** — UI framework
- **Vite** — dev server & bundler  
- **Gemini 2.5 Flash API** — AI post generation
- **CSS Variables** — theming & responsive design

## Roadmap
- [ ] LinkedIn data export (CSV) parser
- [ ] Tone slider (casual ↔ professional)
- [ ] Post history & saved drafts
- [ ] Character limit warning (LinkedIn = 3000 chars)
- [ ] Dark/light theme toggle
- [ ] Post scheduling integration
- [ ] Hashtag recommendations
