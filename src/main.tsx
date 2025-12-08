import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PortfolioProvider } from "@/context/PortfolioContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/rebalancer">
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </BrowserRouter>
  </StrictMode>,
);
