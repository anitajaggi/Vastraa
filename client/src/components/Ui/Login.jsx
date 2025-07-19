import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white border border-black p-4 md:p-8 rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Vastraa</h1>
          <p className="text-gray-500 text-sm mt-2">
            Welcome back, please sign in
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email or Phone
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="you@example.com or +91..."
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="••••••••"
              autoComplete="phone"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
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
