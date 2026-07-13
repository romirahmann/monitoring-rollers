import { useEffect, useState } from "react";
import { PageHeader } from "../../../shared/components/PageHeader";
import { Plus, Trash2 } from "lucide-react";
import { useMachine } from "../../MasterData/Machines/hooks/use-machine.js";
import { useMachineStore } from "../../MasterData/Machines/stores/machine.store.js";
import {
  useRoller,
  useRollerByMachineId,
} from "../../Rollers/lists/hooks/useRoller.js";
import { useRollerStore } from "../../Rollers/lists/stores/roller.store.js";

export default function FormInspectionPage() {
  useMachine();

  const machines = useMachineStore((state) => state.machines);

  const { loadRollerByMachine } = useRollerByMachineId();
  const rollers = useRollerStore((state) => state.rollerByMachine);
  console.log(rollers);
  const [form, setForm] = useState({
    machine_id: "",
    inspection_date: "",
    checker_id: "",
    notes: "",
    details: [
      {
        installation_id: "",
        roller_id: "",
        position_id: "",
        measurements: [],
      },
    ],
  });

  // ===============================
  // HEADER
  // ===============================

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // nanti kalau machine berubah
    if (name === "machine_id") {
      console.log(value);
      loadRollerByMachine(value);
      // fetch roller berdasarkan machine
    }
  };

  // ===============================
  // DETAIL
  // ===============================

  const handleDetailChange = (index, field, value) => {
    setForm((prev) => {
      const details = [...prev.details];

      details[index] = {
        ...details[index],
        [field]: value,
      };

      return {
        ...prev,
        details,
      };
    });

    if (field === "roller_id") {
      // fetch position berdasarkan roller
      // fetch measurement point roller
      // loadPosition(value);
      // loadRollerPoint(value);
    }
  };

  // ===============================
  // MEASUREMENT
  // ===============================

  const handleMeasurementChange = (detailIndex, measurementIndex, value) => {
    setForm((prev) => {
      const details = [...prev.details];

      details[detailIndex].measurements[measurementIndex] = {
        ...details[detailIndex].measurements[measurementIndex],
        size: value,
      };

      return {
        ...prev,
        details,
      };
    });
  };

  // ===============================
  // ADD ROLLER
  // ===============================

  const addRoller = () => {
    setForm((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        {
          roller_id: "",
          position_id: "",
          measurements: [],
        },
      ],
    }));
  };

  // ===============================
  // REMOVE ROLLER
  // ===============================

  const removeRoller = (index) => {
    setForm((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  // ===============================
  // LOAD POINT
  // nanti dipanggil setelah pilih roller
  // ===============================

  const setMeasurementPoint = (detailIndex, points) => {
    setForm((prev) => {
      const details = [...prev.details];

      details[detailIndex].measurements = points.map((point) => ({
        point_no: point.point_no,
        initial_size: point.initial_size,
        minimum_size: point.minimum_size,
        size: "",
      }));

      return {
        ...prev,
        details,
      };
    });
  };

  // ===============================
  // SET POSITION
  // nanti dipanggil setelah pilih roller
  // ===============================

  const setPosition = (detailIndex, positionId) => {
    setForm((prev) => {
      const details = [...prev.details];

      details[detailIndex].position_id = positionId;

      return {
        ...prev,
        details,
      };
    });
  };

  // ===============================
  // SUBMIT
  // ===============================

  const handleSubmit = async () => {
    console.log(form);

    /*
  await createInspection(form);
  */
  };

  return (
    <div className="space-y-6">
      <PageHeader title="New Inspection" description="Create new inspection" />

      {/* ================= HEADER ================= */}

      <div className="rounded-xl border bg-white p-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Machine</label>

            <select
              name="machine_id"
              value={form.machine_id}
              onChange={handleHeaderChange}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Select Machine</option>

              {machines.map((machine) => (
                <option key={machine.id} value={machine.id}>
                  {machine.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Inspection Date
            </label>

            <input
              type="date"
              name="inspection_date"
              value={form.inspection_date}
              onChange={handleHeaderChange}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Checker</label>

            <select
              name="checker_id"
              value={form.checker_id}
              onChange={handleHeaderChange}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Select Checker</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">Notes</label>

          <textarea
            rows={4}
            name="notes"
            value={form.notes}
            onChange={handleHeaderChange}
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      {/* ================= ROLLER ================= */}

      {form.details.map((detail, detailIndex) => (
        <div key={detailIndex} className="rounded-xl border bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Roller #{detailIndex + 1}</h2>

            {form.details.length > 1 && (
              <button
                type="button"
                onClick={() => removeRoller(detailIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Roller */}

            <div>
              <label className="mb-2 block text-sm font-medium">Roller</label>

              <select
                value={detail.roller_id}
                onChange={(e) =>
                  handleDetailChange(detailIndex, "roller_id", e.target.value)
                }
                className="w-full rounded-lg border p-2"
              >
                <option value="">Select Roller</option>
                {rollers.map((roller) => (
                  <option key={roller.id} value={roller.id}>
                    {roller.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Position */}

            <div>
              <label className="mb-2 block text-sm font-medium">Position</label>

              <select
                value={detail.position_id}
                onChange={(e) =>
                  handleDetailChange(detailIndex, "position_id", e.target.value)
                }
                className="w-full rounded-lg border p-2"
              >
                <option value="">Select Position</option>
              </select>
            </div>
          </div>

          {/* Measurement */}

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border p-2">Point</th>
                  <th className="border p-2">Initial</th>
                  <th className="border p-2">Minimum</th>
                  <th className="border p-2">Current</th>
                </tr>
              </thead>

              <tbody>
                {detail.measurements.map((m, measurementIndex) => (
                  <tr key={measurementIndex}>
                    <td className="border p-2 text-center">{m.point_no}</td>

                    <td className="border p-2 text-center">{m.initial_size}</td>

                    <td className="border p-2 text-center">{m.minimum_size}</td>

                    <td className="border p-2">
                      <input
                        type="number"
                        value={m.size}
                        onChange={(e) =>
                          handleMeasurementChange(
                            detailIndex,
                            measurementIndex,
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-2"
                      />
                    </td>
                  </tr>
                ))}

                {detail.measurements.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-500">
                      Select roller first...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* BUTTON */}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addRoller}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50"
        >
          <Plus size={18} />
          Add Roller
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Inspection
        </button>
      </div>
    </div>
  );
}
