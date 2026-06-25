import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMachineStore } from "../store/machine.store.js";
import { useMachine } from "../hooks/use-machine.js";
import { usePositionById } from "../hooks/use-position-byId.js";
import { usePositionStore } from "../store/position.store.js";
import { SharedButton } from "../../../shared/components/Button.jsx";
import { SharedTable } from "../../../shared/components/table.jsx";
import { useHistoryRoller } from "../hooks/use-history.js";
import { Modal } from "../../../shared/components/Modal.jsx";

import { useState } from "react";
import { RollerForm } from "../components/RollerForm.jsx";
import { useAlertStore } from "../../../store/alert-store.js";
import { useRollerStore } from "../store/roller.store.js";
import { useRollerByPosition } from "../hooks/use-rollers.js";
import dayjs from "dayjs";

export function DetailPage() {
  const navigate = useNavigate();
  const { machine_id, position_id } = useParams();

  useHistoryRoller(machine_id);

  useMachine(machine_id);
  usePositionById(position_id);
  useRollerByPosition(position_id);

  const { showAlert } = useAlertStore();
  const machineById = useMachineStore((state) => state.machineById);
  const positionById = usePositionStore((state) => state.positionById);
  const rollerByPosition = useRollerStore((state) => state.rollerByPosition);

  const [modalForm, setModalForm] = useState({
    isOpen: false,
    type: "Add",
    data: null,
  });

  const reportColumns = [
    {
      field: "roller_code",
      header: "Kode Roller",
      sortable: true,
    },
    {
      field: "size_1",
      header: "Ukuran 1 (mm)",
      sortable: true,
    },
    {
      field: "size_2",
      header: "Ukuran 2 (mm)",
      sortable: true,
    },
    {
      field: "size_3",
      header: "Ukuran 3 (mm)",
      sortable: true,
    },
    {
      field: "description",
      header: "Keterangan",
    },
  ];

  const rollerColumns = [
    {
      field: "code",
      header: "Roller Code",
      sortable: true,
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      field: "point_no",
      header: "Ukuran",
      sortable: true,
    },
    {
      field: "type",
      header: "Type",
      sortable: true,
    },
    {
      field: "initial_size",
      header: "Initial Size",
      sortable: true,
    },
    {
      field: "minimun_size",
      header: "Minimum Size",
      sortable: true,
    },
    {
      field: "status",
      header: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`${value === "ACTIVE" ? "text-white bg-green-800 px-3 py-1 rounded-md" : ""}`}
        >
          {value}
        </span>
      ),
    },
    {
      field: "installed_at",
      header: "Installed At",
      sortable: true,
      render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
    },
  ];

  const reportData = [];

  const handleInsertRoller = async () => {
    showAlert({
      type: "success",
      message: "Add Roller Successfully!",
    });
    setModalForm({
      isOpen: false,
      type: "",
      data: null,
    });
  };

  return (
    <>
      <div className="max-w-full px-3 space-y-6">
        <div className="bg-white border rounded-xl py-5 px-10">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="flex gap-2 px-2 py-1 border border-gray-400 justify-center  items-center rounded-lg"
            >
              <ArrowLeft /> <span>Back</span>
            </button>
            <div className="category">
              <h1 className="text-4xl font-bold">{positionById?.position}</h1>
            </div>
            <div className="type">
              <h2 className="text-xl font-semibold">{machineById?.name}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-lg uppercase font-semibold">Rollers</h2>

              <p className="text-sm text-gray-500">
                Roller management, for {positionById?.position} position.
              </p>
            </div>

            <SharedButton
              onClick={() => setModalForm({ ...modalForm, isOpen: true })}
              variant="primary"
              size="sm"
              icon={<Plus size={18} />}
            >
              Insert Roller
            </SharedButton>
          </div>
          <SharedTable
            columns={rollerColumns}
            data={rollerByPosition || []}
          ></SharedTable>
        </div>

        {/* <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-lg font-semibold">History Report</h2>

              <p className="text-sm text-gray-500">
                Measurement history for roller position
              </p>
            </div>

            <SharedButton variant="primary" size="sm" icon={<Plus size={18} />}>
              Insert Report
            </SharedButton>
          </div>

          <SharedTable columns={reportColumns} data={reportData} />

          <Modal></Modal>
        </div> */}

        <Modal
          isOpen={modalForm.isOpen}
          title={`${modalForm.type} Roller`}
          onClose={() => setModalForm({ isOpen: false, type: "", data: null })}
        >
          <RollerForm
            mode={modalForm.type}
            machineId={machine_id}
            initialData={modalForm.data}
            positionId={position_id}
            onSubmit={handleInsertRoller}
          />
        </Modal>
      </div>
    </>
  );
}
