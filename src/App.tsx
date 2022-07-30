import { SessionProvider } from "contexts/session";
import React, { useEffect } from "react";
import GlobalRouter from "routes/GlobalRouter";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { theme } from "style/theme/theme";
import { GlobalStyles } from "style/globalStyles";
import { useMediaQuery } from "@mui/material";
import { Context } from "contexts/context";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
  //   const [rootElement, setRootElement] = React.useState<React.ReactNode | null>(
  //     null
  //   );

  //   useEffect(() => {

  // });
  const themeMUI = useTheme();
  const matchSm = useMediaQuery(themeMUI.breakpoints.down("sm"));
  const matchMd = useMediaQuery(themeMUI.breakpoints.down("md"));

  const matchedSize = matchSm ? "small" : matchMd ? "medium" : "large";

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SnackbarProvider maxSnack={3}>
        <Context.Provider
          value={{
            size: matchedSize,
          }}
        >
          <SessionProvider>
            <GlobalRouter />
          </SessionProvider>
        </Context.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
