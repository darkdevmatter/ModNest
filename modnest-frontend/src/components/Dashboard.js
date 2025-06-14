import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("User"); // Default, update from backend/auth

  // Fetch server list and (optionally) username on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch servers
        const resServers = await fetch("/api/servers");
        if (!resServers.ok) throw new Error("Failed to fetch servers");
        const dataServers = await resServers.json();

        setServers(dataServers.servers || []);

        // (Optional) Fetch user info for greeting
        const resUser = await fetch("/api/user");
        if (resUser.ok) {
          const dataUser = await resUser.json();
          setUsername(dataUser.username || "User");
        }
        setError("");
      } catch (err) {
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Real API handlers
  const handleStart = async (id) => {
    try {
      await fetch(`/api/servers/${id}/start`, { method: "POST" });
      // Re-fetch servers after change
      const res = await fetch("/api/servers");
      const data = await res.json();
      setServers(data.servers || []);
    } catch (err) {
      alert("Error starting server");
    }
  };

  const handleStop = async (id) => {
    try {
      await fetch(`/api/servers/${id}/stop`, { method: "POST" });
      const res = await fetch("/api/servers");
      const data = await res.json();
      setServers(data.servers || []);
    } catch (err) {
      alert("Error stopping server");
    }
  };

  const handleRestart = async (id) => {
    try {
      await fetch(`/api/servers/${id}/restart`, { method: "POST" });
      const res = await fetch("/api/servers");
      const data = await res.json();
      setServers(data.servers || []);
    } catch (err) {
      alert("Error restarting server");
    }
  };

  const handleAddServer = () => {
    alert("Add server functionality coming soon!");
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }
  if (error) {
    return <div className="dashboard-container">Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {username}</h1>
      <h2>Your Servers</h2>
      <div className="server-grid">
        {servers.map((server) => (
          <div className="server-card" key={server.id}>
            <h3>{server.name}</h3>
            <div className={server.running ? "status-running" : "status-stopped"}>
              ● {server.running ? "Running" : "Stopped"}
            </div>
            <div className="button-row">
              {server.running ? (
                <button onClick={() => handleStop(server.id)}>Stop</button>
              ) : (
                <button onClick={() => handleStart(server.id)}>Start</button>
              )}
              <button onClick={() => handleRestart(server.id)}>Restart</button>
              {server.isAdmin && server.mcsmUrl && (
                <button
                  style={{ background: "#1e90ff" }}
                  onClick={() => window.open(server.mcsmUrl, "_blank")}
                >
                  Open Admin Panel
                </button>
              )}
            </div>
            <div>
              <div>{server.type}</div>
              <div>
                {server.players} / {server.maxPlayers} players
              </div>
              <div>{server.ip}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="add-server-btn" onClick={handleAddServer}>
        Add Server
      </button>
    </div>
  );
}