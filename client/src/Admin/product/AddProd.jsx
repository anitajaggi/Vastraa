import { useState, useRef, use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFieldError } from "../../Features/products/productSlice";
import {
  createProduct,
  getLimitedProducts,
  updateProduct,
} from "../../Features/products/productThunk";
import { getAllCategories } from "../../Features/category/categoryThunk";
import { getAllSubCategories } from "../../Features/category/subcatThunk";
import { useLocation, useNavigate } from "react-router-dom";

export const AddProd = () => {
  const [formData, setFormData] = useState({
    productname: "",
    category: "",
    subcategory: "",
    mrp: "",
    price: "",
    stock: "",
    description: "",
    colors: "",
    sizes: "",
    rating: "",
  });

  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, fieldErrors } = useSelector((state) => state.products);
  const { allCategories } = useSelector((state) => state.categories);
  const { allSubcategories } = useSelector((state) => state.subcategories);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllSubCategories());
  }, [dispatch]);

  const params = new URLSearchParams(location.search);
  const idFromUrl = params.get("id");

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  useEffect(() => {
    if (formData.category) {
      const filtered = allSubcategories.filter(
        (sub) => sub.categoryId?._id === formData.category
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [formData.category, allSubcategories]);

  useEffect(() => {
    if (idFromUrl && products.length > 0 && allSubcategories.length > 0) {
      const existing = products.find((prod) => prod._id === idFromUrl);
      if (existing) {
        const filtered = allSubcategories.filter(
          (sub) => sub.categoryId?._id === existing.category?._id
        );
        setFilteredSubcategories(filtered);

        setFormData({
          id: existing._id,
          productname: existing.productname,
          category: existing.category?._id,
          subcategory: existing.subcategory?._id,
          mrp: existing.mrp,
          price: existing.price,
          stock: existing.stock,
          description: existing.description,
          colors: existing.colors.join(", "),
          sizes: existing.sizes.join(", "),
          rating: existing.rating,
        });
        setImages(existing.images);
      }
    }
  }, [idFromUrl, products, allSubcategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors?.[name]) {
      dispatch(clearFieldError(name));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 2 * 1024 * 1024; // 2MB limit
    const maxFiles = 5;

    let errors = [];
    let validImages = [];

    if (files.length > maxFiles) {
      errors.push(`You can upload a maximum of ${maxFiles} images.`);
    }

    files.forEach((file) => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name} is larger than 2MB.`);
      } else {
        validImages.push(file);
      }
    });

    if (errors.length > 0) {
      setImageError(errors.join(" "));
      e.target.value = null;
      setImages([]);
    } else {
      setImageError("");
      setImages(validImages);
    }
    if (fieldErrors?.images) {
      dispatch(clearFieldError("images"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "colors" || key === "sizes") {
        value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
          .forEach((item) => {
            payload.append(`${key}[]`, item);
          });
      } else {
        payload.append(key, value);
      }
    });

    images.forEach((img) => payload.append("images", img));

    let res;
    if (formData.id) {
      res = await dispatch(
        updateProduct({ productId: formData.id, productData: payload })
      );
    } else {
      res = await dispatch(createProduct(payload));
    }

    if (
      createProduct.fulfilled.match(res) ||
      updateProduct.fulfilled.match(res)
    ) {
      dispatch(getLimitedProducts({ page: 1, limit: 10 }));
      navigate("/admin/product/manageprod");
      fileInputRef.current.value = null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-black">Add New Product</h3>

        <div>
          <input
            type="text"
            name="productname"
            placeholder="Product name"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.productname ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.productname}
            onChange={handleChange}
          />
          {fieldErrors?.productname && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.productname}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Category
          </label>
          <select
            name="category"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.category ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
          {fieldErrors?.category && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.category}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Subcategory
          </label>
          <select
            name="subcategory"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.subcategory ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.subcategory}
            onChange={handleChange}
          >
            <option value="">Select Subcategory</option>
            {filteredSubcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.subcategory}
              </option>
            ))}
          </select>
          {fieldErrors?.subcategory && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.subcategory}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="mrp"
            placeholder="MRP"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.mrp ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.mrp}
            onChange={handleChange}
          />
          {fieldErrors?.mrp && (
            <p className="text-sm txt-r text-red-500 mt-1">{fieldErrors.mrp}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.price ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.price}
            onChange={handleChange}
          />
          {fieldErrors?.price && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.price}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.stock ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.stock}
            onChange={handleChange}
          />
          {fieldErrors?.stock && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.stock}
            </p>
          )}
        </div>

        <div>
          <textarea
            name="description"
            rows="4"
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {fieldErrors?.description && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.description}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="colors"
            placeholder="Colors (comma-separated)"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.colors ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.colors}
            onChange={handleChange}
          />
          {fieldErrors?.colors && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.colors}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="sizes"
            placeholder="Sizes (comma-separated)"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.sizes ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.sizes}
            onChange={handleChange}
          />
          {fieldErrors?.sizes && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.sizes}
            </p>
          )}
        </div>

        <div>
          <input
            type="number"
            name="rating"
            min={0}
            max={5}
            placeholder="Rating"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.rating ? "border-red-600" : "border-gray-300"
            }`}
            value={formData.rating}
            onChange={handleChange}
          />
          {fieldErrors?.rating && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.rating}
            </p>
          )}
        </div>

        <div>
          {imageError && (
            <p className="text-sm txt-r text-red-500 mt-1">{imageError}</p>
          )}
          <label className="block mb-1 text-gray-700 font-medium">
            Upload Images{" "}
            <span className="text-xs">(max 5, total 5MB, each 1MB)</span>
          </label>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-black file:text-white hover:file:bg-gray-800 ${
              fieldErrors?.images ? "border-red-600" : "border-gray-300"
            }`}
            accept="image/*"
          />
          {fieldErrors?.images && (
            <p className="text-sm txt-r text-red-500 mt-1">
              {fieldErrors.images}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full border border-black py-2 rounded-lg text-white bg-black hover:bg-white hover:text-black transition duration-200 cursor-pointer"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};
