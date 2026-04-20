import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import palette from "./theme/palette";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({ palette });

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* <StoreContextProvider> */}
      <App />
      {/* </StoreContextProvider> */}
    </ThemeProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
