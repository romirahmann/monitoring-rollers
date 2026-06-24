import { ArrowLeft } from "lucide-react";
import { SharedTable } from "../../../shared/components/table.jsx";
import { CardPosition } from "../components/CardPosition.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../shared/api/axios.js";
import { useEffect, useState } from "react";
import { useMachine } from "../hooks/use-machine.js";
import { useMachineStore } from "../store/machine.store.js";
import { usePosition } from "../hooks/use-position.js";
import { usePositionStore } from "../store/position.store.js";
import { Modal } from "../../../shared/components/Modal.jsx";
import { PositionForm } from "../components/PositionForm.jsx";
import { useAlertStore } from "../../../store/alert-store.js";

export function PositionPage() {
  const navigate = useNavigate();
  const { category, unit } = useParams();
  const [modal, setModal] = useState({
    isOpen: false,
    type: "Add",
    data: null,
  });
  useMachine(unit);
  const { showAlert } = useAlertStore();
  const machineById = useMachineStore((state) => state.machineById);

  usePosition(machineById?.id);
  const { getPositionByMachineId } = usePosition(machineById?.id);
  let positionByMachineId = [];
  positionByMachineId = usePositionStore((state) => state.positionByMachineId);
  const { setPositionByMachineId } = usePositionStore((state) => state);

  const handleFormSubmit = async () => {
    getPositionByMachineId();

    showAlert({
      type: "success",
      message: `${modal.type} position successfully!`,
    });

    setModal({
      isOpen: false,
      type: "Add",
      data: null,
    });
  };

  console.log("MACHINE: ", machineById);
  // console.log("POSITION: ", positionByMachineId);

  return (
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
            <h1 className="text-4xl font-bold">{machineById.category_name}</h1>
          </div>
          <div className="type">
            <h2 className="text-xl font-semibold">{machineById.name}</h2>
            <p>{machineById.type_name}</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <img
          src={`http://192.168.9.192:3000/uploads/${machineById.image}`}
          alt=""
          className="w-full h-[350px] object-cover"
        />
      </div>

      <div className="mt-5 flex gap-5 justify-between px-10 text-center">
        <h1 className="text-xl font-bold">Position</h1>

        <button
          onClick={() => setModal({ isOpen: true, type: "Add", data: null })}
          className="
              rounded-2xl bg-zinc-900 px-5 py-3
              text-sm font-semibold text-white
              transition-all duration-300
              hover:scale-105 hover:bg-zinc-800
              active:scale-95
              shadow-lg
            "
        >
          + Add Position
        </button>
      </div>

      <hr />

      <div className="grid grid-cols-6 gap-4">
        {positionByMachineId.length > 0 ? (
          positionByMachineId.map((position) => (
            <button
              key={position.id}
              onClick={() =>
                navigate(
                  `/machine-page/${position.machine_id}/position/${position.id}/detail`,
                )
              }
              className="col-span-1"
            >
              <CardPosition position={position.position} />
            </button>
          ))
        ) : (
          <div className="col-span-6">
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-2xl bg-gray-50">
              <div className="text-5xl mb-4">📍</div>

              <h3 className="text-lg font-semibold text-gray-800">
                No Positions Available
              </h3>

              <p className="mt-2 text-sm text-gray-500 max-w-md text-center">
                This machine does not have any positions yet. Click{" "}
                <span className="font-medium">"Add Position"</span> to create
                the first position.
              </p>

              <button
                onClick={() =>
                  setModal({ isOpen: true, type: "Add", data: null })
                }
                className="
                mt-6
                rounded-xl
                bg-zinc-900
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-zinc-800
              "
              >
                + Add First Position
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={`${modal.type} Position`}
        onClose={() => setModal({ isOpen: false, type: "", data: null })}
      >
        <PositionForm
          machineId={machineById?.id}
          mode={modal.type}
          initialData={modal.data}
          onClose={() => setModal({ isOpen: false, type: "", data: null })}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
}
