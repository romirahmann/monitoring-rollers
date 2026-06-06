import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMachineStore } from "../store/machine.store.js";
import { useMachine } from "../hooks/use-machine.js";
import { usePositionById } from "../hooks/use-position-byId.js";
import { usePositionStore } from "../store/position.store.js";
import { SharedButton } from "../../../shared/components/Button.jsx";

export function DetailPage() {
  const navigate = useNavigate();
  const { machine_id, position_id } = useParams();

  useMachine(machine_id);
  const machineById = useMachineStore((state) => state.machineById);

  usePositionById(position_id);
  const positionById = usePositionStore((state) => state.positionById);

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
        <div className="mt-1">
          <SharedButton variant="outline" size="sm" icon={<Plus size={18} />}>
            {" "}
            Insert Report{" "}
          </SharedButton>
        </div>
      </div>
    </>
  );
}
