import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../../Features/wishlist/wishlistThunk";
import { useEffect } from "react";
import { Popup } from "../../components/Ui/Popup";

export const AddToWishlist = ({ productId }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const isWishlisted = items?.some((p) => (p._id || p) === productId);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleClick = () => {
    if (!isAuthenticated) {
      setIsOpen(true);
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  return (
    <>
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

      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Login Required"
        description="You need to be logged in to add items to your wishlist."
      />
    </>
  );
};
