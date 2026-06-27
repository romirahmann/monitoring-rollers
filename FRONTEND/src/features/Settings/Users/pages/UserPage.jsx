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

  const handleSubmit = async (data) => {
    try {
      let res = await api.post(`/auth/register`, {
        ...data,
        role_id: Number(data.role_id),
      });

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
        onSearch={(keyword) => console.log(keyword)}
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
            onClick: (row) => console.log("Delete", row),
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
    </>
  );
}
