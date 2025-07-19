import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold font-serif text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Sorry, the page you’re looking for doesn't exist or has been moved.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-block px-6 py-3 cursor-pointer border border-black bg-black text-white rounded-lg font-medium hover:bg-white hover:text-black transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};
