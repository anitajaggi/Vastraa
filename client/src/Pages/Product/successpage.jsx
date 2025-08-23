import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromCheckout !== true) {
      navigate("/", { replace: true });
    }

    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate, location.state]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been placed successfully.
          We’ll notify you once it’s shipped.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-3 border border-black text-black rounded-lg font-medium transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};
