import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../Features/checkout/orderThunk";

export const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading your orders...</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-4 text-gray-600">
        You haven’t placed any orders yet. 🛒
      </div>
    );
  }

  return (
    <div className="mt-5 bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">My Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-black font-medium text-white border-b border-indigo-100">
            <tr>
              <th className="px-6 py-3 w-12">#</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Products</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id || index}
                className="border-b hover:bg-indigo-50/30 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.shippingAddress ? (
                    <div>
                      <div>{order.shippingAddress.name}</div>
                      <div>
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                      </div>
                      <div className="text-xs text-gray-500">
                        📞 {order.shippingAddress.phone}
                      </div>
                    </div>
                  ) : (
                    "Unknown"
                  )}
                </td>

                <td className="px-6 py-4">
                  {order.items?.map((item) => (
                    <div key={item._id} className="text-sm">
                      <div>
                        <span className="font-medium">
                          {item.productId?.productname || "Unknown Product"}
                        </span>{" "}
                        <span className="text-gray-500">
                          (x{item.quantity}) - ₹{item.price}
                        </span>
                      </div>
                      <div>
                        Color:{" "}
                        <span className="text-gray-500">{item.color}</span> |
                        Size: <span className="text-gray-500">{item.size}</span>
                      </div>
                    </div>
                  ))}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ₹{order.totalAmount}
                </td>

                <td className="px-6 py-4">{order.paymentMethod}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : order.status === "Shipped"
                        ? "bg-purple-100 text-purple-700 border-purple-300"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-red-100 text-red-700 border-red-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
