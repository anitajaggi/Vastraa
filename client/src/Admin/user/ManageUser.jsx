import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useAllUsersLogic } from "./usersLogic";
import { Pagination } from "../../utils/Pagination";
import { ConfirmDialog } from "../headlessui/ConfirmBox";
import { EditUserDialog } from "../headlessui/EditUser";

export const ManageUsers = () => {
  const {
    user,
    users,
    currentPage,
    totalPages,
    loading,
    page,
    setPage,
    isLastAdmin,
    isConfirmOpen,
    setIsConfirmOpen,
    handleDeleteToConfirm,
    handleDeleteClick,
    isEditOpen,
    userToEdit,
    setIsEditOpen,
    handleEditClick,
    handleUserSave,
    selectedUsers,
    isMultiConfirmOpen,
    setIsMultiConfirmOpen,
    handleCheckboxChange,
    handleSelectAll,
    handleBulkDeleteConfirm,
    handleBulkDelete,
  } = useAllUsersLogic();
  const limit = 10;

  return (
    <div className="mt-5 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="py-3 px-4 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black">Users</h2>
        {selectedUsers.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="bg-red-600 text-white cursor-pointer px-2 py-1 text-sm rounded hover:bg-red-700"
          >
            Delete Selected ({selectedUsers.length})
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
                  className="accent-red-600 cursor-pointer"
                  onChange={handleSelectAll}
                  checked={
                    selectedUsers.length ===
                      users.filter((u) => !u.isAdmin).length &&
                    users.filter((u) => !u.isAdmin).length > 0
                  }
                />
              </th>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id} className="border-b">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="accent-red-600 cursor-pointer"
                      checked={selectedUsers.includes(user._id)}
                      disabled={user.isAdmin}
                      onChange={() =>
                        handleCheckboxChange(user._id, user.isAdmin)
                      }
                      title={user.isAdmin ? "Admins cannot be selected" : ""}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`py-1 px-3 rounded-full ${
                        user.isAdmin ? "bg-green-300 uppercase" : ""
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="text-blue-600 border border-blue-600 cursor-pointer rounded-full p-1 hover:bg-blue-100"
                      onClick={() => handleEditClick(user)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="text-red-600 border border-red-600 rounded-full cursor-pointer p-1 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={user.isAdmin && isLastAdmin}
                      title={
                        user.isAdmin && isLastAdmin
                          ? "You can't delete the last admin"
                          : "Delete user"
                      }
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          page={page}
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          onPageChange={setPage}
        />
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteToConfirm}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
      <ConfirmDialog
        isOpen={isMultiConfirmOpen}
        onClose={() => setIsMultiConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Delete Selected Users"
        description={`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`}
      />
      <EditUserDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={userToEdit}
        onSave={handleUserSave}
        isLastAdmin={isLastAdmin}
      />
    </div>
  );
};
