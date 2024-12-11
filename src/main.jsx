import { StrictMode } from "react";
import { ConfigProvider, Spin } from "antd";
import { createRoot } from "react-dom/client";
import { App as AntdApp } from "antd";
import EscapeAntd from "~/components/EscapeAntd";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "~/store";
import { injectStore } from "./apis/index.js";

injectStore(store)
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ConfigProvider theme={{}}>
    <Provider store={store}>
      <PersistGate
        loading={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Spin size="large" />
          </div>
        }
        persistor={persistor}
      >
        <AntdApp>
          <EscapeAntd />
          <App />
        </AntdApp>
      </PersistGate>
    </Provider>
  </ConfigProvider>
  // </StrictMode>
);
