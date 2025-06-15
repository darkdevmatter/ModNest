import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("User");
  const [showBackups, setShowBackups] = useState(false);
  const [selectedServer, setSelectedServer] = useState(null);
  const [backups, setBackups] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const resServers = await fetch("/api/servers");
      const dataServers = await resServers.json();
      setServers(dataServers.servers || []);
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

  // Server actions
  const handleStart = async (id) => {
    await fetch(`/api/servers/${id}/start`, { method: "POST" });
    fetchData();
  };
  const handleStop = async (id) => {
    await fetch(`/api/servers/${id}/stop`, { method: "POST" });
    fetchData();
  };
  const handleRestart = async (id) => {
    await fetch(`/api/servers/${id}/restart`, { method: "POST" });
    fetchData();
  };

  // Add server
  const handleAddServer = async () => {
    const name = prompt("Enter server name:");
    if (name) {
      await fetch("/api/servers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      fetchData();
    }
  };

  // Show players
  const handleShowPlayers = async (id) => {
    const res = await fetch(`/api/servers/${id}/players`);
    const data = await res.json();
    setPlayers(data.players || []);
    setSelectedServer(id);
    setTimeout(() => setPlayers([]), 5000); // Auto-hide after 5 seconds
  };

  // World download
  const handleWorldDownload = async (id) => {
    const res = await fetch(`/api/servers/${id}/world/download`);
    const data = await res.json();
    if (data.url) {
      window.open(data.url, "_blank");
    } else {
      alert("No download available.");
    }
  };

  // Backups modal
  const handleShowBackups = async (server) => {
    setSelectedServer(server.id);
    setShowBackups(true);
    const res = await fetch(`/api/servers/${server.id}/backups`);
    const data = await res.json();
    setBackups(data.backups || []);
  };
  const handleCreateBackup = async (serverId) => {
    await fetch(`/api/servers/${serverId}/backups`, { method: "POST" });
    handleShowBackups({ id: serverId }); // Refresh list
  };
  const handleRestoreBackup = async (serverId, backupId) => {
    await fetch(`/api/servers/${serverId}/backups/${backupId}/restore`, { method: "POST" });
    alert("Backup restored!");
  };
  const handleDownloadBackup = async (serverId, backupId) => {
    const res = await fetch(`/api/servers/${serverId}/backups/${backupId}/download`);
    const data = await res.json();
    if (data.url) {
      window.open(data.url, "_blank");
    }
  };
  const handleDeleteBackup = async (serverId, backupId) => {
    await fetch(`/api/servers/${serverId}/backups/${backupId}`, { method: "DELETE" });
    handleShowBackups({ id: serverId }); // Refresh list
  };

  if (loading) return <div className="dashboard-container">Loading...</div>;
  if (error) return <div className="dashboard-container">Error: {error}</div>;

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
              <button onClick={() => handleShowPlayers(server.id)}>Show Players</button>
              <button onClick={() => handleWorldDownload(server.id)}>Download World</button>
              <button onClick={() => handleShowBackups(server)}>Backups</button>
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
            {players.length > 0 && selectedServer === server.id && (
              <div style={{ marginTop: "1em" }}>
                <strong>Players:</strong> {players.map(p => p.name).join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="add-server-btn" onClick={handleAddServer}>
        Add Server
      </button>
      {showBackups && (
        <div className="modal">
          <div className="modal-content">
            <h3>Backups for Server {selectedServer}</h3>
            <button onClick={() => handleCreateBackup(selectedServer)}>Create Backup</button>
            <ul>
              {backups.map(backup => (
                <li key={backup.id} style={{ margin: "1em 0" }}>
                  {backup.timestamp || backup.id}
                  <button onClick={() => handleRestoreBackup(selectedServer, backup.id)}>Restore</button>
                  <button onClick={() => handleDownloadBackup(selectedServer, backup.id)}>Download</button>
                  <button onClick={() => handleDeleteBackup(selectedServer, backup.id)}>Delete</button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowBackups(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}