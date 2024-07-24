
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import ErrorBoundary from "./errorBoundary";

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
        <App />
      </SnackbarProvider>
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById("root")
);
