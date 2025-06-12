import React from "react";
import { Box, Typography, Switch, useTheme } from "@mui/material";

export default function SettingsPanel({ darkMode, setDarkMode }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 3,
        boxShadow: "0 4px 28px #00ffb155"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "inherit",
          textShadow: "0 2px 12px #00ffb199"
        }}
      >
        Settings
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mr: 1, color: "inherit" }}>
          Dark Mode
        </Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode((m) => !m)}
          color="primary"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: theme.palette.primary.main,
            },
            "& .MuiSwitch-track": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      </Box>
    </Box>
  );
}