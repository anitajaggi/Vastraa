import { useDispatch } from "react-redux";
import { updateCartQty } from "../../Features/cart/cartSlice";

export const CartQuantity = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (type) => {
    let newQty = item.quantity;

    if (type === "increment" && item.quantity < item.stock) {
      newQty = item.quantity + 1;
    } else if (type === "decrement" && item.quantity > 1) {
      newQty = item.quantity - 1;
    }

    if (newQty !== item.quantity) {
      dispatch(
        updateCartQty({
          productId: item.productId,
          color: item.color,
          size: item.size,
          quantity: newQty,
        })
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleQtyChange("decrement")}
        disabled={item.quantity <= 1}
        className="w-8 h-8 border rounded text-lg hover:bg-gray-100 disabled:opacity-50"
      >
        −
      </button>

      <span className="text-sm">{item.quantity}</span>

      <button
        onClick={() => handleQtyChange("increment")}
        disabled={item.quantity >= item.stock}
        className="w-8 h-8 border rounded text-lg hover:bg-gray-100 disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
};
