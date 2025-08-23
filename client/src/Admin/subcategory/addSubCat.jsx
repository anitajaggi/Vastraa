import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createSubCategory,
  getLimitedSubCategories,
  updateSubCategory,
} from "../../Features/category/subcatThunk";
import { getAllCategories } from "../../Features/category/categoryThunk";
import { clearFieldError } from "../../Features/category/subcatSlice";

export const AddSubCat = () => {
  const [subcategory, setSubcategory] = useState({
    subcategory: "",
    categoryId: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { allCategories } = useSelector((state) => state.categories);

  const { fieldErrors, subcategories } = useSelector(
    (state) => state.subcategories
  );

  const params = new URLSearchParams(location.search);
  const idFromUrl = params.get("id");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // Load subcategory for editing if id is present
  useEffect(() => {
    if (idFromUrl && subcategories.length > 0) {
      const existing = subcategories.find((cat) => cat._id === idFromUrl);
      if (existing) {
        setSubcategory({
          id: existing._id,
          subcategory: existing.subcategory,
          categoryId: existing.categoryId._id,
        });
      }
    }
  }, [idFromUrl, subcategories]);

  const handleChange = (e) => {
    setSubcategory({ ...subcategory, [e.target.name]: e.target.value });

    if (fieldErrors[e.target.name]) {
      dispatch(clearFieldError(e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;

    if (subcategory.id) {
      res = await dispatch(
        updateSubCategory({
          subcategoryId: subcategory.id,
          subcategory: {
            subcategory: subcategory.subcategory,
            categoryId: subcategory.categoryId,
          },
        })
      );
    } else {
      res = await dispatch(
        createSubCategory({
          subcategory: subcategory.subcategory,
          categoryId: subcategory.categoryId,
        })
      );
    }

    if (
      createSubCategory.fulfilled.match(res) ||
      updateSubCategory.fulfilled.match(res)
    ) {
      dispatch(getLimitedSubCategories({ page: 1, limit: 10 }));
      navigate("/admin/subcategory/managesubcat");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-black">
          {subcategory.id ? "Edit Subcategory" : "Add New Subcategory"}
        </h3>

        <div>
          <select
            id="categoryId"
            name="categoryId"
            value={subcategory.categoryId}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.categoryId ? "border-red-600" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
          {fieldErrors?.categoryId && (
            <p className="text-sm text-red-600 mt-1">
              {fieldErrors.categoryId}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="subcategory"
            value={subcategory.subcategory}
            onChange={handleChange}
            placeholder="Enter subcategory name"
            className={`w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition ${
              fieldErrors?.subcategory ? "border-red-600" : "border-gray-300"
            }`}
          />
          {fieldErrors?.subcategory && (
            <p className="text-sm text-red-600 mt-1">
              {fieldErrors.subcategory}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full border border-black py-2 rounded-lg text-white transition duration-200 cursor-pointer bg-black hover:bg-white hover:text-black"
        >
          {subcategory.id ? "Update Subcategory" : "Add Subcategory"}
        </button>
      </div>
    </form>
  );
};
