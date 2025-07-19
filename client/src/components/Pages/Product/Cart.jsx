import { NavLink } from "react-router-dom";
import hero1 from "/hero1.jpg";
import hero2 from "/hero2.jpg";
import hero3 from "/hero3.jpg";

const cartItems = [
  {
    id: 1,
    name: "Silk Blend Kurta",
    price: 2499,
    quantity: 1,
    image: hero1,
  },
  {
    id: 2,
    name: "Handloom Cotton Saree",
    price: 3299,
    quantity: 2,
    image: hero2,
  },
  {
    id: 3,
    name: "Handloom Cotton Saree",
    price: 3299,
    quantity: 2,
    image: hero3,
  },
];

export const Cart = () => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen px-4 py-12 max-w-7xl m-auto text-gray-900">
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-12">
        Shopping Bag
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden h-[150px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100px] object-cover"
              />
              <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 border rounded text-lg hover:bg-gray-100">
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button className="w-8 h-8 border rounded text-lg hover:bg-gray-100">
                      +
                    </button>
                  </div>
                  <button className="text-sm text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
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
              to={"/checkout"}
              className="block w-full text-center bg-black text-white py-3 rounded-lg  transition"
            >
              Proceed to Checkout
            </NavLink>

            <NavLink
              to="/products"
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
