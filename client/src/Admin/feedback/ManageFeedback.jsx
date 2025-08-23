import { FaRegTrashAlt } from "react-icons/fa";
import { ConfirmDialog } from "../headlessui/ConfirmBox";
import { Pagination } from "../../utils/Pagination";
import { useFeedbackLogic } from "./useFeedbackLogic";

export const ManageFeedback = () => {
  const {
    feedbacks,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    selectedFeedbacks,
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
    handleToggleReview,
  } = useFeedbackLogic();

  const limit = 10;

  return (
    <div className="mt-5 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-indigo-700">Messages</h2>
        {selectedFeedbacks.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 cursor-pointer text-sm text-white px-2 py-2 rounded hover:bg-red-700"
          >
            Delete Selected ({selectedFeedbacks.length})
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
                    selectedFeedbacks.length === feedbacks.length &&
                    feedbacks.length > 0
                  }
                  className="accent-red-600 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={feedback._id} className="border-b">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedFeedbacks.includes(feedback._id)}
                    onChange={() => handleCheckboxChange(feedback._id)}
                    className="accent-red-600 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">{(page - 1) * limit + index + 1}</td>
                <td className="px-6 py-4">{feedback.username}</td>
                <td className="px-6 py-4">{feedback.email}</td>
                <td className="px-6 py-4">{feedback.message}</td>
                <td className="text-center p-4">
                  <input
                    type="checkbox"
                    className="accent-green-600 cursor-pointer"
                    checked={feedback.approved}
                    onChange={() =>
                      handleToggleReview(feedback._id, !feedback.approved)
                    }
                  />
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    className="text-red-600 border cursor-pointer border-red-600 rounded-full p-1 hover:bg-red-100"
                    onClick={() => handleDeleteClick(feedback._id)}
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
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
      />
      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Messages"
        description={`Are you sure you want to delete ${selectedFeedbacks.length} messages? This action cannot be undone.`}
      />
    </div>
  );
};
