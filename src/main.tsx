import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./styles/App.css";
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/table.css";
import "./styles/buttons.css";
import "./styles/list.css";
import "./styles/pagination.css";
import "./styles/detail.css";
import "./styles/forms.css";
import "./styles/error.css";
import "./styles/utilities.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
