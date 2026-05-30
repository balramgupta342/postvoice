# PostVoice ✍️ 

> **Generate authentic LinkedIn posts that sound exactly like you**  
> Using AI to analyze your writing style and create posts that match your unique voice.

## 🎯 What is PostVoice?

PostVoice solves a real problem: Every LinkedIn post generator produces the same generic, buzzword-filled content. Not PostVoice.

Simply paste 2-3 of your previous posts, choose a topic, and PostVoice will generate a new post that sounds authentically like you — not AI-generated. We analyze your tone, rhythm, emoji usage, sentence structure, and personality to match your exact voice.

## ✨ Key Features

✅ **Voice Analysis** - Studies your past posts to understand your writing style  
✅ **AI Generation** - Uses Google Gemini to create authentic posts  
✅ **Style Matching** - Preserves your tone, emojis, length, and personality  
✅ **6 Post Types** - Achievement, Story, Tip, Hot Take, Gratitude, Question  
✅ **Rate Limited** - Server-side protection against abuse  
✅ **Secure** - API keys never exposed to the frontend  

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- Google Gemini API key ([get one free](https://console.cloud.google.com))

### Setup (3 steps)

```bash
# 1. Configure environment
cp .env.example .env
# Edit .env and add your VITE_GEMINI_API_KEY

# 2. Install dependencies
cd client && npm install
cd ../server && npm install

# 3. Start development
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

Open **http://localhost:5173** in your browser.

## 📁 Project Structure

```
postvoice/
├── .env                ← Configuration (root level)
├── .gitignore          ← Git rules
├── README.md           ← This file
├── STRUCTURE.md        ← Old structure guide
├── PROJECT_STRUCTURE.md ← New clean structure
│
├── client/             ← React frontend
│   ├── src/
│   │   ├── features/postGenerator/  ← Main feature
│   │   ├── shared/                  ← Shared utilities
│   │   └── styles/
│   └── package.json
│
├── server/             ← Express backend
│   ├── src/
│   │   ├── api/posts/               ← API endpoints
│   │   ├── services/                ← Gemini integration
│   │   ├── middleware/              ← Rate limiting
│   │   └── config/                  ← Configuration
│   └── package.json
│
└── shared/             ← Shared code
    ├── constants/
    ├── types/
    └── validators/
```

**See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed guide.**

## 🔧 How It Works

### Step 1: Paste Your Posts
Upload 2-3 of your previous LinkedIn posts. PostVoice analyzes:
- Emoji frequency
- Sentence length
- Tone (casual vs professional)
- Opening/closing patterns
- Hashtag usage

### Step 2: Choose Topic & Type
- Enter what you want to post about
- Select from 6 post types (Achievement, Story, etc.)

### Step 3: AI Generation
- Server builds a detailed prompt about your writing style
- Sends to Google Gemini API
- Returns your unique post

### Step 4: Copy & Post
- Review the generated post
- Copy to clipboard
- Paste on LinkedIn

## 📡 API Endpoints

### POST `/api/posts/generate`
Generates a LinkedIn post

**Request:**
```json
{
  "prompt": "Detailed prompt with style analysis and content"
}
```

**Response:**
```json
{
  "result": "Your generated LinkedIn post text"
}
```

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Vite (build tool)
- CSS-in-JS (inline styles)

**Backend:**
- Express.js
- Google Gemini API
- CORS for security
- Rate limiting middleware

**Shared:**
- JSDoc type definitions
- Input validators
- Constants

## 🌟 Project Quality

✅ **Clean Structure** - Feature-based organization  
✅ **Separation of Concerns** - Clear layers (components, services, utils)  
✅ **Shared Code** - DRY principle with shared validators & constants  
✅ **Scalable** - Easy to add new features and endpoints  
✅ **Secure** - Environment variables, CORS, rate limiting  
✅ **Type Safety** - JSDoc types (ready for TypeScript)  
✅ **Error Handling** - Centralized middleware  

## 📚 Documentation

- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Clean organizational structure
- **[STRUCTURE.md](./STRUCTURE.md)** - (Legacy) Feature organization guide
- **[.env.example](./.env.example)** - Environment configuration template

## 🔐 Security

🔒 API keys stored server-side only  
🔒 Rate limiting on all endpoints  
🔒 Input validation (client & server)  
🔒 CORS configured for development  
🔒 Environment variables git-ignored  

## 🚀 Future Roadmap

- [ ] TypeScript migration
- [ ] Unit tests (Jest)
- [ ] E2E tests (Playwright)
- [ ] Docker setup
- [ ] User accounts & history
- [ ] Multiple API provider support
- [ ] Batch post generation

## 💡 Tips for Best Results

1. **Quality Past Posts** - Use posts that represent your authentic voice
2. **Variety** - Include different post types in your samples
3. **Detail** - The more description in your topic, the better
4. **Regenerate** - If results don't match, try again (randomness helps)

## 📊 Performance

- **Frontend Load** - < 1 second (Vite optimized)
- **API Response** - 3-10 seconds (Gemini processing)
- **Rate Limit** - 10 requests/minute per IP

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

## 📄 License

MIT - Use freely, modify as needed

---

**Built with ❤️ by a LinkedIn content creator**  
*Making authentic LinkedIn growth easier, one voice at a time.*


The project has been reorganized into a clean, scalable structure:

```
postvoice/
├── shared/                    # Shared code between client & server
│   ├── constants/            # Global constants (post types)
│   ├── types/                # Type definitions
│   └── validators/           # Shared validation logic
│
├── client/                   # React frontend
│   └── src/
│       ├── features/         # Feature-based organization
│       │   └── postGenerator/
│       │       ├── components/    # UI components
│       │       ├── hooks/         # Custom React hooks
│       │       ├── services/      # API calls
│       │       └── utils/         # Helper functions
│       ├── shared/           # Shared components/utilities
│       ├── pages/            # Page-level components
│       └── styles/           # Global styles
│
└── server/                   # Node.js/Express backend
    ├── src/
    │   ├── api/             # API routes & controllers
    │   ├── services/        # External services (Claude API)
    │   ├── middleware/      # Express middleware
    │   ├── config/          # Configuration
    │   └── utils/           # Helper functions
    └── index.js             # Entry point
```

See [STRUCTURE.md](./STRUCTURE.md) for detailed documentation.

## ✨ Features

- **Voice Analysis**: Analyzes your past LinkedIn posts to understand your writing style
- **AI Generation**: Uses Google Gemini API to generate authentic posts matching your tone
- **Style Matching**: Preserves your emoji usage, length, punctuation, and personality
- **Multi-Type Support**: Supports 6 post types (Achievement, Story, Tip, Hot Take, Gratitude, Question)
- **Rate Limited**: Server-side rate limiting to prevent abuse

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Google Gemini API key (get one at https://console.cloud.google.com)

### Setup

1. **Clone & Install**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Configure Environment**
   ```bash
   # At root level
   cp .env.example .env
   # Edit .env and add your VITE_GEMINI_API_KEY
   ```

3. **Start Development Servers**
   ```bash
   # Terminal 1: Start backend (port 3001)
   cd server && npm run dev
   
   # Terminal 2: Start frontend (port 5173)
   cd client && npm run dev
   ```

4. **Open Browser**
   - Visit http://localhost:5173

## 📁 Project Organization

### Client Structure
Each feature is self-contained with its own components, hooks, services, and utilities:

```
features/postGenerator/
├── components/          # React components
│   ├── Step1PastPosts.jsx
│   ├── Step2Topic.jsx
│   ├── Step3Loading.jsx
│   ├── Step4Result.jsx
│   └── StepIndicator.jsx
├── hooks/              # Custom hooks
│   └── usePostGenerator.js
├── services/           # API integration
│   └── apiService.js
└── utils/              # Helper functions
    ├── analyzeStyle.js
    └── buildPrompt.js
```

### Server Structure
Organized by API resource with clear separation:

```
src/
├── api/posts/
│   ├── routes.js       # Route definitions
│   └── controller.js    # Request handlers
├── services/
│   └── claudeService.js # External APIs
├── middleware/
│   └── rateLimit.js    # Rate limiting
└── config/
    └── env.js          # Configuration
```

## 🔧 Development

### Adding a New Feature (Client)

1. Create the feature directory:
   ```bash
   mkdir -p client/src/features/newFeature/{components,hooks,services,utils}
   ```

2. Create your components, hooks, and services
3. Import shared constants: `import { POST_TYPES } from "../../../../../shared/constants/postTypes"`
4. Export feature hook for use in App.jsx

### Adding a New API Endpoint (Server)

1. Create the API module:
   ```bash
   mkdir -p server/src/api/newResource
   ```

2. Create `routes.js` and `controller.js`
3. Register in `server/src/app.js`:
   ```javascript
   import newRoutes from "./src/api/newResource/routes.js";
   app.use("/api/newResource", newRoutes);
   ```

## 📝 API Endpoints

### POST `/api/posts/generate`
Generates a LinkedIn post using Google Gemini API

**Request:**
```json
{
  "prompt": "Detailed prompt for Gemini to generate post"
}
```

**Response:**
```json
{
  "result": "Generated LinkedIn post text"
}
```

**Error Responses:**
- `400`: Invalid or missing prompt
- `429`: Too many requests (rate limited)
- `502`: AI service error
- `500`: Server error

### GET `/api/health`
Health check endpoint

## 🛠️ Key Improvements in Restructured Version

✅ **Better Organization**: Feature-based structure makes code easier to find and maintain
✅ **Separation of Concerns**: Clear layers (components, hooks, services, utils)
✅ **Shared Code**: Common constants and validators in one place
✅ **Scalability**: Easy to add new features and API resources
✅ **Type Safety**: Prepared for TypeScript migration with type definitions
✅ **Error Handling**: Centralized error handling middleware
✅ **Environment Config**: Proper .env management at root level with validation
✅ **Backward Compatibility**: Old `/api/generate` endpoint redirects to new location
✅ **Gemini API**: Using Google Gemini for reliable, cost-effective AI generation

## 🚀 Future Enhancements

- [ ] Add TypeScript support
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Configure path aliases for cleaner imports
- [ ] Add ESLint & Prettier configuration
- [ ] Docker setup for containerization
- [ ] CI/CD pipeline configuration

## 📚 Documentation

- [Project Structure Details](./STRUCTURE.md) - Detailed direc
- [Root .gitignore](./.gitignore) - Git ignore rules for the entire projecttory structure guide
- [Environment Setup](./.env.example) - Configuration examples

## 🔐 Security Notes

- API keys are NEVER exposed to the client
- Rate limiting prevents API abuse
- Input validation on both client
- .env file excluded from git (see .gitignore) and server
- CORS configured for development

## 📄 License

MIT

---

**Built with ❤️ using React, Express, and Claude AI**
