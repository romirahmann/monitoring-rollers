import { useState } from "react";
import { Eye, Pencil, Trash2, View } from "lucide-react";

import { api } from "../../../../shared/api/axios.js";
import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { SharedTable } from "../../../../shared/components/SharedTable.jsx";
import { Modal } from "../../../../shared/components/Modal.jsx";
import ConfirmModal from "../../../../shared/components/ConfirmModal.jsx";

import { useAlertStore } from "../../../../shared/store/alert-store.js";

import { useMachine } from "../hooks/use-machine.js";
import { useMachineStore } from "../stores/machine.store.js";

import { useTypeMachine } from "../../TypeMachine/hooks/use-type.js";
import { useTypeMachineStore } from "../../TypeMachine/stores/type.store.js";
import { MachineForm } from "../components/MachineForm.jsx";
import { useNavigate } from "react-router-dom";

export default function MachinePage() {
  const { loadMachines } = useMachine();

  useTypeMachine();

  const machines = useMachineStore((state) => state.machines);
  const navigate = useNavigate();
  const typeMachines = useTypeMachineStore((state) => state.typeMachines);

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
    await loadMachines(keyword);
  };

  const handleSubmit = async (formData) => {
    try {
      if (formModal.type === "Add") {
        await api.post("/master/machines", formData);
      } else {
        await api.put(`/master/machines/${formModal.data.id}`, formData);
      }

      await loadMachines();

      showAlert({
        type: "success",
        message: `${formModal.type} Machine Successfully!`,
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
        message: `${formModal.type} Machine Failed!`,
      });
    }
  };

  const handleDelete = async () => {
    if (!confirmDel.id) {
      return showAlert({
        type: "error",
        message: "Machine not found!",
      });
    }

    try {
      await api.delete(`/master/machine/deleted/${confirmDel.id}`);

      await loadMachines();

      showAlert({
        type: "success",
        message: "Delete Machine Successfully!",
      });

      setConfirmDel({
        isOpen: false,
        id: null,
      });
    } catch (err) {
      console.log(err);

      showAlert({
        type: "error",
        message: "Delete Machine Failed!",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Machine Management"
        description="Kelola seluruh data mesin."
        searchPlaceholder="Search machine..."
        actionLabel="Add Machine"
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
        data={machines}
        columns={[
          {
            key: "name",
            title: "Machine Name",
          },
          {
            key: "unit",
            title: "Unit",
          },
          {
            key: "type_name", // atau type_machine_name sesuai response API
            title: "Type Machine",
          },
        ]}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        actions={[
          {
            label: "View",
            icon: Eye,
            onClick: (row) => {
              navigate(`${row.id}/position`);
            },
          },
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
        title={`${formModal.type} Machine`}
        onClose={() =>
          setFormModal({
            isOpen: false,
            type: "Add",
            data: null,
          })
        }
      >
        <MachineForm
          mode={formModal.type}
          defaultValues={formModal.data || {}}
          typeMachines={typeMachines}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmModal
        open={confirmDel.isOpen}
        title="Delete Machine"
        message="Are you sure want delete this machine?"
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
