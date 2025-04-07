import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { clarity } from "react-microsoft-clarity";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./config/log.ts";
import Router from "./routes/routes.tsx";
import Contexts from "./store/contexts/index.tsx";

import { store } from "@/store/store";
import "@/utils/translation.ts";

import "./index.css";

clarity.init((window as any)?._env_?.VITE_CLARITY_CODE);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Contexts>
          <Router />
        </Contexts>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
