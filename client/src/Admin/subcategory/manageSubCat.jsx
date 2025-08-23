import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { Pagination } from "../../utils/Pagination";
import { ConfirmDialog } from "../headlessui/ConfirmBox";
import { useNavigate } from "react-router-dom";
import { useSubCatLogic } from "./useSubCatLogic";

export const ManageSubCat = () => {
  const {
    subcategories,
    currentPage,
    totalPages,
    loading,
    page,
    limit,
    setPage,
    // single delete
    isConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    setIsConfirmOpen,
    // bulk actions
    handleCheckboxChange,
    handleSelectAll,
    selectedSubcategories,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  } = useSubCatLogic();

  const navigate = useNavigate();

  return (
    <div className="mt-5 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">
          Subcategories
        </h2>
        {selectedSubcategories.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 cursor-pointer text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-700 transition"
          >
            Delete Selected ({selectedSubcategories.length})
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-black font-medium text-white border-b border-indigo-100">
            <tr>
              <th className="px-6 py-3 w-10">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedSubcategories.length === subcategories.length &&
                    subcategories.length > 0
                  }
                  className="accent-red-600 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 w-12">#</th>
              <th className="px-6 py-3">Subcategory</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory, index) => (
              <tr
                key={subcategory._id || index}
                className="border-b hover:bg-indigo-50/30 transition"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(subcategory._id)}
                    onChange={() => handleCheckboxChange(subcategory._id)}
                    className="accent-red-600 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="px-6 py-4 capitalize font-medium">
                  {subcategory.subcategory}
                </td>
                <td className="px-6 py-4 capitalize font-medium">
                  {subcategory.categoryId?.category || "N/A"}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-indigo-600 border border-indigo-500 rounded-full p-1 hover:bg-indigo-100 transition cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/admin/subcategory/addsubcat?id=${subcategory._id}`
                      )
                    }
                    title="Edit"
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    className="text-red-600 border border-red-500 rounded-full p-1 hover:bg-red-100 transition cursor-pointer"
                    onClick={() => handleDeleteClick(subcategory._id)}
                    title="Delete"
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
        title="Delete Subcategory"
        description="Are you sure you want to delete this subcategory? This action cannot be undone."
      />

      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Subcategories"
        description={`Are you sure you want to delete ${selectedSubcategories.length} subcategories? This action cannot be undone.`}
      />
    </div>
  );
};
