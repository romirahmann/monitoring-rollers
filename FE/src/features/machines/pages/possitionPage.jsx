import { ArrowLeft } from "lucide-react";
import { SharedTable } from "../../../shared/components/table.jsx";
import { CardPosition } from "../components/CardPosition.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../shared/api/axios.js";
import { useEffect } from "react";
import { useMachine } from "../hooks/use-machine.js";
import { useMachineStore } from "../store/machine.store.js";
import { usePosition } from "../hooks/use-position.js";
import { usePositionStore } from "../store/position.store.js";

export function PositionPage() {
  const navigate = useNavigate();
  const { category, unit } = useParams();

  useMachine(unit);

  const machineById = useMachineStore((state) => state.machineById);

  usePosition(machineById?.id);

  const positionByMachineId = usePositionStore(
    (state) => state.positionByMachineId,
  );

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
        <img src={``} alt="" className="w-full h-[350px] object-cover" />
      </div>

      <div className="mt-5 flex gap-5 justify-between px-10 text-center">
        <h1 className="text-xl font-bold">Position</h1>

        <button
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
        {positionByMachineId.map((position) => (
          <button
            onClick={() =>
              navigate(
                `/machine-page/${position.machine_id}/position/${position.id}/detail`,
              )
            }
            key={position.id}
            className="col-span-1"
          >
            <CardPosition position={position.position} />
          </button>
        ))}
      </div>
    </div>
  );
}
