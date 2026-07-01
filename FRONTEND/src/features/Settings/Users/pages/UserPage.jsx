import { button, form } from "motion/react-client";
import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { SharedTable } from "../../../../shared/components/SharedTable.jsx";
import { useUser } from "../hooks/use-users.js";
import { UserStore } from "../stores/users.store.js";
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "../../../../shared/components/Modal.jsx";
import { useState } from "react";
import { UserForm } from "../components/FormUser.jsx";
import { api } from "../../../../shared/api/axios.js";
import { useAlertStore } from "../../../../shared/store/alert-store.js";
import { useRole } from "../hooks/use-role.js";
import { useRoleStore } from "../stores/role-store.js";
import { getUsers } from "../services/fetchUser.js";
import ConfirmModal from "../../../../shared/components/ConfirmModal.jsx";

export default function UserPage() {
  const { loadUsers } = useUser();
  useRole();
  const { users } = UserStore((state) => state);
  const { roles } = useRoleStore();
  const { showAlert } = useAlertStore();

  const [formModal, setFormModal] = useState({
    isOpen: false,
    type: "Add",
    data: null,
  });

  const [confirmDel, setConfirmDel] = useState({
    isOpen: false,
    id: null,
  });

  const handleSeacrh = async (query) => {
    await loadUsers(query);
  };

  const handleSubmit = async (data) => {
    try {
      if (formModal.type === "Edit") {
        let res = await api.put(`/users/${formModal.data.id}`, {
          ...data,
          role_id: Number(data.role_id),
        });
      }
      if (formModal.type === "Add") {
        let res = await api.post(`/auth/register`, {
          ...data,
          role_id: Number(data.role_id),
        });
      }

      await loadUsers();

      showAlert({
        type: "success",
        message: "Add User Successfully!",
      });

      setFormModal({
        isOpen: false,
        type: "Add",
        data: null,
      });
    } catch (error) {
      console.log(error);
      showAlert({
        type: "error",
        message: "Add User Failed!",
      });
    }
  };

  const handleDelete = async () => {
    if (!confirmDel.id) {
      showAlert({ type: "error", message: "Id Not Found!" });
    }

    try {
      let res = await api.delete(`/users/${confirmDel.id}`);
      showAlert({ type: "succeess", message: "Deleted Successfully!" });

      await loadUsers();

      setConfirmDel({ isOpen: false, id: null });
    } catch (err) {
      console.log(err);
      showAlert({ type: "error", message: "Id Not Found!" });
    }
  };

  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader
        title="User Management"
        description="Kelola seluruh user yang dapat mengakses sistem."
        searchPlaceholder="Search user..."
        actionLabel="Add User"
        onAction={() =>
          setFormModal({
            isOpen: true,
            type: "Add",
            data: null,
          })
        }
        onSearch={(keyword) => handleSeacrh(keyword)}
      />

      {/* TABLE USER */}
      <SharedTable
        data={users}
        columns={[
          {
            key: "username",
            title: "Username",
          },
          {
            key: "role_name",
            title: "Role",
          },
          {
            key: "is_active",
            title: "Status",
            render: (row) => (
              <span
                className={`
            px-2 py-1 rounded-full text-xs
            ${
              row.is_active === 1
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
              >
                {row.is_active === 1 ? "Active" : "Inactive"}
              </span>
            ),
          },
        ]}
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => console.log(page)}
        actions={[
          {
            label: "Edit",
            icon: Pencil,
            onClick: (row) =>
              setFormModal({ isOpen: true, type: "Edit", data: row }),
          },
          {
            label: "Delete",
            icon: Trash2,
            variant: "danger",
            onClick: (row) => setConfirmDel({ isOpen: true, id: row.id }),
          },
        ]}
      />

      {/* MODAL */}
      <Modal
        isOpen={formModal.isOpen}
        title={`${formModal.type} User`}
        onClose={() => setFormModal({ isOpen: false, type: "Add", data: null })}
      >
        <UserForm
          mode={formModal.type}
          defaultValues={formModal.data || {}}
          roles={roles}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmModal
        open={confirmDel.isOpen}
        title="Deleted Users"
        message="are you sure want deleted this user?"
        confirmText="Deleted"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDel({ isOpen: false, id: null })}
      />
    </>
  );
}
