# New Project Structure Documentation

## Overview
The PostVoice project has been restructured to follow modern best practices with clear separation of concerns, feature-based organization, and shared utilities.

## Root-Level Files

```
postvoice/
├── .env                    ← Environment variables (NOT in git)
├── .env.example            ← Example env file (in git)
├── .gitignore              ← Git ignore rules
├── README.md               ← Project documentation
├── STRUCTURE.md            ← This file
├── package.json            ← Root package (optional, for monorepo setup)
├── client/                 ← Frontend
├── server/                 ← Backend
└── shared/                 ← Shared code
```

All environment variables are configured in `.env` at the **root level**, not in client/ or server/ folders.

### `/shared`
Shared code between client and server:
- **constants/**: Application-wide constants (post types, etc.)
- **types/**: TypeScript/JSDoc type definitions
- **validators/**: Input validation logic

### `/client/src`
React frontend application:

#### `features/postGenerator/`
Main feature module for post generation:
- **components/**: React components (Step1-4, StepIndicator)
- **hooks/**: Custom React hooks (usePostGenerator)
- **services/**: API calls (apiService)
- **utils/**: Helper functions (analyzeStyle, buildPrompt)

#### `shared/`
Shared client-side components and utilities:
- **components/**: Reusable UI components
- **hooks/**: Shared custom hooks
- **utils/**: Shared helper functions

#### `pages/`
Page-level components (future expansion)

#### `styles/`
Global and component-scoped styles

### `/server/src`
Node.js/Express backend:

#### `api/posts/`
Post generation API:
- **controller.js**: Request handlers (business logic)
- **routes.js**: Express route definitions
- Future: `service.js` for complex business logic

#### `services/`
External service integrations:
- **claudeService.js**: Claude API integration

#### `middleware/`
Express middleware:
- **rateLimit.js**: Rate limiting middleware

#### `config/`
Configuration management:
- **env.js**: Environment variable validation

#### `utils/`
Shared utilities:
- **errorHandler.js**: Error handling middleware

## File Organization Rules

### Root Level
- `.env` - Actual environment variables (never commit)
- `.env.example` - Template for environment setup (committed to git)
- `.gitignore` - Git ignore rules for entire project
- `README.md` - Project documentation
- `STRUCTURE.md` - Structure guide

### Client-Side
1. **Components** live in `features/[featureName]/components/`
2. **Hooks** live in `features/[featureName]/hooks/`
3. **Services** (API calls) live in `features/[featureName]/services/`
4. **Utils** live in `features/[featureName]/utils/`
5. Shared items go in `shared/[type]/`

### Server-Side
1. **Routes** in `api/[resource]/routes.js`
2. **Controllers** in `api/[resource]/controller.js`
3. **Services** in `services/`
4. **Middleware** in `middleware/`
5. **Config** in `config/`
6. **Utils** in `utils/`

## Import Paths

### From Client to Shared
```javascript
import { POST_TYPES } from "../../../../../shared/constants/postTypes";
import { validatePost } from "../../../../../shared/validators/postValidator";
```

### Within Client Features
```javascript
import { usePostGenerator } from "../hooks/usePostGenerator";
import { buildPrompt } from "../utils/buildPrompt";
import { generateWithClaude } from "../services/apiService";
```

### Within Server
```javascript
import { generatePost } from "../../services/claudeService";
import { validatePrompt } from "../../../../../shared/validators/postValidator";
```

## Adding New Features

### To add a new feature (e.g., "postAnalytics"):
1. Create: `client/src/features/postAnalytics/`
2. Create subdirectories: `components/`, `hooks/`, `services/`, `utils/`
3. Import shared code from `../../../../../shared/`
4. Export main hook/component from feature

### To add a new API resource (e.g., "comments"):
1. Create: `server/src/api/comments/`
2. Create: `routes.js`, `controller.js`
3. Create corresponding service in `services/` if needed
4. Mount in `server/src/app.js`: `app.use("/api/comments", commentsRoutes)`

## Getting Started

1. **Copy Environment Template**
   ```bash
   cp .env.example .env
   ```

2. **Add Your API Key**
   Edit `.env` and add your Google Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```

3. **Install Dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. **Start Development**
   ```bash
   # Terminal 1
   cd server && npm run dev
   
   # Terminal 2
   cd client && npm run dev
   ```

- [ ] Add absolute path aliases in `vite.config.js` and `jsconfig.json`
- [ ] Add TypeScript support
- [ ] Add unit tests structure (`__tests__` folders)
- [ ] Add shared hooks in `client/src/shared/hooks/`
- [ ] Add shared components in `client/src/shared/components/`
- [ ] Add comprehensive error boundaries

## Legacy Support

The server maintains backward compatibility with old `/api/generate` endpoint, automatically redirecting to `/api/posts/generate`.
