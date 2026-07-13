import { useState } from "react";
import { PageHeader } from "../../../shared/components/PageHeader.jsx";
import { SharedTable } from "../../../shared/components/SharedTable.jsx";
import { Modal } from "../../../shared/components/Modal.jsx";
import { FormInspections } from "../components/formInspections.jsx";
import { useMachine } from "../../MasterData/Machines/hooks/use-machine.js";
import { useMachineStore } from "../../MasterData/Machines/stores/machine.store.js";
import { useUser } from "../../Settings/Users/hooks/use-users.js";
import { UserStore } from "../../Settings/Users/stores/users.store.js";
import { useAlertStore } from "../../../shared/store/alert-store.js";
import { api } from "../../../shared/api/axios.js";
import { useInspections } from "../hooks/use-inspection.js";
import { useInspectionStore } from "../stores/inspection.store.js";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InspectionsPage() {
  useInspections();
  useMachine();
  useUser();

  const inspections = useInspectionStore((state) => state.inspections);

  console.log("inspections", inspections);
  const machines = useMachineStore((state) => state.machines);
  const users = UserStore((state) => state.users);

  const navigate = useNavigate();
  const { showAlert } = useAlertStore();

  const [modal, setModal] = useState({
    isOpen: false,
    type: "Add",
    data: null,
  });

  const handleSubmit = async (data) => {
    try {
      let res = await api.post("/inspections", data);
      console.log(res.data);
      showAlert({
        type: "success",
        message: "Inspection data submitted successfully.",
      });
    } catch (error) {
      console.log(error);
      showAlert({
        type: "error",
        message: "Failed to submit inspection data.",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Inspection Rollers"
        description="Kelola seluruh inspection rollers."
        searchPlaceholder="Search inspection..."
        actionLabel="Add Inspection"
        onAction={() => navigate("/inspections/create")}
      />

      <SharedTable
        data={inspections || []}
        columns={[
          {
            key: "roller_code",
            title: "Roller Code",
            render: (row) => row.roller?.code || "-",
          },
          {
            key: "position",
            title: "Position",
            render: (row) => row.position || "-",
          },
          {
            key: "inspection_date",
            title: "Inspection Date",
            render: (row) => new Date(row.inspection_date).toLocaleDateString(),
          },
          {
            key: "notes",
            title: "Note",
          },
        ]}
        actions={[
          {
            label: "View",
            icon: Eye,
            onClick: (row) => {
              navigate(`${row.id}/detail`);
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
        onClose={() => setModal({ ...modal, isOpen: false })}
        isOpen={modal.isOpen}
        type={modal.type}
        data={modal.data}
        title={`${modal.type} Inspection`}
      >
        <FormInspections
          machines={machines}
          users={users}
          installedRollers={[]}
          loading={false}
          onMachineChange={() => {}}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
}
