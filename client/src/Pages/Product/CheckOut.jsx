import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../Features/checkout/orderThunk";
import { resetOrder } from "../../Features/checkout/orderSlice";
import { clearCart } from "../../Features/cart/cartSlice";

export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s) => s.cart);
  const { loading, error } = useSelector((s) => s.orders);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0
  );

  const handleChange = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async () => {
    const orderData = {
      items: items.map((i) => ({
        productId: i.productId._id,
        quantity: i.quantity,
        price: i.productId.price,
        size: i.size,
        color: i.color,
      })),
      shippingAddress: address,
      paymentMethod: "COD",
      totalAmount: subtotal,
    };

    try {
      await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      dispatch(resetOrder());
      navigate("/order-success", {
        state: { fromCheckout: true },
        replace: true,
      });
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mt-10 mx-auto">
      <h2 className="text-2xl md:text-5xl font-bold mb-4 text-center">
        Checkout
      </h2>
      <div className="shadow p-4 rounded">
        <div className="mb-6 border p-4 rounded text-black">
          <h3 className="font-semibold mb-2">Your Cart</h3>
          {items.map((item) => (
            <div key={item.productId._id} className="flex justify-between mb-2">
              <div>
                <span className="font-medium">
                  {item.productId.productname}
                </span>
                <div className="text-sm text-gray-600">
                  {item.color && <span>Color: {item.color} </span>}
                  {item.size && <span> | Size: {item.size}</span>}
                </div>
                <div className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </div>
              </div>
              <span className="font-semibold">
                ₹{item.productId.price * item.quantity}
              </span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>₹{subtotal}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["name", "phone", "address", "city", "state", "pincode"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={address[field]}
                  onChange={handleChange}
                  className={`border p-2 rounded ${
                    field === "address" ? "col-span-2" : ""
                  }`}
                />
              )
            )}
          </div>
        </div>

        {error && <p className="mb-4 text-red-600">{String(error)}</p>}

        <button
          onClick={handlePlaceOrder}
          disabled={
            loading ||
            !address.name ||
            !address.phone ||
            !address.address ||
            !address.city ||
            !address.state ||
            !address.pincode
          }
          className="w-full bg-black text-white py-3 rounded disabled:bg-gray-400"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};
