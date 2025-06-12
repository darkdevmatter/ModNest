import React from "react";
import { Paper, Box, Typography, Button, Grid, Chip, LinearProgress, useTheme } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import MemoryIcon from "@mui/icons-material/Memory";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import TerminalIcon from "@mui/icons-material/Terminal";
import ExtensionIcon from "@mui/icons-material/Extension";
import BackupIcon from "@mui/icons-material/Backup";

export default function ServerStatusCard({ server }) {
  const theme = useTheme();
  const blockBorder = `2px solid ${theme.palette.primary.main}`;

  if (!server) {
    return (
      <Paper
        elevation={4}
        sx={{
          borderRadius: 1.5,
          p: 3,
          mb: 3,
          minHeight: 190,
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: blockBorder,
          boxShadow: theme.shadows[3],
          fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, fontFamily: `'Press Start 2P', 'monospace', sans-serif` }}>
          No server selected
        </Typography>
      </Paper>
    );
  }

  const statusColor = server.status === 'ONLINE' ? 'success' : server.status === 'OFFLINE' ? 'error' : 'warning';

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 1.5,
        p: 3,
        mb: 3,
        minHeight: 190,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: blockBorder,
        boxShadow: theme.shadows[3],
        fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, fontFamily: `'Press Start 2P', 'monospace', sans-serif` }}>
          <StorageIcon sx={{ mr: 1, color: theme.palette.success.main }} />
          {server.name}
        </Typography>
        <Chip
          label={server.status}
          color={statusColor}
          sx={{
            borderRadius: 1,
            fontWeight: 700,
            px: 2,
            fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
          }}
        />
      </Box>
      <Box sx={{ color: theme.palette.text.secondary, mb: 2, fontSize: 15, display: 'flex', alignItems: 'center', gap: 1 }}>
        <StorageIcon fontSize="small" /> 192.168.1.1:25565 <span>|</span> 1 / 20
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: `'Press Start 2P', 'monospace', sans-serif` }}>
            Version: Java 1.18.2
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Uptime: 02h 15m</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MemoryIcon fontSize="small" /> CPU: <LinearProgress variant="determinate" value={25} sx={{ flex: 1, mx: 1, borderRadius: 1 }} /> 25%
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MemoryIcon fontSize="small" /> Memory: <LinearProgress variant="determinate" value={11} color="info" sx={{ flex: 1, mx: 1, borderRadius: 1 }} /> 2043 MB
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 1 }}>
        <Button startIcon={<TerminalIcon />} variant="outlined" color="primary" sx={{ minWidth: 120, fontWeight: 600, borderRadius: 1 }}>
          Console
        </Button>
        <Button startIcon={<ExtensionIcon />} variant="outlined" color="primary" sx={{ minWidth: 120, fontWeight: 600, borderRadius: 1 }}>
          Mods
        </Button>
        <Button startIcon={<BackupIcon />} variant="outlined" color="primary" sx={{ minWidth: 120, fontWeight: 600, borderRadius: 1 }}>
          Backups
        </Button>
        <Button startIcon={<PlayArrowIcon />} variant="contained" color="success" sx={{ minWidth: 100, fontWeight: 600, borderRadius: 1 }}>
          Start
        </Button>
        <Button startIcon={<ReplayIcon />} variant="outlined" color="secondary" sx={{ minWidth: 100, fontWeight: 600, borderRadius: 1 }}>
          Restart
        </Button>
      </Box>
    </Paper>
  );
}