import { useTheme, Paper, Typography, Box, Button } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
export default function WorldPanel({ server }) {
  const theme = useTheme();
  const blockBorder = `2px solid ${theme.palette.primary.main}`;

  const isServerSelected = !!(server && server.name);

  return (
    <Paper elevation={4} sx={{
      borderRadius: 1.5, p: 3, height: "100%",
      display: "flex", flexDirection: "column", justifyContent: "flex-start",
      background: theme.palette.background.paper, color: theme.palette.text.primary, border: blockBorder,
      fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
      boxSizing: "border-box",
      overflow: "hidden",
      width: "100%"
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontFamily: `'Press Start 2P', 'monospace', sans-serif`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        <PublicIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
        World
      </Typography>
      {isServerSelected ? (
        <>
          <Typography sx={{ mb: 2, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Server: {server.name}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><b>Name:</b> world</Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              -1234567890123456789
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>193 MB</Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            color="info"
            sx={{
              borderRadius: 1,
              fontFamily: `'Press Start 2P', 'monospace', sans-serif`,
              fontSize: "0.78rem",
              minWidth: 0,
              px: 2,
              py: 0.6,
              p: 0,
              alignSelf: "flex-start",
              maxWidth: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Download
          </Button>
        </>
      ) : (
        <Typography color="text.secondary" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>No server selected</Typography>
      )}
    </Paper>
  );
}