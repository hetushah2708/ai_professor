# 🎓 AI Professor

An AI-powered interactive learning assistant that helps you **learn, explain, and test your understanding** like a real university experience.

Built as a full-stack project using **React + Node.js + Hugging Face APIs**.

---

## 🚀 Features

### 📘 1. Teach Mode
- Enter any topic
- Get a **clear, structured explanation**
- AI behaves like a professor (simple + conceptual)

---

### 🧠 2. Teach-Back Mode (Feynman Technique)
- You explain the topic in your own words
- AI evaluates your answer and gives:
  - ✅ What you got right  
  - ❌ What’s missing  
  - 🔧 How to improve  

---

### 🎤 3. Mock Viva Mode
- Simulates a **real oral exam**
- AI asks questions based on the topic
- Evaluates your answers and:
  - Gives feedback  
  - Asks follow-up questions  
- Continuous Q&A loop for deeper understanding

---

## 🧱 Architecture
Frontend (React + Vite)
↓
Backend (Node.js + Express)
↓
AI Layer (Hugging Face Inference API)


- Shared AI logic across all modes
- Different prompts → different learning experiences

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Axios / Fetch
- Basic CSS (custom styling)

**Backend**
- Node.js
- Express.js
- Axios

**AI**
- Hugging Face Router API
- Model: `openai/gpt-oss-120b`

---



## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ai-professor.git
cd ai-professor

2. Install dependencies
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
npm install

. Add Environment Variables

Create a .env file inside /backend:
node server.js

🎯 Use Cases
Students preparing for exams
Interview preparation (concept clarity)
Self-learning & revision
Simulated viva/oral 

🔥 Future Improvements
🎤 Voice-based interaction (speech-to-text + TTS)
📄 PDF / Notes upload (RAG-based learning)
📊 Progress tracking dashboard
🧩 Multi-topic sessions
🌐 Deployment (Vercel + Render)

🙌 Acknowledgements
Hugging Face (Inference API)
Open-source AI community

👨‍💻 Author

Het Shah
Aspiring Data Analyst / AI Enthusiast

⭐ If you like this project
Give it a star ⭐ on GitHub — it really helps!


