import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../Features/wishlist/wishlistThunk";
import { useEffect } from "react";

export const AddToWishlist = ({ productId }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const isWishlisted = items?.some((p) => (p._id || p) === productId);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleClick = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`border px-6 py-3 cursor-pointer rounded-lg transition ${
        isWishlisted
          ? "border-red-500 text-red-500"
          : "border-gray-300 text-black hover:border-black"
      }`}
    >
      {isWishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
    </button>
  );
};
