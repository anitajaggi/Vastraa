import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, editProfile } from "../Features/Auth/authThunk";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    password: "",
  });

  const isChanged =
    formData.username !== user?.username || formData.password.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;
    const res = await dispatch(editProfile(formData));
    if (editProfile.fulfilled.match(res)) {
      await dispatch(currentUser());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        Edit Profile
      </h2>
      <form className="space-y-5 text-black" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Email(Read Only)
          </label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 bg-gray-100 rounded-lg"
            readOnly
            disabled
            value={user.email}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <input
            type="number"
            name="phone"
            readOnly
            disabled
            className="w-full border px-3 py-2 bg-gray-100 rounded-lg"
            value={user.phone}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border px-3 py-2 rounded-lg"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Leave blank to keep current password"
            className="w-full border px-3 py-2 rounded-lg"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className={`btn ${
            !isChanged ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={!isChanged}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
