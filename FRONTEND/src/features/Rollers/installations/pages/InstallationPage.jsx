import { useState } from "react";
import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { useAlertStore } from "../../../../shared/store/alert-store.js";
import { SharedTable } from "../../../../shared/components/SharedTable.jsx";
import { Pencil, Trash2 } from "lucide-react";
import { useInstallations } from "../hooks/use-installation.js";
import { useInstallationStore } from "../stores/installation.store.js";
import { Modal } from "../../../../shared/components/Modal.jsx";
import { InstallationForm } from "../components/installationForm.jsx";
import { usePosition } from "../../../MasterData/Positions/hooks/use-position.js";
import { usePositionStore } from "../../../MasterData/Positions/stores/position.store.js";
import { useRoller } from "../../lists/hooks/useRoller.js";
import { useRollerStore } from "../../lists/stores/roller.store.js";
export default function InstallationPage() {
  useInstallations();
  const installations = useInstallationStore((state) => state.installations);

  usePosition();
  const positions = usePositionStore((state) => state.positions);

  useRoller();
  const rollers = useRollerStore((state) => state.rollers);

  const [formModal, setFormModal] = useState({
    isOpen: false,
    type: "Add",
    data: null,
  });
  const { showAlert } = useAlertStore();

  const handleSearch = (keyword) => {};

  return (
    <>
      <PageHeader
        title="Installation Page"
        description="Kelola installasi/pemasangan roller pada mesin."
        searchPlaceholder="Search Code Roller..."
        actionLabel="Installation"
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
        data={[]}
        columns={[
          {
            key: "code ",
            title: "Roller Code",
          },
          {
            key: "position",
            title: "Position",
          },
          {
            key: "machine_name",
            title: "Machine Name",
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
        onClose={() => setFormModal({ ...formModal, isOpen: false })}
        title={`${formModal.type} Installation`}
        size="md"
        showCloseButton={true}
      >
        <InstallationForm
          mode={formModal.type}
          rollers={rollers}
          positions={positions}
          defaultValues={formModal.data || {}}
          onClose={() => setFormModal({ ...formModal, isOpen: false })}
        />
      </Modal>
    </>
  );
}
