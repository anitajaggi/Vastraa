export const ProductCard = () => (
  <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out">
    <div className="relative">
      <img
        className="w-full h-60 md:h-80 object-cover"
        src="hero2.jpg"
        alt="Product"
      />
      <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide font-medium">
        New
      </span>
    </div>
    <div className="p-3">
      <h3 className="font-semibold text-gray-900 mb-1">
        Black Blazer with Structure
      </h3>
      <p className="text-sm text-gray-500 mb-3">
        exquisite tailoring. urban outline. Power dressing at its finest.
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-md font-semibold text-black">Rs.179</span>
        <button className="text-sm px-4 cursor-pointer py-2 border border-black bg-black text-white rounded-full  hover:text-black hover:bg-white transition">
          More Details
        </button>
      </div>
    </div>
  </div>
);
