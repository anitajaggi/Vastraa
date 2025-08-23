import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearFieldError } from "../../Features/category/categorySlice";
import {
  createCategory,
  getLimitedCategories,
  updateCategory,
} from "../../Features/category/categoryThunk";

export const AddCat = () => {
  const [category, setCategory] = useState({ category: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { fieldErrors, categories } = useSelector((state) => state.categories);
  const params = new URLSearchParams(location.search);
  const idFromUrl = params.get("id");

  // Prefill if editing
  useEffect(() => {
    if (idFromUrl && categories.length > 0) {
      const existing = categories.find((cat) => cat._id === idFromUrl);
      if (existing) {
        setCategory({ id: existing._id, category: existing.category });
      }
    }
  }, [idFromUrl, categories]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;

    if (category.id) {
      res = await dispatch(
        updateCategory({
          categoryId: category.id,
          category: { category: category.category },
        })
      );
    } else {
      res = await dispatch(createCategory({ category: category.category }));
    }

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(getLimitedCategories({ page: 1, limit: 10 }));
      navigate("/admin/category/managecat");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-black">
          {category.id ? "Edit Category" : "Add New Category"}
        </h3>

        <div>
          <input
            type="text"
            name="category"
            value={category.category}
            onChange={handleChange}
            placeholder="Enter category name"
            className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.category ? "border-red-600" : "border-gray-300"
            }`}
          />
          {fieldErrors?.category && (
            <p className="text-sm txt-r text-red-600 mt-1">
              {fieldErrors.category}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full border border-black py-2 rounded-lg text-white transition duration-200 cursor-pointer ${
            category.id
              ? "bg-black hover:bg-white hover:text-black"
              : "bg-black hover:bg-white hover:text-black"
          }`}
        >
          {category.id ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};
