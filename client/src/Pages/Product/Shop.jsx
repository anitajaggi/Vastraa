import { useDispatch } from "react-redux";
import { ProductCard } from "./ProductCard";
import { useEffect } from "react";
import { getLimitedProducts } from "../../Features/products/productThunk";
import { useParams } from "react-router-dom";
import { Pagination } from "../../utils/Pagination";
import { useProductLogic } from "../../Admin/product/useProdLogic";

export const Shop = () => {
  const { products, currentPage, totalPages, loading, setPage, page } =
    useProductLogic();
  const dispatch = useDispatch();

  const { categorySlug, subcategorySlug } = useParams();
  const categorySlugFromUrl = categorySlug || "";
  const subcategorySlugFromUrl = subcategorySlug || "";

  useEffect(() => {
    dispatch(
      getLimitedProducts({
        page,
        limit: 10,
        categorySlug: categorySlugFromUrl,
        subcategorySlug: subcategorySlugFromUrl,
      })
    );
  }, [categorySlugFromUrl, subcategorySlugFromUrl, page, dispatch]);

  return (
    <main className="max-w-7xl m-auto px-3">
      <div className="py-4 md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Vastraa Collection</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="text-center py-5">
        {totalPages > 1 && (
          <div className="text-center py-5">
            <Pagination
              page={page}
              currentPage={currentPage}
              totalPages={totalPages}
              loading={loading}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </main>
  );
};
