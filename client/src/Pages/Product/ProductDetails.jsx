import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../Features/products/productThunk";
import { useEffect, useState } from "react";
import { AddToWishlist } from "./AddToWishlist";
import { AddToCart } from "./AddToCart";

export const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { singleProduct: product, loading } = useSelector(
    (state) => state.products
  );

  const [selectedImage, setSelectedImage] = useState("/placeholder.jpg");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (slug) {
      dispatch(getSingleProduct(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
    if (product?.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found</p>;

  return (
    <div className="max-w-7xl m-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <img
            src={selectedImage}
            alt={product.productname}
            className="w-full md:h-[500px] object-contain rounded-xl shadow"
          />
          <div className="flex gap-4 justify-center">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Thumbnail image"
                onClick={() => setSelectedImage(img)}
                className={`w-15 h-15 md:w-20 md:h-20 object-cover rounded-md border cursor-pointer hover:border-black transition 
                  ${
                    selectedImage === img ? "border-black" : "border-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {product.productname}
          </h2>

          <p className="text-xl mb-2">
            <span className="line-through text-gray-400 mr-2">
              ₹{product.mrp}
            </span>
            <span className="text-black font-semibold">₹{product.price}</span>
          </p>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg mr-2">
              {"★".repeat(Math.floor(product.rating || 0))}
              {"☆".repeat(5 - Math.floor(product.rating || 0))}
            </span>
            <span className="text-sm text-gray-400">
              ({product.rating || 0} rating)
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {product.colors?.length > 0 && (
            <div className="mb-4">
              <label className="text-sm font-medium text-black">Colors:</label>
              <div className="flex gap-2 mt-2">
                {product.colors.map((color, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 transition 
                      ${
                        selectedColor === color
                          ? "border-indigo-500"
                          : "border-transparent"
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <label className="text-sm font-medium text-black">Sizes:</label>
              <div className="flex gap-3 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border text-black cursor-pointer border-gray-300 px-4 py-2 rounded-md hover:border-black transition ${
                      selectedSize === size ? "border-indigo-500" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 flex items-center gap-3">
            <label className="text-sm font-medium text-black">Quantity:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 border border-black text-black rounded hover:bg-gray-100 disabled:opacity-50"
              >
                −
              </button>

              <span className="w-8 text-center text-black">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev < product.stock ? prev + 1 : prev
                  )
                }
                disabled={quantity >= product.stock}
                className="w-8 h-8 border border-black text-black rounded hover:bg-gray-100 disabled:opacity-50"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {product.stock} item{product.stock === 1 ? "" : "s"} available
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {product?._id && (
              <AddToCart
                productId={product._id}
                product={product}
                size={selectedSize}
                color={selectedColor}
                quantity={quantity}
                stock={product.stock}
              />
            )}
            <AddToWishlist productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
};
