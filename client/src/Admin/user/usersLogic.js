import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultipleUsers,
  deleteUserById,
  getLimitedUsers,
  updateUserById,
} from "../../Features/Auth/authThunk";

export const useAllUsersLogic = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, currentPage, totalPages, loading } = useSelector(
    (state) => state.users
  );
  const limit = 10;

  const [page, setPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMultiConfirmOpen, setIsMultiConfirmOpen] = useState(false);

  const totalAdmins = users.filter((u) => u.isAdmin).length;
  const isLastAdmin = totalAdmins === 1 && user?.isAdmin;

  const refreshUserList = (pageToFetch) => {
    dispatch(getLimitedUsers({ page: pageToFetch, limit }));
  };

  useEffect(() => {
    if (user?.isAdmin) {
      refreshUserList(page);
    }
  }, [dispatch, user, page, limit]);

  // Edit User
  const handleEditClick = (usr) => {
    const isLast = totalAdmins === 1 && usr.isAdmin;
    setUserToEdit({ ...usr, isLastAdmin: isLast });
    setIsEditOpen(true);
  };

  const handleUserSave = async (id, data) => {
    if (!id || !data) return;
    const res = await dispatch(updateUserById({ id, data }));
    if (res.meta.requestStatus === "fulfilled") {
      setIsEditOpen(false);
      setUserToEdit(null);
    }
    refreshUserList(page);
  };

  // Delete single user
  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteToConfirm = async () => {
    if (!userToDelete) return;
    await dispatch(deleteUserById({ id: userToDelete }));
    setIsConfirmOpen(false);
    setUserToDelete(null);

    // If last user on page was deleted, go back a page
    const newPage = users.length === 1 && page > 1 ? page - 1 : page;
    setPage(newPage);
    refreshUserList(newPage);
  };

  // Checkbox handlers
  const handleCheckboxChange = (id, isAdmin) => {
    if (isAdmin) return; // Don't allow selecting admins
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allNonAdminIds = users.filter((u) => !u.isAdmin).map((u) => u._id);
    if (selectedUsers.length === allNonAdminIds.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allNonAdminIds);
    }
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    setIsMultiConfirmOpen(true);
  };

  const handleBulkDeleteConfirm = async () => {
    const res = await dispatch(deleteMultipleUsers(selectedUsers));
    if (deleteMultipleUsers.fulfilled.match(res)) {
      setSelectedUsers([]);

      const newPage =
        selectedUsers.length >= users.length && page > 1 ? page - 1 : page;
      setPage(newPage);
      refreshUserList(newPage);
    }
    setIsMultiConfirmOpen(false);
  };

  return {
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
  };
};
