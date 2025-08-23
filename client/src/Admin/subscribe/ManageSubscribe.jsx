import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmDialog } from "../headlessui/ConfirmBox";
import { Pagination } from "../../utils/Pagination";
import { useSubsLogic } from "./useSubLogin";

export const ManageSubs = () => {
  const {
    subscribers,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedSubs,
    isConfirmOpen,
    isMultiConfirmOpen,
    setIsConfirmOpen,
    setIsMultiConfirmOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDelete,
    handleBulkDeleteConfirm,
  } = useSubsLogic();
  console.log(subscribers);

  const limit = 10;

  return (
    <div className="mt-5 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">Subscribers</h2>
        {selectedSubs.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 cursor-pointer text-sm text-white px-2 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedSubs.length})
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
                    selectedSubs.length === subscribers.length &&
                    subscribers.length > 0
                  }
                  className="accent-red-600 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subs, index) => (
              <tr key={subs._id} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedSubs.includes(subs._id)}
                    onChange={() => handleCheckboxChange(subs._id)}
                    className="accent-red-600 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4">{subs.email}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-red-600 border cursor-pointer border-red-600 rounded-full p-1 hover:bg-red-100"
                    onClick={() => handleDeleteClick(subs._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        onPageChange={setPage}
      />

      {/* Confirmation dialogs */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete subscriber"
        description="Are you sure you want to delete this subscriber? This action cannot be undone."
      />
      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Subscriber"
        description={`Are you sure you want to delete ${selectedSubs.length} subscribers? This action cannot be undone.`}
      />
    </div>
  );
};
