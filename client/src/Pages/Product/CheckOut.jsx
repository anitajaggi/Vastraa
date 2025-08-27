import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../Features/checkout/orderThunk";
import { resetOrder } from "../../Features/checkout/orderSlice";
import { clearCart } from "../../Features/cart/cartSlice";
import { fetchCartDetails } from "../../Features/products/productThunk";
import { Popup } from "../../components/Ui/Popup";

export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { items: cartItems, loading: cartLoading } = useSelector(
    (state) => state.cart
  );
  const { loading: orderLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (cartItems.length) {
      dispatch(fetchCartDetails(cartItems));
    }
  }, []);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    stateName: "",
    pincode: "",
  });

  const handleChange = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setIsOpen(true);
      return;
    }

    const shippingAddress = {
      name: address.name,
      phone: address.phone,
      address: address.addressLine,
      city: address.city,
      state: address.stateName,
      pincode: address.pincode,
    };

    const orderData = {
      items: cartItems.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
        size: i.size,
        color: i.color,
      })),
      shippingAddress,
      paymentMethod: "COD",
      totalAmount: subtotal,
    };

    try {
      await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      dispatch(resetOrder());
      navigate("/order-success", {
        replace: true,
        state: { fromCheckout: true },
      });
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <div className="max-w-7xl mt-10 mx-auto">
      <h2 className="text-2xl md:text-5xl font-bold mb-4 text-center">
        Checkout
      </h2>

      <div className="shadow p-4 rounded">
        <div className="mb-6 border p-4 rounded text-black">
          <h3 className="font-semibold mb-2">Your Cart</h3>
          {cartLoading ? (
            <p>Loading cart details...</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={`${item.productId._id}-${item.size}-${item.color}`}
                className="flex justify-between mb-2"
              >
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
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))
          ) : (
            <p>Your cart is empty 🛒</p>
          )}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>₹{subtotal}</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                value={address.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                required
                value={address.phone}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="addressLine"
                placeholder="Address"
                required
                value={address.addressLine}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="city"
                required
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="stateName"
                required
                placeholder="State"
                value={address.stateName}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="pincode"
                required
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
          </div>
          <button
            disabled={
              cartLoading ||
              !address.name ||
              !address.phone ||
              !address.addressLine ||
              !address.city ||
              !address.stateName ||
              !address.pincode
            }
            className="w-full bg-black text-white py-3 cursor-pointer rounded disabled:bg-gray-400"
          >
            {orderLoading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Login Required"
        description="You need to be logged in to place an order. Please log in to continue."
      />
    </div>
  );
};
