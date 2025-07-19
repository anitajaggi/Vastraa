import { NavLink } from "react-router-dom";

export const Checkout = () => {
  return (
    <div className="max-w-7xl m-auto px-4 py-10 text-gray-900">
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-12">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Billing Address"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full border px-4 py-2 rounded-md"
              />
            </form>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Shipping Information
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Recipient Name"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Shipping Address"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full border px-4 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full border px-4 py-2 rounded-md"
              />
            </form>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4 text-gray-700 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹8,797</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹8,797</span>
            </div>
          </div>

          <button className="mt-6 w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
            Place Order
          </button>

          <NavLink
            to="/cart"
            className="block text-center mt-5 text-sm text-gray-600 hover:underline"
          >
            ← Back to Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
};
