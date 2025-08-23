import { useDispatch } from "react-redux";
import { updateCartQty } from "../../Features/cart/cartThunk";

export const CartQuantity = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (type) => {
    let newQty = item.quantity;

    if (type === "increment") {
      newQty = item.quantity + 1;
    } else if (type === "decrement" && item.quantity > 1) {
      newQty = item.quantity - 1;
    }

    if (newQty > 0) {
      dispatch(
        updateCartQty({
          productId: item.productId._id,
          quantity: newQty,
        })
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleQtyChange("decrement")}
        className="w-8 h-8 border rounded text-lg hover:bg-gray-100"
      >
        −
      </button>

      <span className="text-sm">{item.quantity}</span>

      <button
        onClick={() => handleQtyChange("increment")}
        className="w-8 h-8 border rounded text-lg hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};
