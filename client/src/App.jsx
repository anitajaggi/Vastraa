import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./components/Pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
