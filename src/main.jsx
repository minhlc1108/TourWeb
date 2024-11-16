import { StrictMode } from "react";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { App as AntdApp } from "antd";
import EscapeAntd from "~/components/EscapeAntd";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <ConfigProvider theme={{}}>
      <AntdApp>
        <EscapeAntd />
        <App />
      </AntdApp>
    </ConfigProvider>
  // </StrictMode>
);
