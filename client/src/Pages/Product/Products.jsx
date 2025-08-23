import { NavLink } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getLimitedProducts } from "../../Features/products/productThunk";
import { useEffect } from "react";

export const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getLimitedProducts({ page: 1, limit: 4 })); // only 4 latest
  }, [dispatch]);

  return (
    <>
      <div className="py-4 md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">
          Latest Collection
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center">No products available</p>
        )}
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
