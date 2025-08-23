import { useDispatch } from "react-redux";
import { addToCart } from "../../Features/cart/cartThunk";

export const AddToCart = ({ productId, size, color, quantity, stock }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (stock > 0) {
      dispatch(addToCart({ productId, size, color, quantity }));
    }
  };

  if (stock <= 0) {
    return (
      <button
        disabled
        className="w-full md:w-auto bg-gray-100 text-red-500 border border-red-500 px-6 py-3 rounded-lg cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full md:w-auto bg-black hover:bg-gray-800 cursor-pointer text-white px-6 py-3 rounded-lg transition font-medium"
    >
      Add to Cart
    </button>
  );
};
