import { useState } from "react";
import ReelViewer from "../components/ReelViewer";

export default function Home() {
  const [celebrityInput, setCelebrityInput] = useState("");
  const [reels, setReels] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReel = async () => {
    if (!celebrityInput || isGenerating) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ celebrity: celebrityInput }),
      });

      const data = await response.json();
      setReels([data.reel, ...reels]);
      setCelebrityInput("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Sports Celebrity History Reels</h1>
        <div className="search-bar">
          <input
            type="text"
            value={celebrityInput}
            onChange={(e) => setCelebrityInput(e.target.value)}
            placeholder="Enter sports celebrity name"
          />
          <button onClick={generateReel} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Create Reel"}
          </button>
        </div>
      </header>

      <main>
        {reels.length > 0 ? (
          <ReelViewer reels={reels} />
        ) : (
          <div className="empty-state">
            <p>No reels yet. Search for a sports celebrity to generate one!</p>
          </div>
        )}
      </main>

      <style jsx>{`
        .container {
          max-width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        header {
          padding: 1rem;
          background: #111;
          color: white;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .search-bar {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        input {
          flex: 1;
          padding: 0.5rem;
          border-radius: 4px;
          border: none;
        }

        button {
          padding: 0.5rem 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:disabled {
          background: #666;
          cursor: not-allowed;
        }

        main {
          flex: 1;
          overflow: hidden;
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #666;
        }
      `}</style>
    </div>
  );
}
