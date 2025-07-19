import { NavLink } from "react-router-dom";
import { ProductCard } from "./ProductCard";

export const Products = () => {
  return (
    <>
      <div className="py-4 md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Latest Collection</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="mt-5 py-5 text-center bg-gray-100">
        <NavLink
          to={"/shop"}
          className="bg-black border cursor-pointer border-black px-4 py-2 rounded-xl hover:bg-white hover:text-black transition"
        >
          Explore More
        </NavLink>
      </div>
    </>
  );
};
