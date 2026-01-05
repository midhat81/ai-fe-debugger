# 🤖 AI Frontend Debugger

AI-powered session replay and debugging tool for frontend applications. Track user interactions, replay sessions, and get intelligent bug explanations.

## 🚀 Features

- 📹 **Session Recording** - Capture clicks, inputs, API calls, and errors
- ⏱️ **Timeline Replay** - Step-by-step session playback
- 🤖 **AI Analysis** - Intelligent bug explanations powered by GPT-4
- 📊 **Dashboard** - Beautiful UI to browse and analyze sessions

## 🏗️ Architecture

- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **SDK**: Lightweight browser script (~10KB)

## 📦 Project Structure
```
ai-fe-debugger/
├── backend/         # Express API server
├── frontend/        # Next.js dashboard
└── sdk/            # Browser tracking SDK
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/ai-frontend-debugger.git
cd ai-frontend-debugger
```

2. **Backend**
```bash
cd backend
npm install
cp .env.example .env  # Configure your database
npm run dev
```

3. **Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **SDK**
```bash
cd sdk
npm install
npm run build
```

## 🎯 Usage

### Integrate SDK into your app
```html
<script src="./sdk/dist/ai-fe-debugger.min.js"></script>
<script>
  AIDebugger.initDebugger({
    apiUrl: 'http://localhost:4000'
  });
</script>
```

## 📅 Development Timeline

- ✅ **Day 1**: Project setup + SDK
- 🚧 **Day 2**: Backend event API
- ⏳ **Day 3**: Dashboard skeleton
- ⏳ **Day 4**: Timeline replay
- ⏳ **Day 5**: AI integration
- ⏳ **Day 6**: Polish & testing
- ⏳ **Day 7**: Demo & docs

## 🤝 Contributing

This is a learning project built as part of a 7-day MVP challenge.

## 📝 License

MIT

---

**Built by Muhammad Midhat**