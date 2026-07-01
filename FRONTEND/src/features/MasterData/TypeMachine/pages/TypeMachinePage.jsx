import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { api } from "../../../../shared/api/axios.js";
import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { SharedTable } from "../../../../shared/components/SharedTable.jsx";
import { Modal } from "../../../../shared/components/Modal.jsx";
import ConfirmModal from "../../../../shared/components/ConfirmModal.jsx";
import { useAlertStore } from "../../../../shared/store/alert-store.js";

import { useTypeMachine } from "../hooks/use-type.js";
import { useTypeMachineStore } from "../stores/type.store.js";

import { useCategories } from "../../Categories/hooks/use-categories.js";
import { useCategoryStore } from "../../Categories/store/categories.store.js";
import { TypeMachineForm } from "../components/TypeForm.jsx";

export default function TypeMachinePage() {
  const { loadTypeMachines } = useTypeMachine();
  useCategories();

  const typeMachines = useTypeMachineStore((state) => state.typeMachines);

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
    await loadTypeMachines(keyword);
  };

  const handleSubmit = async (formData) => {
    try {
      if (formModal.type === "Add") {
        await api.post("/master/type-machine", formData);
      } else {
        await api.put(`/master/type-machine/${formModal.data.id}`, formData);
      }

      await loadTypeMachines();

      showAlert({
        type: "success",
        message: `${formModal.type} Type Machine Successfully!`,
      });

      setFormModal({
        isOpen: false,
        type: "Add",
        data: null,
      });
    } catch (err) {
      console.error(err);

      showAlert({
        type: "error",
        message: `${formModal.type} Type Machine Failed!`,
      });
    }
  };

  const handleDelete = async () => {
    if (!confirmDel.id) {
      return showAlert({
        type: "error",
        message: "Type Machine not found!",
      });
    }

    try {
      await api.delete(`/master/type-machine/deleted/${confirmDel.id}`);

      await loadTypeMachines();

      showAlert({
        type: "success",
        message: "Delete Type Machine Successfully!",
      });

      setConfirmDel({
        isOpen: false,
        id: null,
      });
    } catch (err) {
      console.log(err);

      showAlert({
        type: "error",
        message: "Delete Type Machine Failed!",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Type Machine Management"
        description="Kelola seluruh tipe mesin."
        searchPlaceholder="Search type machine..."
        actionLabel="Add Type Machine"
        onAction={() =>
          setFormModal({
            isOpen: true,
            type: "Add",
            data: null,
          })
        }
        onSearch={handleSearch}
      />

      <SharedTable
        data={typeMachines}
        columns={[
          {
            key: "name",
            title: "Machine Name",
          },
          {
            key: "category_name",
            title: "Category",
          },
          {
            key: "description",
            title: "Description",
          },
        ]}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        actions={[
          {
            label: "Edit",
            icon: Pencil,
            onClick: (row) =>
              setFormModal({
                isOpen: true,
                type: "Edit",
                data: row,
              }),
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
        title={`${formModal.type} Type Machine`}
        onClose={() =>
          setFormModal({
            isOpen: false,
            type: "Add",
            data: null,
          })
        }
      >
        <TypeMachineForm
          mode={formModal.type}
          defaultValues={formModal.data || {}}
          categories={categories}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmModal
        open={confirmDel.isOpen}
        title="Delete Type Machine"
        message="Are you sure want delete this type machine?"
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
