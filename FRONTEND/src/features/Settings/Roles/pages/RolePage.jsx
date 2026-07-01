import { useState } from "react";
import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { useRole } from "../../Users/hooks/use-role.js";
import { useRoleStore } from "../../Users/stores/role-store.js";
import { SharedTable } from "../../../../shared/components/SharedTable.jsx";
import { Pencil, Trash2 } from "lucide-react";
import { Modal } from "../../../../shared/components/Modal.jsx";
import { RoleForm } from "../components/FormRole.jsx";
import { useAlertStore } from "../../../../shared/store/alert-store.js";
import { api } from "../../../../shared/api/axios.js";

export default function RolePage() {
  const { loadRole } = useRole();
  const roles = useRoleStore((state) => state.roles);
  const { showAlert } = useAlertStore();
  const [pagination, SetPagination] = useState({
    currentPage: 1,
    totalPages: 10,
  });

  const [formModal, setFormModal] = useState({
    isOpen: false,
    type: "Add",
    data: null,
  });

  const [confirmDel, setConfirmDel] = useState({
    isOpen: false,
    id: null,
  });

  const handleSearch = async (keyword) => {};

  const handleSubmit = async () => {
    if (formModal.type === "Add") {
      let res = await api.post(`/`);
    }
    if (formModal.type === "Edit") {
    }

    loadRole();
  };

  return (
    <>
      <PageHeader
        title="Role Management"
        description="Kelola seluruh user role yang dapat mengakses sistem."
        searchPlaceholder="Search role..."
        actionLabel="Add Role"
        onAction={() =>
          setFormModal({
            isOpen: true,
            type: "Add",
            data: null,
          })
        }
        onSearch={(keyword) => handleSeacrh(keyword)}
      />

      <SharedTable
        data={roles || []}
        columns={[
          {
            key: "name",
            title: "Role Name",
          },
          {
            key: "description",
            title: "Description",
          },
        ]}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
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

      <Modal
        isOpen={formModal.isOpen}
        title={`${formModal.type} Role`}
        onClose={() => setFormModal({ isOpen: false, type: "Add", data: null })}
      >
        <RoleForm
          mode={formModal.type}
          defaultValues={formModal.data}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
}
