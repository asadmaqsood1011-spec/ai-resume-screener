# AI Resume Screener

A full-stack web app that analyzes your resume against a job description using OpenAI GPT-4o. Get an ATS compatibility score, identify keyword gaps, and receive AI-rewritten bullet points to strengthen your application.

## Features

- **ATS Fit Score** — 0–100 score with color-coded rating (Strong / Moderate / Weak / Poor Match)
- **Keyword Analysis** — Side-by-side view of matched ✓ and missing ✗ keywords from the job description
- **AI Bullet Point Improvements** — Original vs. improved bullet points with explanations
- **2-Sentence AI Summary** — Quick assessment of overall fit
- **Dark Professional UI** — Responsive two-column layout built with Tailwind CSS
- **Copy-to-clipboard** — One-click copy for improved bullets

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| AI | OpenAI GPT-4o (JSON mode) |
| Deploy | Vercel (frontend), Render (backend) |

## Local Development

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-resume-screener.git
cd ai-resume-screener
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm run dev
```

The backend will start on `http://localhost:3001`.

### 3. Set up the frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend runs on a different port
npm run dev
```

The frontend will start on `http://localhost:5173`.

## Deployment

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect your repo — Render will detect `render.yaml`
4. Add your `OPENAI_API_KEY` as an environment variable in the Render dashboard
5. Deploy — your API URL will be something like `https://ai-resume-screener-api.onrender.com`

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your repository, set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com`
4. Deploy — `vercel.json` handles SPA routing automatically

## Project Structure

```
ai-resume-screener/
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app with state management
│   │   ├── components/
│   │   │   ├── ResumeInput.jsx   # Resume text area
│   │   │   ├── JobDescInput.jsx  # Job description text area
│   │   │   ├── ScoreCard.jsx     # ATS score display
│   │   │   ├── KeywordPanel.jsx  # Matched/missing keywords
│   │   │   ├── SuggestionList.jsx # Bullet point improvements
│   │   │   └── LoadingSpinner.jsx # Loading state
│   │   └── index.css             # Tailwind imports
│   ├── vercel.json               # SPA routing config
│   └── .env.example
├── backend/
│   ├── server.js                 # Express app entry point
│   ├── routes/
│   │   └── analyze.js            # POST /api/analyze
│   ├── services/
│   │   └── openai.js             # GPT-4o integration
│   └── .env.example
├── render.yaml                   # Render deployment config
└── README.md
```

## API Reference

### `POST /api/analyze`

**Request body:**
```json
{
  "resumeText": "Full resume content as plain text...",
  "jobDescription": "Full job description as plain text..."
}
```

**Response:**
```json
{
  "score": 78,
  "matchedKeywords": ["Python", "REST APIs", "SQL", "Agile"],
  "missingKeywords": ["Kubernetes", "Terraform", "AWS Lambda"],
  "improvements": [
    {
      "original": "Worked on backend services",
      "improved": "Developed and maintained 5 Python microservices handling 10K+ daily requests, reducing latency by 30%",
      "reason": "Added specificity, quantified impact, and used stronger action verbs aligned with the job requirements."
    }
  ],
  "summary": "Your background aligns well with the core engineering requirements, particularly in Python and database work. Adding cloud infrastructure keywords and quantifying more achievements would significantly improve your ATS score."
}
```

## License

MIT
