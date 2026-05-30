# PostVoice - Project Structure Guide

## Clean, Organizational Project Layout

```
postvoice/                          ← Root (Organization Level)
│
├── 📄 .env                         ← Environment variables (LOCAL ONLY - .gitignored)
├── 📄 .env.example                 ← Template for developers
├── 📄 .gitignore                   ← Git rules for entire project
├── 📄 README.md                    ← Main project documentation
├── 📄 STRUCTURE.md                 ← This file - detailed structure guide
├── 📄 package.json                 ← Optional root package (for monorepo)
│
├── 📁 shared/                      ← Shared code between client & server
│   ├── constants/
│   │   └── postTypes.js            ← Post type definitions
│   ├── types/
│   │   └── index.js                ← Type definitions
│   └── validators/
│       └── postValidator.js        ← Input validation logic
│
├── 📁 client/                      ← React Frontend
│   ├── 📄 package.json             ← Client dependencies
│   ├── 📄 vite.config.js           ← Vite configuration
│   ├── 📄 index.html               ← HTML entry
│   │
│   ├── 📁 public/                  ← Static assets
│   │
│   └── 📁 src/                     ← Source code
│       ├── 📄 App.jsx              ← Main app component
│       ├── 📄 main.jsx             ← React entry point
│       │
│       ├── 📁 features/            ← Feature modules
│       │   └── postGenerator/
│       │       ├── components/
│       │       │   ├── Step1PastPosts.jsx
│       │       │   ├── Step2Topic.jsx
│       │       │   ├── Step3Loading.jsx
│       │       │   ├── Step4Result.jsx
│       │       │   └── StepIndicator.jsx
│       │       ├── hooks/
│       │       │   └── usePostGenerator.js
│       │       ├── services/
│       │       │   └── apiService.js    ← API calls to backend
│       │       └── utils/
│       │           ├── analyzeStyle.js
│       │           └── buildPrompt.js
│       │
│       ├── 📁 shared/              ← Shared client utilities
│       │   ├── components/
│       │   ├── hooks/
│       │   └── utils/
│       │
│       ├── 📁 pages/               ← Page-level components (for future)
│       │
│       └── 📁 styles/
│           └── global.css          ← Global styles
│
└── 📁 server/                      ← Express Backend
    ├── 📄 package.json             ← Server dependencies
    ├── 📄 index.js                 ← Entry point
    │
    └── 📁 src/                     ← Source code
        ├── 📄 app.js               ← Express app setup
        │
        ├── 📁 api/                 ← API routes by resource
        │   └── posts/
        │       ├── routes.js       ← Route definitions
        │       └── controller.js    ← Request handlers
        │
        ├── 📁 services/            ← External services
        │   └── claudeService.js    ← Gemini API integration
        │
        ├── 📁 middleware/          ← Express middleware
        │   └── rateLimit.js        ← Rate limiting
        │
        ├── 📁 config/              ← Configuration
        │   └── env.js              ← Environment validation
        │
        └── 📁 utils/               ← Utilities
            └── errorHandler.js     ← Error handling
```

## Key Principles

### 1️⃣ **Root Level Configuration**
- **`.env`** - Actual secrets (never commit, in .gitignore)
- **`.env.example`** - Template for developers (committed)
- **`.gitignore`** - Covers entire project
- **No env files in client/ or server/**

### 2️⃣ **Package Management**
- Each folder has its own `package.json` (client and server are separate npm packages)
- Root `package.json` optional for monorepo setup

### 3️⃣ **Feature-Based Organization**
- Client code organized by features (postGenerator, etc.)
- Each feature has: components, hooks, services, utils
- Shared code goes to `client/src/shared/`

### 4️⃣ **API & Service Layer**
- Server routes organized by resource (`api/posts/`)
- Services handle external API integration (Gemini)
- Controllers handle request/response logic
- Middleware for cross-cutting concerns (rate limiting)

### 5️⃣ **No Duplication**
- Configuration files only at root
- No duplicate .gitignore files
- No duplicate README files
- Old folder structures removed (middleware/, routes/ are now in src/)

## File Purposes

| File/Folder | Purpose | Location |
|-------------|---------|----------|
| `.env` | Environment secrets | Root (git ignored) |
| `.env.example` | Template for setup | Root (committed) |
| `.gitignore` | Git ignore rules | Root |
| `README.md` | Main documentation | Root |
| `STRUCTURE.md` | This guide | Root |
| `client/package.json` | Frontend dependencies | Client |
| `server/package.json` | Backend dependencies | Server |
| `client/src/features/` | Feature modules | Client |
| `server/src/api/` | API routes | Server |
| `server/src/services/` | External services | Server |
| `shared/` | Shared code | Project root |

## Adding New Features

### Add a New Client Feature
```bash
client/src/features/newFeature/
├── components/
├── hooks/
├── services/
└── utils/
```

### Add a New API Endpoint
```bash
server/src/api/newResource/
├── routes.js
└── controller.js
```

## Environment Setup

1. Copy template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add API key:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```

3. Both client and server read from root `.env`

## Clean Separation

- **client/** - Frontend code only
- **server/** - Backend code only  
- **shared/** - Code used by both
- **root/** - Configuration & documentation
- **Old folders removed:** middleware/, routes/, individual .env files

This structure makes it easy to:
- 🎯 Find code by feature
- 📦 Add new features without clutter
- 🔐 Manage secrets securely
- 🚀 Scale the application
- 👥 Work in teams efficiently
