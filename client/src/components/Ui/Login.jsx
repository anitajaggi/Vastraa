import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { currentUser, loginUser } from "../../Features/Auth/authThunk";
import { clearFieldError } from "../../Features/Auth/authSlice";

export const Login = () => {
  const { fieldErrors = {} } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLogindata] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLogindata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(loginData));
    if (loginUser.fulfilled.match(res)) {
      const userRes = await dispatch(currentUser());
      const user = userRes.payload;
      if (user?.isAdmin === true) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      setLogindata({ email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white border border-black p-4 md:p-8 rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Vastraa</h1>
          <p className="text-gray-500 text-sm mt-2">
            Welcome back, please sign in
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email or Phone
            </label>
            <input
              type="text"
              name="email"
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black ${
                fieldErrors?.email ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="you@example.com"
              autoComplete="email"
              value={loginData.email}
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
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black ${
                fieldErrors?.password ? "border-red-600" : "border-gray-300"
              }`}
              placeholder="••••••••"
              autoComplete="current-password"
              value={loginData.password}
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
            Sign In
          </button>
        </form>

        <div className="text-center my-4 text-sm text-gray-400">or</div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
};
