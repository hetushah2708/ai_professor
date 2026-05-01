import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [vivaQuestion, setVivaQuestion] = useState("");
  const [vivaAnswer, setVivaAnswer] = useState("");
  const [vivaHistory, setVivaHistory] = useState([]);
  const [isVivaLoading, setIsVivaLoading] = useState(false);

  const handleTeach = async () => {
    if (!topic) return;

    setResponse("Thinking like a professor... 🧠");

    try {
      const res = await fetch("http://localhost:5000/teach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      setResponse(data.answer);

    } catch (error) {
      console.error(error);
      setResponse("Error connecting to server ❌");
    }
  };

  const handleTeachBack = async () => {
    if (!topic || !userAnswer) return;

    setFeedback("Checking your understanding... 🧠");

    try {
      const res = await fetch("http://localhost:5000/teach-back", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, userAnswer }),
      });

      const data = await res.json();
      setFeedback(data.feedback);
    } catch (error) {
      console.error(error);
      setFeedback("Error connecting to server ❌");
    }
  };

  // ✅ FIXED VIVA FUNCTIONS
  const startViva = async () => {
    if (!topic || isVivaLoading) return;
  
    setIsVivaLoading(true);
    setVivaQuestion("Starting viva... 🎓");
  
    try {
      const res = await fetch("http://localhost:5000/viva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, isFirst: true })
      });
  
      const data = await res.json();
  
      if (data.question) {
        setVivaQuestion(data.question);
      } else {
        setVivaQuestion("⚠️ No question received");
      }
  
    } catch (err) {
      setVivaQuestion("Error starting viva ❌");
    } finally {
      setIsVivaLoading(false);
    }
  };

  const submitViva = async () => {
    if (!vivaAnswer || isVivaLoading) return;
  
    setIsVivaLoading(true);
  
    try {
      const res = await fetch("http://localhost:5000/viva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic,
          userAnswer: vivaAnswer,
          isFirst: false
        })
      });
  
      const data = await res.json();
  
      setVivaHistory([
        ...vivaHistory,
        {
          question: vivaQuestion,
          answer: vivaAnswer,
          feedback: data.feedback
        }
      ]);
  
      setVivaQuestion(data.nextQuestion || "Next question not available");
      setVivaAnswer("");
  
    } catch (err) {
      console.error(err);
    } finally {
      setIsVivaLoading(false);
    }
  };

  return (
    <div style={styles.app}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1>AI Professor 🎓</h1>
      </div>
  
      {/* MAIN */}
      <div style={styles.container}>
        
        {/* LEFT PANEL */}
        <div style={styles.left}>
          <input
            type="text"
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setFeedback("");
            }}
            style={styles.input}
          />
  
          <button onClick={handleTeach} style={styles.button}>
            Teach Me
          </button>
  
          <textarea
            placeholder="Explain in your own words..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            style={styles.textarea}
          />
  
          <button onClick={handleTeachBack} style={styles.secondaryButton}>
            Check My Understanding
          </button>
        </div>
  
        {/* RIGHT PANEL */}
        <div style={styles.right}>
          {response && (
            <div style={styles.response}>
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )}
  
          {feedback && (
            <div style={styles.feedback}>
              <ReactMarkdown>{feedback}</ReactMarkdown>
            </div>
          )}

          {/* ✅ FIXED VIVA SECTION (OUTSIDE feedback) */}
          <div style={{ marginTop: "30px" }}>
            <button onClick={startViva} style={styles.button} disabled={isVivaLoading}>
              {isVivaLoading ? "Starting..." : "Start Mock Viva 🎓"}
            </button>

            {vivaQuestion && (
              <div style={styles.response}>
                <strong>Professor:</strong> {vivaQuestion}
              </div>
            )}

            {vivaQuestion && (
              <>
                <textarea
                  placeholder="Your answer..."
                  value={vivaAnswer}
                  onChange={(e) => setVivaAnswer(e.target.value)}
                  style={styles.textarea}
                />

                <button onClick={submitViva} style={styles.secondaryButton}>
                  Submit Answer
                </button>
              </>
            )}
          </div>
        </div>
  
      </div>
    </div>
  );
}

const styles = {
  app: {
    height: "100vh",
    background: "#020617",
    color: "#fff",
    fontFamily: "sans-serif",
  },

  header: {
    padding: "20px",
    borderBottom: "1px solid #1e293b",
    textAlign: "center",
    fontSize: "20px",
  },

  container: {
    display: "flex",
    height: "calc(100vh - 80px)",
  },

  left: {
    width: "30%",
    padding: "20px",
    borderRight: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  right: {
    width: "70%",
    padding: "20px",
    overflowY: "auto",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },

  textarea: {
    height: "100px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    padding: "10px",
    borderRadius: "8px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "10px",
    borderRadius: "8px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  response: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  feedback: {
    background: "#022c22",
    padding: "20px",
    borderRadius: "10px",
  },
};

export default App;