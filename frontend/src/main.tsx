import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeflex/primeflex.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <App />
        <ToastContainer />
      </PrimeReactProvider>
    </QueryClientProvider>
  </StrictMode>
);
