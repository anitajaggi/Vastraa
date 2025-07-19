export const ProductDetails = () => {
  return (
    <div className="max-w-7xl m-auto py-10">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <img
            src="/hero1.jpg"
            alt="Product"
            className="w-full h-[500px] object-cover rounded-xl shadow-md"
          />
          <div className="flex gap-4 justify-center">
            <img
              src={`/hero1.jpg`}
              alt={`Thumb`}
              className="w-20 h-20 object-cover rounded-md border hover:border-black cursor-pointer"
            />
            <img
              src={`/hero3.jpg`}
              alt={`Thumb`}
              className="w-20 h-20 object-cover rounded-md border hover:border-black cursor-pointer"
            />
            <img
              src={`/hero2.jpg`}
              alt={`Thumb`}
              className="w-20 h-20 object-cover rounded-md border hover:border-black cursor-pointer"
            />
            <img
              src={`/hero1.jpg`}
              alt={`Thumb`}
              className="w-20 h-20 object-cover rounded-md border hover:border-black cursor-pointer"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Silk Blend Embroidered Kurta
          </h2>
          <p className="text-xl mb-2">₹2,499</p>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg mr-2">★★★★☆</span>
            <span className="text-sm text-gray-400">(120 reviews)</span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Crafted with care, this luxurious silk blend kurta is embroidered
            with traditional Indian patterns. Soft, breathable, and timeless —
            perfect for festive occasions or modern minimal wear.
          </p>

          <div className="mb-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-black">Size</label>
              <div className="flex gap-3 mt-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="border text-black cursor-pointer border-gray-300 px-4 py-2 rounded-md hover:border-black transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-black">Quantity</label>
              <div className="flex items-center gap-3 mt-2">
                <button className="px-3 py-2 border rounded-md text-black cursor-pointer hover:bg-gray-100">
                  -
                </button>
                <span className="text-lg text-black">1</span>
                <button className="px-3 py-2 border rounded-md text-black cursor-pointer hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="border text-black border-gray-300 px-6 py-3 rounded-lg hover:border-black transition">
              ♥ Wishlist
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>Free shipping over ₹999 • Easy returns within 7 days</p>
            <p className="mt-1">Delivery in 2-4 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
};
