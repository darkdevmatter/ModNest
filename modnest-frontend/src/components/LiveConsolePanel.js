import React, { useState } from "react";
import { Paper, Box, Typography, InputBase, Button, useTheme } from "@mui/material";

export default function LiveConsolePanel({ server }) {
  const [command, setCommand] = useState("");
  const theme = useTheme();

  return (
    <Paper elevation={4} sx={{ borderRadius: 3, p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", bgcolor: theme.palette.background.paper }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
        Live Console
      </Typography>
      {server ? (
        <>
          <Typography sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            Server: {server.name}
          </Typography>
          <Box
            sx={{
              bgcolor: theme.palette.grey[900],
              borderRadius: 2,
              p: 1,
              mb: 2,
              minHeight: 70,
              fontFamily: "monospace",
              fontSize: 15,
              color: theme.palette.info.contrastText,
            }}
          >
            [Server] Saving...<br />
            [Server] Saved the game.<br />
            [Server] Saving...
          </Box>
          <Box sx={{ display: "flex" }}>
            <InputBase
              placeholder="Enter command"
              value={command}
              onChange={e => setCommand(e.target.value)}
              sx={{
                flex: 1,
                bgcolor: theme.palette.background.default,
                px: 2,
                py: 0.5,
                color: theme.palette.text.primary,
                borderRadius: 2,
                mr: 1,
              }}
            />
            <Button
              variant="contained"
              color="info"
              sx={{ fontWeight: 600 }}
              disabled={!command}
              onClick={() => setCommand("")}
            >
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Typography color="text.secondary">No server selected</Typography>
      )}
    </Paper>
  );
}