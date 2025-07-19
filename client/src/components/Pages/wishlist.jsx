import { NavLink } from "react-router-dom";
import { FaCartShopping, FaHeart } from "react-icons/fa6";

const wishlistItems = [
  {
    id: 1,
    name: "Embroidered Anarkali Set",
    price: 3599,
    image: "/hero1.jpg",
  },
  {
    id: 2,
    name: "Chikankari Kurti",
    price: 2799,
    image: "/hero2.jpg",
  },
  {
    id: 3,
    name: "Indigo Block Print Dress",
    price: 1999,
    image: "/hero3.jpg",
  },
  {
    id: 4,
    name: "Indigo Block Print Dress",
    price: 1999,
    image: "/hero3.jpg",
  },
];

export const Wishlist = () => {
  return (
    <div className="max-w-7xl m-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-5">
        Your Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your wishlist is empty. Go fall in love with something 💫
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-[220px] w-full object-cover"
              />
              <div className="p-2 space-y-3">
                <h2 className="text-gray-800">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex flex-col md:flex-row md:items-center items-center gap-2 mt-2">
                  <button className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg bg-black transition">
                    <FaCartShopping size={16} /> Add to Cart
                  </button>
                  <button className="text-red-500 cursor-pointer hover:underline text-sm flex items-center gap-1">
                    <FaHeart size={16} className="fill-red-500" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <NavLink
          to="/products"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Continue Shopping
        </NavLink>
      </div>
    </div>
  );
};
