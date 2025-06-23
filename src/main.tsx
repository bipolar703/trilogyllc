import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode data-oid="g0or16m">
    <Suspense
      fallback={<LoadingSpinner data-oid="zqd_7-5" />}
      data-oid="pwko0:i"
    >
      <App data-oid="ribnmyc" />
    </Suspense>
  </React.StrictMode>,
);
