import React from "react";
import { ThemeProvider } from "styled-components";
import { LaunchPad } from "pages/LaunchPad/LaunchPad";
import { theme } from "theme/theme";
import { Subscribe } from "@react-rxjs/core";
import { BASE_ROUTE } from "api/routes.constants";
import { DELAY_SECONDS } from "App.config";

import "tippy.js/dist/tippy.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Subscribe>
        <LaunchPad delaySeconds={DELAY_SECONDS} url={BASE_ROUTE} />
      </Subscribe>
    </ThemeProvider>
  );
}

export default App;
