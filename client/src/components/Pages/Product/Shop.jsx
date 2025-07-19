import { ProductCard } from "./ProductCard";

export const Shop = () => {
  return (
    <main className="max-w-7xl m-auto px-3">
      <div className="py-4 md:py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Vastraa Collection</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="text-center py-5">
        <button
          type="button"
          className="bg-black border cursor-pointer border-black px-4 py-2 rounded-xl hover:bg-white hover:text-black transition"
        >
          Load More
        </button>
      </div>
    </main>
  );
};
