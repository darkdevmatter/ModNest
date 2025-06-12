import React from "react";
import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Select, MenuItem, Button, Typography, useTheme } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import BackupIcon from "@mui/icons-material/Backup";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ServerStatusCard from "./ServerStatusCard";
import PlayersPanel from "./PlayersPanel";
import LiveConsolePanel from "./LiveConsolePanel";
import WorldPanel from "./WorldPanel";
import BackupsPanel from "./BackupsPanel";
import SettingsPanel from "./SettingsPanel";

// Demo servers list (replace with your backend data later)
const demoServers = [
  { id: 1, name: "Survival Server", status: "ONLINE" },
  { id: 2, name: "Creative Kids", status: "OFFLINE" },
  { id: 3, name: "PvP Mayhem", status: "ONLINE" }
];

export default function AdminDashboard({ username, onLogout, darkMode, setDarkMode }) {
  const theme = useTheme();
  const [activePanel, setActivePanel] = React.useState("dashboard");

  // Server selector state
  const [servers, setServers] = React.useState(demoServers);
  const [selectedServerId, setSelectedServerId] = React.useState(servers[0].id);

  const currentServer = servers.find(s => s.id === selectedServerId);

  const SidebarLogo = () => (
    <Box sx={{ textAlign: "center", my: 2 }}>
      <img
        src="/logo.png"
        alt="ModNest Logo"
        style={{
          width: "80%",
          maxWidth: 130,
          margin: "0 auto",
          display: "block",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))",
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: theme.palette.background.default }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 220,
            boxSizing: "border-box",
            bgcolor: theme.palette.background.paper,
            borderRight: "none",
            pt: 0,
          },
          display: { xs: "none", sm: "block" },
        }}
        open
      >
        <Toolbar />
        <SidebarLogo />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button selected={activePanel === "dashboard"} onClick={() => setActivePanel("dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button selected={activePanel === "servers"}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Servers" />
            </ListItem>
            <ListItem button selected={activePanel === "files"}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Files" />
            </ListItem>
            <ListItem button selected={activePanel === "backups"}>
              <ListItemIcon>
                <BackupIcon />
              </ListItemIcon>
              <ListItemText primary="Backups" />
            </ListItem>
            <ListItem button selected={activePanel === "settings"} onClick={() => setActivePanel("settings")}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          ml: { sm: "220px" },
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Toolbar />
        {/* Server Selector */}
        <Box sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontWeight: 700, fontFamily: `'Press Start 2P', monospace`, color: theme.palette.text.primary }}>
              Server:
            </Typography>
            <Select
              value={selectedServerId}
              onChange={e => setSelectedServerId(e.target.value)}
              sx={{
                minWidth: 110,
                fontFamily: `'Press Start 2P', monospace`,
                fontSize: "0.78rem",
                '.MuiSelect-select': {
                  paddingTop: '4px',
                  paddingBottom: '4px',
                  paddingLeft: '8px',
                  paddingRight: '26px',
                }
              }}
            >
              {servers.map(s => (
                <MenuItem key={s.id} value={s.id} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.78rem", padding: '3px 10px' }}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Button variant="outlined" color="primary" sx={{ fontFamily: `'Press Start 2P', monospace` }}>+ Add Server</Button>
        </Box>

        {/* Show settings panel if selected */}
        {activePanel === "settings" && (
          <SettingsPanel darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
        {/* Otherwise show the main dashboard panels */}
        {activePanel === "dashboard" && (
          <>
            <Box sx={{ mb: 3 }}>
              <ServerStatusCard server={currentServer} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
                alignItems: "stretch",
                height: 280,
              }}
            >
              <Box sx={{ flex: 1, minWidth: 320, maxWidth: 380, height: "100%" }}>
                <PlayersPanel server={currentServer} />
              </Box>
              <Box sx={{ flex: 2, minWidth: 360, height: "100%" }}>
                <LiveConsolePanel server={currentServer} />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "stretch",
                height: 200,
              }}
            >
              <Box sx={{ flex: 1, minWidth: 320, maxWidth: 380, height: "100%" }}>
                <WorldPanel server={currentServer} />
              </Box>
              <Box sx={{ flex: 2, minWidth: 360, height: "100%" }}>
                <BackupsPanel server={currentServer} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}