import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getWishlist,
  removeFromWishlist,
} from "../Features/wishlist/wishlistThunk";

export const Wishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="max-w-7xl m-auto px-4 py-5 md:py-10">
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-5">
        Your Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your wishlist is empty. Go fall in love with something 💫
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={item.images[0]}
                alt={item.productname}
                className="h-[150px] md:h-[220px] w-full object-cover"
              />
              <div className="p-1 md:p-2 space-y-1">
                <h2 className="text-gray-800 line-clamp-1 text-sm md:text-lg">
                  {item.name}
                </h2>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex flex-col md:flex-row md:items-center items-center gap-1 mt-2">
                  <NavLink
                    to={`/product/${item.slug}`}
                    className="flex cursor-pointer items-center gap-2 px-3 py-1 w-full text-sm font-medium border rounded-lg bg-black transition"
                  >
                    More Details
                  </NavLink>
                  <button
                    className="text-red-500 cursor-pointer hover:underline text-sm flex items-center gap-1"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaHeart size={14} className="fill-red-500" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <NavLink
          to="/shop"
          className="cursor-pointer px-4 py-2 font-medium border rounded-lg bg-black transition w-fit"
        >
          ← Continue Shopping
        </NavLink>
      </div>
    </div>
  );
};
