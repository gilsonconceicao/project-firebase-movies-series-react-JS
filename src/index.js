import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthUserProvider } from "./contexts/authStoreUser";
import { SeriesListProvider } from "./contexts/seriesContext";
import { MovieListProvider } from "./contexts/moviesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MovieListProvider>
      <SeriesListProvider>
        <AuthUserProvider>
          <App />
        </AuthUserProvider>
      </SeriesListProvider>
    </MovieListProvider>
  </React.StrictMode>
);
