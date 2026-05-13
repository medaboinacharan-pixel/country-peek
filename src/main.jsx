import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { FavouritesProvider } from "./context/FavouritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <FavouritesProvider>
      <App />
    </FavouritesProvider>
  </ThemeProvider>
);
