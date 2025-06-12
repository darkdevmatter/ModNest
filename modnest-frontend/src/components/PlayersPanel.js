import React from "react";
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Box, useTheme } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

export default function PlayersPanel({ server }) {
  const theme = useTheme();
  const blockBorder = `2px solid ${theme.palette.primary.main}`;

  return (
    <Paper elevation={4} sx={{
      borderRadius: 1.5, p: 3, height: "100%",
      display: "flex", flexDirection: "column", justifyContent: "flex-start",
      background: theme.palette.background.paper, border: blockBorder,
      color: theme.palette.text.primary,
      fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, letterSpacing: 1, fontFamily: `'Press Start 2P', 'monospace', sans-serif`, color: 'inherit' }}>
        <FaceIcon sx={{ mr: 1, color: theme.palette.info.main }} />
        Players
      </Typography>
      {server ? (
        <>
          <Typography sx={{ mb: 2, fontWeight: 600, color: 'inherit' }}>
            Server: {server.name}
          </Typography>
          <Table size="small" sx={{ color: theme.palette.text.primary }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'inherit' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'inherit' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar alt="Steve" src="https://minotar.net/avatar/Steve/32.png" />
                    Steve
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: theme.palette.success.main, fontWeight: 600, fontSize: 15 }}>Online</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      ) : (
        <Typography color="text.secondary">No server selected</Typography>
      )}
    </Paper>
  );
}