import BackupIcon from "@mui/icons-material/Backup";
import { useTheme, Paper, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function BackupsPanel({ server }) {
  const theme = useTheme();
  const blockBorder = `3px solid ${theme.palette.primary.main}`;

  const isServerSelected = !!(server && server.name);

  return (
    <Paper elevation={4} sx={{
      borderRadius: 1.5, p: 3, height: "100%",
      display: "flex", flexDirection: "column", justifyContent: "flex-start",
      background: theme.palette.background.paper, border: blockBorder,
      fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontFamily: `'Press Start 2P', 'monospace', sans-serif`, color: theme.palette.text.primary }}>
        <BackupIcon sx={{ mr: 1, color: theme.palette.info.main }} />
        Backups
      </Typography>
      {isServerSelected ? (
        <>
          <Typography sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
            Server: {server.name}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>2024-04-24 10:00 AM</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', p: 0.5, maxWidth: 180 }}>
                  <Button size="small" color="primary" sx={{ mr: 0.5, borderRadius: 1, fontFamily: `'Press Start 2P', 'monospace', sans-serif`, fontSize: "0.78rem", minWidth: 0, px: 1.5, py: 0.5 }} variant="outlined">Restore</Button>
                  <Button size="small" color="info" sx={{ mr: 0.5, borderRadius: 1, fontFamily: `'Press Start 2P', 'monospace', sans-serif`, fontSize: "0.78rem", minWidth: 0, px: 1.5, py: 0.5 }} variant="outlined">Download</Button>
                  <Button size="small" color="error" sx={{ borderRadius: 1, fontFamily: `'Press Start 2P', 'monospace', sans-serif`, fontSize: "0.78rem", minWidth: 0, px: 1.5, py: 0.5 }} variant="outlined">Delete</Button>
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