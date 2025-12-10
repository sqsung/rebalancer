import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PortfolioContextProvider, TotalContextProvider } from "@/context";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/rebalancer">
      <PortfolioContextProvider>
        <TotalContextProvider>
          <App />
        </TotalContextProvider>
      </PortfolioContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
