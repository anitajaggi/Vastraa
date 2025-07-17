import { ProductCard } from "./ProductCard";

export const Products = () => {
  return (
    <>
      <div className="py-4 md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Vastraa Collection</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};
