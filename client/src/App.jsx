import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Contact } from "./components/Pages/Contact";
import { Auth } from "./components/Pages/Auth";
import { Shop } from "./components/Pages/Product/Shop";
import { Login } from "./components/Ui/Login";
import { Register } from "./components/Ui/Register";
import { ProductDetails } from "./components/Pages/Product/ProductDetails";
import { Faqs } from "./components/Pages/Faqs";
import { NotFound } from "./components/Ui/NotFound";
import { Cart } from "./components/Pages/Product/Cart";
import { Wishlist } from "./components/Pages/wishlist";
import { Checkout } from "./components/Pages/Product/CheckOut";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/faqs", element: <Faqs /> },
        { path: "/contact", element: <Contact /> },
        { path: "/auth", element: <Auth /> },
        { path: "/shop", element: <Shop /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/product/productdetails", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "*", element: <NotFound /> },
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
