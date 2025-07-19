import { NavLink } from "react-router-dom";

export const Register = () => {
  return (
    <div className="lex items-center justify-center bg-[#fafafa] px-4 py-12">
      <div className="max-w-md m-auto w-full border border-black bg-white p-4 md:p-8 rounded-2xl shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-gray-500 text-sm mt-2">
            Join Vastraa and step into timeless style
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="e.g. aarav_singh"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="+91 98765 43210"
              autoComplete="phone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
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
