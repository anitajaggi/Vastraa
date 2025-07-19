import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Contact } from "./components/Pages/Contact";
import { Auth } from "./components/Pages/Auth";
import { Shop } from "./components/Pages/Product/Shop";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/auth", element: <Auth /> },
        { path: "/shop", element: <Shop /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
