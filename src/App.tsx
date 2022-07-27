import { SessionProvider } from "contexts/session";
import React, { useEffect } from "react";
import GlobalRouter from "routes/GlobalRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "style/theme/theme";
import { GlobalStyles } from "style/globalStyles";

const App: React.FC = () => {
  //   const [rootElement, setRootElement] = React.useState<React.ReactNode | null>(
  //     null
  //   );

  //   useEffect(() => {

  // });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SessionProvider>
        <GlobalRouter />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
