import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "6rem",
      fontWeight: 300,
      letterSpacing: "-0.5px",
      lineHeight: "1.35em",
    },
    h2: {
      fontSize: "3.75rem",
      fontWeight: 300,
      letterSpacing: "-0.5px",
      lineHeight: "1.35em",
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 400,
      letterSpacing: "-0.5px",
      lineHeight: "1.35em",
    },
    h4: {
      fontSize: "2.125rem",
      fontWeight: 400,
      letterSpacing: "-0.5px",
      lineHeight: "1.35em",
    },
  },
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: "#00bcd4",
      light: "#80deea",
      dark: "#0097a7",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(0, 0, 0, 0.14)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
  },
});
