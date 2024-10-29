import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import routes from "~/routes/routes";

function App() {
  return (
    <ConfigProvider>
      <RouterProvider router={routes} />  
    </ConfigProvider>
  );
}

export default App;
