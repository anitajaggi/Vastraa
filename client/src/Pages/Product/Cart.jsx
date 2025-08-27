import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../Features/cart/cartSlice";
import { CartQuantity } from "./CartQuantity";
import { NavLink } from "react-router-dom";
import { fetchCartDetails } from "../../Features/products/productThunk";

export const Cart = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (items.length) {
      dispatch(fetchCartDetails(items));
    }
  }, [dispatch]);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  return (
    <section className="min-h-screen px-4 py-5 md:py-12 max-w-7xl m-auto text-gray-900">
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-5 md:mb-8">
        Shopping Bag
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading cart...</p>
      ) : (
        <div className="grid relative lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden h-[120px] md:h-[150px]"
                >
                  <img
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    className="w-[80px] md:w-[120px] object-cover"
                  />
                  <div className="flex flex-col justify-between p-2 md:p-4 flex-1">
                    <div>
                      <h2 className="text-sm md:text-lg line-clamp-2">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        ₹{item.price} x {item.quantity}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-gray-500 text-sm mt-1">
                          <b>Size:</b> {item.size}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          <b>Color:</b>{" "}
                          <span
                            style={{ backgroundColor: item.color }}
                            className="text-[10px] px-1 text-white border border-black rounded"
                          >
                            {item.color}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <CartQuantity item={item} />
                    </div>
                    <div className="text-right">
                      <button
                        className="text-sm bg-gray-100 rounded px-2 cursor-pointer text-red-500 underline"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              productId: item.productId,
                              size: item.size,
                              color: item.color,
                            })
                          )
                        }
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

          <div className="bg-white sticky top-5 p-3 md:p-6 rounded-xl border border-gray-200 shadow-md h-fit">
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
            <NavLink
              to={items.length ? "/checkout" : "#"}
              state={{ cartItems: items }}
              className={`block mt-2 w-full text-center py-3 rounded-lg transition ${
                items.length
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Proceed to Checkout
            </NavLink>
          </div>
        </div>
      )}
    </section>
  );
};
