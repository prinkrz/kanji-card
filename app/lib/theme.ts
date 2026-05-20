import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#7C3AED", contrastText: "#fff" },
        secondary: { main: "#EA580C", contrastText: "#fff" },
        success: { main: "#10B981", contrastText: "#fff" },
        info: { main: "#3B82F6", contrastText: "#fff" },
        warning: { main: "#F59E0B", contrastText: "#fff" },
        error: { main: "#EF4444", contrastText: "#fff" },
        background: { default: "#FAFAFA", paper: "#FFFFFF" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#A78BFA", contrastText: "#1a1a2e" },
        secondary: { main: "#FB923C", contrastText: "#1a1a2e" },
        success: { main: "#34D399", contrastText: "#022c22" },
        info: { main: "#60A5FA", contrastText: "#0c1445" },
        warning: { main: "#FCD34D", contrastText: "#1c0e00" },
        error: { main: "#F87171", contrastText: "#2d0505" },
        background: { default: "#121212", paper: "#1E1E1E" },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
  },
});

export default theme;
