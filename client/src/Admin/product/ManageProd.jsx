import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useProductLogic } from "./useProdLogic";
import { Pagination } from "../../utils/Pagination";
import { ConfirmDialog } from "../headlessui/ConfirmBox";
import { useNavigate } from "react-router-dom";

export const ManageProd = () => {
  const {
    products,
    currentPage,
    totalPages,
    loading,
    setPage,
    page,
    limit,
    isConfirmOpen,
    setIsConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleCheckboxChange,
    handleSelectAll,
    selectedProducts,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  } = useProductLogic();

  const navigate = useNavigate();

  return (
    <div className="mt-5 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">Products</h2>
        {selectedProducts.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 cursor-pointer text-sm text-white px-2 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedProducts.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-black font-medium text-white border-b border-indigo-100">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedProducts.length === products.length &&
                    products.length > 0
                  }
                  className="accent-red-600 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Images</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">SubCategory</th>
              <th className="px-6 py-3">Mrp</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Colors</th>
              <th className="px-6 py-3">Sizes</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((prod, index) => (
              <tr key={prod._id} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(prod._id)}
                    onChange={() => handleCheckboxChange(prod._id)}
                    className="accent-red-600 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="px-6 py-4" title={prod.productname}>
                  {prod.productname}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {Array.isArray(prod.images) && prod.images.length > 0 ? (
                      prod.images.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`Product Image ${idx + 1}`}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))
                    ) : (
                      <span className="text-gray-400">No images</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">{prod.category?.category}</td>
                <td className="px-6 py-4">{prod.subcategory?.subcategory}</td>
                <td className="px-6 py-4">{prod.mrp}</td>
                <td className="px-6 py-4">{prod.price}</td>
                <td className="px-6 py-4">{prod.stock}</td>
                <td className="px-6 py-4" title={prod.description}>
                  {prod.description}
                </td>
                <td className="px-6 py-4">
                  {Array.isArray(prod.colors) && prod.colors.length > 0
                    ? prod.colors.join(", ")
                    : "—"}
                </td>
                <td className="px-6 py-4">
                  {Array.isArray(prod.sizes) && prod.sizes.length > 0
                    ? prod.sizes.join(", ")
                    : "—"}
                </td>
                <td className="px-6 py-4">{prod.rating}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-indigo-600 border border-indigo-500 rounded-full p-1 hover:bg-indigo-100 transition cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/product/addprod?id=${prod._id}`)
                    }
                    title="Edit"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="text-red-600 border cursor-pointer border-red-600 rounded-full p-1 hover:bg-red-100"
                    onClick={() => handleDeleteClick(prod._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />

      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Products"
        description={`Are you sure you want to delete ${selectedProducts.length} products? This action cannot be undone.`}
      />
    </div>
  );
};
