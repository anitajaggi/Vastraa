import { useState } from "react";
import { EditProfile } from "./EditProfile";
import { MyOrders } from "./MyOrders";

export const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex border-b border-gray-300 mb-6">
        {["orders", "profile"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 cursor-pointer py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-red-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {activeTab === "orders" && (
          <div>
            <MyOrders />
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <EditProfile />
          </div>
        )}
      </div>
    </div>
  );
};
