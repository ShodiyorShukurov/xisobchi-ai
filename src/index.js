import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MainContextProvider } from "./hooks/UseMain";

ReactDOM.render(
  <MainContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </MainContextProvider>,
  document.getElementById("root"),
);
