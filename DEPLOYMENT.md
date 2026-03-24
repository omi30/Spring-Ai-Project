# 🚀 Deployment Guide: Spring AI Demo

This project has two parts:
- **Backend** → Spring Boot (Java) → deployed on **Render** using Docker
- **Frontend** → React → deployed on **Netlify**

---

## Part 1: Deploy Backend on Render (Docker)

### Step 1 — Push backend to GitHub
Push the `SpringAiDemo/` folder (which contains the `Dockerfile`) to a GitHub repository.

```
your-repo/
├── Dockerfile          ← must be here
├── pom.xml
├── src/
└── ...
```

> If your repo contains both frontend and backend, Render will need the `SpringAiDemo/` sub-folder as the **Root Directory** (set in Step 4).

---

### Step 2 — Create a Render account
Go to [https://render.com](https://render.com) and sign up (free tier works).

---

### Step 3 — Create a new Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account and select your repository

---

### Step 4 — Configure the service
| Field | Value |
|---|---|
| **Name** | `spring-ai-backend` (or any name) |
| **Root Directory** | `SpringAiDemo` (only if backend is in a subfolder) |
| **Environment** | `Docker` |
| **Branch** | `main` |
| **Instance Type** | Free (or paid for better performance) |

Render auto-detects the `Dockerfile` — no extra build command needed.

---

### Step 5 — Add Environment Variables
In the Render dashboard, go to **Environment** tab and add:

| Key | Value |
|---|---|
| `SPRING_AI_OPENAI_API_KEY` | Your Groq API key (from https://console.groq.com) |
| `CORS_ALLOWED_ORIGINS` | Your Netlify URL — add this **after** deploying frontend, e.g. `https://your-app.netlify.app` |

> ⚠️ Never hardcode API keys. They are now safely read from environment variables.

---

### Step 6 — Deploy
Click **"Create Web Service"**. Render will:
1. Pull your code
2. Build the Docker image (Maven build inside Docker)
3. Start the container on port 8080

Once deployed, your backend URL will be:
```
https://spring-ai-backend.onrender.com
```
(Copy this — you'll need it for the frontend)

---

## Part 2: Deploy Frontend on Netlify

### Step 1 — Push frontend to GitHub
Push the `spring-ai-demo-react/` folder to GitHub (can be the same repo or a separate one).

---

### Step 2 — Create a Netlify account
Go to [https://netlify.com](https://netlify.com) and sign up (free tier works).

---

### Step 3 — Create a new site
1. Click **"Add new site"** → **"Import an existing project"**
2. Connect GitHub and select your repository

---

### Step 4 — Configure build settings
| Field | Value |
|---|---|
| **Base directory** | `spring-ai-demo-react` (if in subfolder) |
| **Build command** | `npm run build` |
| **Publish directory** | `spring-ai-demo-react/build` |

> If your repo root IS the React folder, leave Base directory blank and set Publish directory to just `build`.

---

### Step 5 — Add Environment Variable
In Netlify: **Site settings** → **Environment variables** → **Add variable**:

| Key | Value |
|---|---|
| `REACT_APP_API_URL` | Your Render backend URL, e.g. `https://spring-ai-backend.onrender.com` |

> Do NOT include a trailing slash `/` in the URL.

---

### Step 6 — Deploy
Click **"Deploy site"**. Netlify will build your React app and give you a URL like:
```
https://your-app.netlify.app
```

---

### Step 7 — Update CORS on Render
Go back to your Render service → **Environment** tab and update:

```
CORS_ALLOWED_ORIGINS=https://your-app.netlify.app
```

Then click **"Save Changes"** — Render will auto-redeploy.

---

## ✅ Summary Checklist

- [ ] Backend code pushed to GitHub with `Dockerfile` in `SpringAiDemo/`
- [ ] Render Web Service created with Docker environment
- [ ] `SPRING_AI_OPENAI_API_KEY` set on Render
- [ ] Backend deployed → copy the Render URL
- [ ] Frontend pushed to GitHub
- [ ] Netlify site created with correct build settings
- [ ] `REACT_APP_API_URL` set to Render URL on Netlify
- [ ] Frontend deployed → copy the Netlify URL
- [ ] `CORS_ALLOWED_ORIGINS` updated on Render with Netlify URL
- [ ] Render redeployed with new CORS setting

---

## 🔧 Local Development (no changes needed)

The app still works locally without any env vars:
- Frontend defaults to `http://localhost:8080`
- Backend CORS defaults to `http://localhost:3000`

Just create `spring-ai-demo-react/.env.local`:
```
REACT_APP_API_URL=http://localhost:8080
```

And in `application.properties` or as a local env var:
```
SPRING_AI_OPENAI_API_KEY=your_groq_key_here
```

---

## ⚠️ Notes on Free Tier (Render)

Render's free tier **spins down** after 15 minutes of inactivity. The first request after idle takes ~30–60 seconds. Upgrade to a paid plan for always-on service.
