import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { api } from "../../../../shared/api/axios.js";

import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { SharedTable } from "../../../../shared/components/SharedTable.jsx";
import { Modal } from "../../../../shared/components/Modal.jsx";
import ConfirmModal from "../../../../shared/components/ConfirmModal.jsx";

import { useAlertStore } from "../../../../shared/store/alert-store.js";

import { RollerForm } from "../components/RollerForm.jsx";

import { useRollerStore } from "../stores/roller.store.js";
import { useCategoryStore } from "../../../MasterData/Categories/store/categories.store.js";
import { useCategories } from "../../../MasterData/Categories/hooks/use-categories.js";
import { useRoller } from "../hooks/useRoller.js";
import { useNavigate } from "react-router-dom";

export default function RollerPage() {
  const { loadRollers } = useRoller();
  const navigate = useNavigate();
  useCategories();

  const rollers = useRollerStore((state) => state.rollers);

  const categories = useCategoryStore((state) => state.categories);

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

  const handleSearch = async (keyword = "") => {
    await loadRollers(keyword);
  };

  const handleSubmit = async (data) => {
    try {
      if (formModal.type === "Add") {
        await api.post("/master/rollers", data);
      } else {
        await api.put(`/master/rollers/${formModal.data.id}`, data);
      }

      await loadRollers();

      showAlert({
        type: "success",
        message: `${formModal.type} Roller Successfully!`,
      });

      setFormModal({
        isOpen: false,
        type: "Add",
        data: null,
      });
    } catch (err) {
      console.log(err);

      showAlert({
        type: "error",
        message: `${formModal.type} Roller Failed!`,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/master/roller/${confirmDel.id}`);

      await loadRollers();

      showAlert({
        type: "success",
        message: "Delete Roller Successfully!",
      });

      setConfirmDel({
        isOpen: false,
        id: null,
      });
    } catch (err) {
      showAlert({
        type: "error",
        message: "Delete Roller Failed!",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Roller Management"
        description="Kelola seluruh data roller."
        searchPlaceholder="Search roller..."
        actionLabel="Add Roller"
        onAction={() => navigate("/rollers/create")}
        onSearch={handleSearch}
      />

      <SharedTable
        data={rollers}
        columns={[
          {
            key: "code",
            title: "Code",
          },
          {
            key: "type",
            title: "Type",
          },
          {
            key: "category_machine_name",
            title: "Category",
          },
          {
            key: "status",
            title: "Status",
          },
        ]}
        actions={[
          {
            label: "Edit",
            icon: Pencil,
            onClick: (row) =>
              navigate(`/rollers/${row.id}/edit`, { state: { roller: row } }),
          },
          {
            label: "Delete",
            icon: Trash2,
            variant: "danger",
            onClick: (row) =>
              setConfirmDel({
                isOpen: true,
                id: row.id,
              }),
          },
        ]}
      />

      <Modal
        isOpen={formModal.isOpen}
        title={`${formModal.type} Roller`}
        onClose={() =>
          setFormModal({
            isOpen: false,
            type: "Add",
            data: null,
          })
        }
      >
        <RollerForm
          mode={formModal.type}
          defaultValues={formModal.data || {}}
          categories={categories}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmModal
        open={confirmDel.isOpen}
        title="Delete Roller"
        message="Are you sure want delete this roller?"
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() =>
          setConfirmDel({
            isOpen: false,
            id: null,
          })
        }
      />
    </>
  );
}
