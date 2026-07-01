import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { api } from "../../../../shared/api/axios.js";
import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { SharedTable } from "../../../../shared/components/SharedTable.jsx";
import { Modal } from "../../../../shared/components/Modal.jsx";
import ConfirmModal from "../../../../shared/components/ConfirmModal.jsx";
import { useAlertStore } from "../../../../shared/store/alert-store.js";

import { useCategories } from "../hooks/use-categories.js";
import { useCategoryStore } from "../store/categories.store.js";
import { CategoryForm } from "../components/CategoryForm.jsx";

export default function CategoriesPage() {
  const { loadCategories } = useCategories();

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
    await loadCategories(keyword);
  };

  const handleSubmit = async (data) => {
    try {
      if (formModal.type === "Add") {
        await api.post("/master/categories-machine", data);
      } else {
        await api.put(`/master/categories-machine/${formModal.data.id}`, data);
      }

      await loadCategories();

      showAlert({
        type: "success",
        message: `${formModal.type} Category Successfully!`,
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
        message: `${formModal.type} Category Failed!`,
      });
    }
  };

  const handleDelete = async () => {
    if (!confirmDel.id) {
      return showAlert({
        type: "error",
        message: "Category not found!",
      });
    }

    try {
      await api.delete(`/master/categories-machine/deleted/${confirmDel.id}`);

      await loadCategories();

      showAlert({
        type: "success",
        message: "Delete Category Successfully!",
      });

      setConfirmDel({
        isOpen: false,
        id: null,
      });
    } catch (err) {
      console.error(err);

      showAlert({
        type: "error",
        message: "Delete Category Failed!",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Category Management"
        description="Kelola seluruh kategori menu."
        searchPlaceholder="Search category..."
        actionLabel="Add Category"
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
        data={categories}
        columns={[
          {
            key: "name",
            title: "Category Name",
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
        title={`${formModal.type} Category`}
        onClose={() =>
          setFormModal({
            isOpen: false,
            type: "Add",
            data: null,
          })
        }
      >
        <CategoryForm
          mode={formModal.type}
          defaultValues={formModal.data || {}}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmModal
        open={confirmDel.isOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
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
