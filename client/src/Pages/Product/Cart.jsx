import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getCart, removeFromCart } from "../../Features/cart/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { CartQuantity } from "./CartQuantity";

export const Cart = () => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const subtotal = Array.isArray(items)
    ? items.reduce(
        (acc, item) =>
          acc + (item?.productId?.price || 0) * (item?.quantity || 0),
        0
      )
    : 0;

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <section className="min-h-screen px-4 py-5 md:py-12 max-w-7xl m-auto text-gray-900">
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-5 md:mb-8">
        Shopping Bag
      </h1>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="flex bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden h-[120px] md:h-[150px]"
              >
                <img
                  src={item?.productId?.images?.[0] || "/placeholder.png"}
                  alt={item?.productId?.productname || "Product"}
                  className="w-[80px] md:w-[120px] object-cover"
                />
                <div className="flex flex-col justify-between p-2 md:p-4 flex-1">
                  <div>
                    <h2 className="text-sm md:text-lg line-clamp-2">
                      {item?.productId?.productname || "Unnamed product"}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      ₹{item?.productId?.price || 0} x {item?.quantity || 0}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-gray-500 text-sm mt-1">
                        <b>Size: </b>
                        {item.size}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        <b>Color: </b>
                        <span
                          className={`text-[10px] px-1 text-white border border-black rounded`}
                          style={{ backgroundColor: item.color }}
                        >
                          {item.color}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <CartQuantity item={item} />
                    <button
                      onClick={() => handleRemove(item.productId._id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty 🛒</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="text-sm space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between text-base font-semibold text-black">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          <div className="mt-5 w-full">
            <NavLink
              to={items.length > 0 ? "/checkout" : "#"}
              className={`block w-full text-center py-3 rounded-lg transition ${
                items.length > 0
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={(e) => {
                if (items.length === 0) e.preventDefault();
              }}
            >
              Proceed to Checkout
            </NavLink>

            <NavLink
              to={"/shop"}
              className="block text-center mt-4 text-sm text-gray-600 hover:underline"
            >
              ← Continue Shopping
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
