import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [repoName, setRepoName] = useState("");
  const [sessionActive, setSessionActive] = useState(false);

  // This would be your logic to turn "Nuta" into "nt_1g0j5d"
  const generateCode = (name: string) => {
    if (!name) return "";
    // Simplified example of your 3-digit, 3-letter logic
    return `nt_1g0j5d`; 
  };

  const authCode = generateCode(repoName);

  useEffect(() => {
    const checkAuth = () => {
      const savedCode = localStorage.getItem("gh_code");
      if (savedCode && savedCode.endsWith("*g")) {
        setSessionActive(true);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="card">
      <header>
        <h1>Nuta</h1>
        <p className="read-the-docs">Nuta Push App</p>
      </header>

      <main>
        <div className="repo-form">
          <input 
            type="text" 
            placeholder="New repository name..." 
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
          />
        </div>

        <section className="repo-list">
          <h3>Your Repositories (30)</h3>
          <div className="card">
            <code>ThatBobo / Nuta</code>
          </div>
        </section>
      </main>

      <footer>
        {sessionActive ? (
          <Link to="/push" style={{ color: '#646cff', textDecoration: 'none' }}>
            Go to Push Dashboard (*g)
          </Link>
        ) : (
          <Link 
            to={`/connect?code=${authCode}`} 
            className="logo react" 
            style={{ 
              textDecoration: 'none',
              pointerEvents: repoName ? 'auto' : 'none',
              opacity: repoName ? 1 : 0.5 
            }}
          >
            Connect & Create {repoName}
          </Link>
        )}
      </footer>
    </div>
  );
}
