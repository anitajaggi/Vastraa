import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearFieldError } from "../../Features/Auth/authSlice";
import { currentUser, registerUser } from "../../Features/Auth/authThunk";
import { useState } from "react";

export const Register = () => {
  const { fieldErrors } = useSelector((state) => state.auth);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(registerData));
    if (registerUser.fulfilled.match(res)) {
      setRegisterData({ username: "", email: "", phone: "", password: "" });
      await dispatch(currentUser());
      navigate("/profile");
    }
  };

  return (
    <div className="lex items-center justify-center bg-[#fafafa] px-4 py-12">
      <div className="max-w-md m-auto w-full border border-black bg-white p-4 md:p-8 rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-gray-500 text-sm mt-2">
            Join Vastraa and step into timeless style
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black ${
                fieldErrors?.username ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="e.g. aarav singh"
              value={registerData.username}
              onChange={handleOnChange}
            />
            {fieldErrors?.username && (
              <p className="text-red-600 txt-r text-sm mt-1">
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black ${
                fieldErrors?.email ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="you@example.com"
              autoComplete="email"
              value={registerData.email}
              onChange={handleOnChange}
            />
            {fieldErrors?.email && (
              <p className="text-red-600 txt-r text-sm mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black ${
                fieldErrors?.phone ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="+91 000 000 0000"
              autoComplete="phone"
              value={registerData.phone}
              onChange={handleOnChange}
            />
            {fieldErrors?.phone && (
              <p className="text-red-600 txt-r text-sm mt-1">
                {fieldErrors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black ${
                fieldErrors?.password ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="••••••••"
              autoComplete="current-password"
              value={registerData.password}
              onChange={handleOnChange}
            />
            {fieldErrors?.password && (
              <p className="text-red-600 txt-r text-sm mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Create Account
          </button>
        </form>

        <div className="text-center my-4 text-sm text-gray-400">or</div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-black font-medium hover:underline"
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};
