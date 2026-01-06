# 🤖 AI Frontend Debugger

> **Record, replay, and debug frontend sessions with AI-powered insights**

A powerful debugging tool that captures user interactions, replays sessions with detailed timelines, and provides intelligent bug analysis using Groq AI.

![AI Frontend Debugger](https://img.shields.io/badge/Status-MVP%20Complete-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Groq AI](https://img.shields.io/badge/Groq-AI%20Powered-purple)

---

## ✨ Features

### 🎯 **Session Recording**
- **Automatic event tracking**: Clicks, inputs, navigation, API calls, and errors
- **Lightweight SDK**: Non-intrusive, production-ready tracking
- **Real-time data flushing**: Events sent every 3 seconds

### 📺 **Timeline Replay**
- **Visual event timeline**: Step-by-step user journey
- **Detailed event inspector**: View complete event data
- **Color-coded events**: Easy identification (clicks, inputs, errors, API calls)

### 🤖 **AI-Powered Analysis**
- **Individual error analysis**: Root cause, impact, and fix suggestions
- **Session health overview**: Overall assessment with key issues
- **Intelligent recommendations**: Prioritized action items
- **Severity classification**: Low, Medium, High, Critical

### 📊 **Dashboard**
- **Session management**: Browse all recorded sessions
- **Quick stats**: Events, errors, and activity at a glance
- **Search & filter**: Find specific sessions easily

---

## 🏗️ Architecture

```
ai-fe-debugger/
├── backend/          # Express + TypeScript API
│   ├── src/
│   │   ├── controllers/    # API endpoints
│   │   ├── services/       # Business logic (AI analysis)
│   │   ├── routes/         # Route definitions
│   │   └── storage/        # In-memory data store
│   └── package.json
│
├── frontend/         # Next.js 15 + TypeScript
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── store/            # Zustand state management
│   └── package.json
│
└── sdk/              # Tracking SDK
    ├── src/
    │   └── index.ts      # Event tracking logic
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**
- **Groq API Key** (free from [console.groq.com](https://console.groq.com))

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/ai-fe-debugger.git
cd ai-fe-debugger
```

### 2️⃣ Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

**SDK:**
```bash
cd sdk
npm install
npm run build
```

### 3️⃣ Configure Environment Variables

Create `backend/.env`:
```env
PORT=4000
FRONTEND_URL=http://localhost:3000
GROQ_API_KEY=your_groq_api_key_here
```

Get your Groq API key:
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up (free, no credit card)
3. Navigate to API Keys
4. Create new key and copy it

### 4️⃣ Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

### 5️⃣ Test the Application

1. **Visit the landing page**: `http://localhost:3000`
2. **Click "View Dashboard"** to see sessions
3. **Go to Demo page**: `http://localhost:3000/demo`
4. **Interact with buttons**: Click, type, trigger errors
5. **Return to dashboard**: See your session recorded!
6. **Click on a session**: View timeline and AI analysis

---

## 📖 Usage Guide

### Integrating the SDK in Your App

Add the SDK to your Next.js app:

```tsx
// app/layout.tsx
import { SDKProvider } from '@/components/providers/SDKProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SDKProvider apiUrl="http://localhost:4000">
          {children}
        </SDKProvider>
      </body>
    </html>
  );
}
```

The SDK will automatically track:
- ✅ Click events
- ✅ Input/form changes
- ✅ Navigation
- ✅ JavaScript errors
- ✅ API calls (fetch/XHR)

### Using AI Analysis

**Analyze Individual Errors:**
```bash
GET /api/sessions/:sessionId/analyze
```

**Get Session Health Insights:**
```bash
GET /api/sessions/:sessionId/insights
```

**Response Example:**
```json
{
  "sessionId": "session_xxx",
  "errorCount": 1,
  "analyses": [
    {
      "eventId": 5,
      "analysis": {
        "summary": "Uncaught error in user interaction",
        "rootCause": "Function called without proper error handling",
        "impact": "Crashes app, frustrates users",
        "suggestedFix": "Implement try-catch blocks",
        "severity": "medium"
      }
    }
  ]
}
```


---

## 🛠️ Tech Stack

### Backend
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Type-safe development
- **Groq SDK** - AI analysis (Llama 3.3 70B)
- **In-memory storage** - Fast prototyping (can be replaced with PostgreSQL)

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **date-fns** - Date formatting

### SDK
- **TypeScript** - Compiled to vanilla JS
- **Lightweight** - < 5KB gzipped
- **Non-blocking** - Async event tracking

---

## 🧪 API Endpoints

### Events API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events` | Ingest tracking events |
| GET | `/api/sessions` | List all sessions |
| GET | `/api/sessions/:id` | Get session details |

### AI Analysis API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sessions/:id/analyze` | Analyze session errors |
| GET | `/api/sessions/:id/insights` | Get session health insights |

---

## 🔮 Future Enhancements

### Phase 2 - Database & Persistence
- [ ] PostgreSQL integration
- [ ] Session filtering & search
- [ ] Data retention policies
- [ ] Export sessions (JSON/PDF)

### Phase 3 - Advanced Features
- [ ] Real-time session monitoring
- [ ] User flow visualization
- [ ] Heatmaps & click tracking
- [ ] Performance metrics
- [ ] Custom event tracking

### Phase 4 - Production Ready
- [ ] Authentication & authorization
- [ ] Multi-tenant support
- [ ] Rate limiting
- [ ] CDN for SDK distribution
- [ ] Webhook integrations

### Phase 5 - Analytics
- [ ] Funnel analysis
- [ ] Cohort analysis
- [ ] A/B testing integration
- [ ] Custom dashboards

---

## 📊 7-Day MVP Development

✅ **Day 1**: Project setup (Backend, Frontend, SDK)  
✅ **Day 2**: Events API with in-memory storage  
✅ **Day 3**: Sessions dashboard & timeline UI  
✅ **Day 4**: SDK integration & live tracking  
✅ **Day 5**: Groq AI integration (error analysis)  
✅ **Day 6**: Session insights & 2-column AI layout  
✅ **Day 7**: Polish, README, and GitHub push  

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Groq** - Lightning-fast AI inference
- **Next.js** - Amazing React framework
- **Vercel** - Deployment platform
- **Tailwind CSS** - Beautiful styling

---

## 📧 Contact

**Your Name** - [@midhat]

**Project Link**: [https://github.com/midhat81/ai-fe-debugger](https://github.com/midhat81/ai-fe-debugger)

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐️!

---

**Built with ❤️ and ☕ by Muhammad Midhat**