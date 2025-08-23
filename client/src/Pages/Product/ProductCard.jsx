import { NavLink } from "react-router-dom";

export const ProductCard = ({ product }) => (
  <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out">
    <div className="relative">
      {/* <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-full text-xs">
        {product.subcategory?.subcategory || "Uncategorized"}
      </div> */}
      <img
        className="w-full h-40 md:h-80 object-cover"
        src={product.images?.[0] || "/placeholder.jpg"}
        alt={product.productname}
      />
    </div>
    <div className="p-2 md:p-3">
      <h3 className="text-gray-900">{product.productname}</h3>
      <p className="text-sm text-gray-500 mb-1 line-clamp-2">
        {product.description || "No description available."}
      </p>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-md font-semibold text-black">
          Rs.{product.price}
        </span>
        <NavLink
          to={`/product/${product.slug}`}
          className="text-sm px-4 cursor-pointer py-2 border border-black bg-black text-white rounded-full hover:text-black hover:bg-white transition"
        >
          More Details
        </NavLink>
      </div>
    </div>
  </div>
);
