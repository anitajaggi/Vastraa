import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./utils/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Auth } from "./Pages/Auth";
import { Shop } from "./Pages/Product/Shop";
import { Login } from "./components/Ui/Login";
import { Register } from "./components/Ui/Register";
import { ProductDetails } from "./Pages/Product/ProductDetails";
import { Faqs } from "./Pages/Faqs";
import { NotFound } from "./components/Ui/NotFound";
import { Cart } from "./Pages/Product/Cart";
import { Wishlist } from "./Pages/wishlist";
import { Checkout } from "./Pages/Product/CheckOut";
import { AdminDashboard } from "./Admin/AdminDashboard";
import { UserDashboard } from "./UserDashboard/UserDashboard";
import { AdminLayout } from "./Admin/AdminLayout";
import { EditProfile } from "./UserDashboard/EditProfile";
import { ManageUsers } from "./Admin/user/ManageUser";
import { AddCat } from "./Admin/category/AddCat";
import { ManageCat } from "./Admin/category/ManageCat";
import { ManageContact } from "./Admin/contact/ManageContact";
import { ManageSubs } from "./Admin/subscribe/ManageSubscribe";
import { ManageFeedback } from "./Admin/feedback/ManageFeedback";
import { AddProd } from "./Admin/product/AddProd";
import { ManageProd } from "./Admin/product/ManageProd";
import { AddSubCat } from "./Admin/subcategory/addSubCat";
import { ManageSubCat } from "./Admin/subcategory/manageSubCat";
import { ManageOrders } from "./Admin/orders/ManageOrders";
import { OrderSuccess } from "./Pages/Product/successpage";

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
        { path: "/shop/:categorySlug", element: <Shop /> },
        { path: "/shop/:categorySlug/:subcategorySlug", element: <Shop /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/product/:slug", element: <ProductDetails /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/cart", element: <Cart /> },
        { path: "/order-success", element: <OrderSuccess /> },
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "/admin",
              element: <AdminLayout />,
              children: [
                { index: true, element: <AdminDashboard /> },
                {
                  path: "/admin/setting",
                  element: <EditProfile />,
                },
                { path: "/admin/users", element: <ManageUsers /> },
                { path: "/admin/category/addcat", element: <AddCat /> },
                { path: "/admin/category/managecat", element: <ManageCat /> },
                {
                  path: "/admin/subcategory/addsubcat",
                  element: <AddSubCat />,
                },
                {
                  path: "/admin/subcategory/managesubcat",
                  element: <ManageSubCat />,
                },
                { path: "/admin/messages", element: <ManageContact /> },
                { path: "/admin/subscribe", element: <ManageSubs /> },
                { path: "/admin/reviews", element: <ManageFeedback /> },
                { path: "/admin/product/addprod", element: <AddProd /> },
                { path: "/admin/product/manageprod", element: <ManageProd /> },
                { path: "/admin/orders", element: <ManageOrders /> },
              ],
            },
            { path: "/profile", element: <UserDashboard /> },
            { path: "/wishlist", element: <Wishlist /> },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </>
  );
}

export default App;
