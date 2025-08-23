import { NavLink } from "react-router-dom";
import { getLimitedUsers } from "../Features/Auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../Features/contact/contactThunk";
import { getLimitedSubscribers } from "../Features/subscribe/subsThunk";
import { fetchFeeds } from "../Features/feedback/feedbackThunk";

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { totalUsers } = useSelector((state) => state.users);
  const { totalCategories } = useSelector((state) => state.categories);
  const { totalContacts } = useSelector((state) => state.contacts);
  const { totalSubscribers } = useSelector((state) => state.subscribe);
  const { totalFeedbacks } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getLimitedUsers({ totalUsers }));
      dispatch(fetchContacts({ totalContacts }));
      dispatch(getLimitedSubscribers({ totalSubscribers }));
      dispatch(fetchFeeds({ totalFeedbacks }));
    }
  }, [dispatch, user]);

  const cards = [
    {
      title: "Users",
      count: totalUsers,
      link: "/admin/users",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      title: "Subscribers",
      count: totalSubscribers,
      link: "/admin/subscribe",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Messages",
      count: totalContacts,
      link: "/admin/messages",
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Feedbacks",
      count: totalFeedbacks,
      link: "/admin/reviews",
      color: "bg-teal-100 text-teal-700",
    },
  ];

  return (
    <div className="flex bg-gray-50 p-6">
      <div className="flex-1">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome <span className="text-red-600">{user.username}</span>
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <NavLink
              to={card.link}
              key={idx}
              className={`rounded-2xl p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1  border-t-4 ${card.color}`}
            >
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-3xl font-bold">{card.count}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
