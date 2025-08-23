import { Pagination } from "../../utils/Pagination";
import { useOrders } from "./useOrderLogic";

export const ManageOrders = () => {
  const {
    orders,
    currentPage,
    totalPages,
    loading,
    page,
    limit,
    setPage,
    handleStatusChange,
  } = useOrders();

  return (
    <div className="mt-5 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-black font-medium text-white border-b border-indigo-100">
            <tr>
              <th className="px-6 py-3 w-12">#</th>
              <th className="px-6 py-3">Customer</th>
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
                <td className="px-6 py-4">
                  {(currentPage - 1) * limit + index + 1}
                </td>

                <td className="px-6 py-2 font-medium">
                  {order.userId?.username || "Unknown"}
                  {order.userId?.email && (
                    <div className="text-xs text-gray-500">
                      {order.userId.email}
                    </div>
                  )}
                </td>

                <td className="px-6 py-2 text-sm text-gray-600">
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

                <td className="px-6 py-2">
                  {order.items?.map((item) => (
                    <div key={item._id} className="text-sm mb-1">
                      <div className="font-medium">
                        {item.productId?.productname || "Unknown Product"}
                      </div>
                      <div className="text-gray-600 text-xs">
                        Qty: {item.quantity} | ₹{item.price}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {item.color && <span>Color: {item.color} </span>}
                        {item.size && <span>| Size: {item.size}</span>}
                      </div>
                    </div>
                  ))}
                </td>

                <td className="px-6 py-2 font-semibold">
                  ₹{order.totalAmount}
                </td>

                <td className="px-6 py-2">{order.paymentMethod}</td>

                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`px-2 py-1 rounded-lg border focus:outline-none focus:ring
    ${
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
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />
    </div>
  );
};
