import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";

import { VisionUIControllerProvider } from "./context";

ReactDOM.render(
  <HashRouter>
    <VisionUIControllerProvider>
      <App />
    </VisionUIControllerProvider>
  </HashRouter>,
  document.getElementById("root")
);
