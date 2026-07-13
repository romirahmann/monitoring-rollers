import { useEffect, useState } from "react";

export function FormInspections({
  machines = [],
  users = [],
  installedRollers = [],
  loading = false,
  onMachineChange,
  onSubmit,
}) {
  const [form, setForm] = useState({
    machine_id: "",
    inspection_date: new Date().toISOString().slice(0, 10),
    checker_id: "",
    notes: "",
    details: [],
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      details: installedRollers.map((roller) => ({
        roller_id: roller.roller_id,
        position_id: roller.position_id,
        roller_code: roller.roller_code,
        position_name: roller.position_name,
        measurements:
          roller.points?.map((point) => ({
            roller_point_id: point.id,
            point_no: point.point_no,
            size: "",
          })) || [],
      })),
    }));
  }, [installedRollers]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "machine_id") {
      onMachineChange?.(value);
    }
  };

  const handleMeasurementChange = (detailIndex, measurementIndex, value) => {
    const details = [...form.details];

    details[detailIndex].measurements[measurementIndex].size = value;

    setForm((prev) => ({
      ...prev,
      details,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Machine */}
      <div>
        <label className="mb-2 block text-sm font-medium">Machine</label>

        <select
          name="machine_id"
          value={form.machine_id}
          onChange={handleChange}
          required
          className="w-full rounded-xl border px-4 py-2"
        >
          <option value="">Select Machine</option>

          {machines.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Inspection Date
        </label>

        <input
          type="date"
          name="inspection_date"
          value={form.inspection_date}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-2"
        />
      </div>

      {/* Checker */}
      <div>
        <label className="mb-2 block text-sm font-medium">Checker</label>

        <select
          name="checker_id"
          value={form.checker_id}
          onChange={handleChange}
          required
          className="w-full rounded-xl border px-4 py-2"
        >
          <option value="">Select Checker</option>

          {users.map((item) => (
            <option key={item.id} value={item.id}>
              {item.username}
            </option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 block text-sm font-medium">Notes</label>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-xl border px-4 py-2"
        />
      </div>

      {/* Roller List */}

      <div className="space-y-4">
        {form.details.map((detail, detailIndex) => (
          <div key={detailIndex} className="rounded-xl border p-5 bg-white">
            <div className="mb-4 flex justify-between">
              <div>
                <h3 className="font-semibold">{detail.roller_code}</h3>

                <p className="text-sm text-slate-500">
                  Position : {detail.position_name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {detail.measurements.map((measurement, measurementIndex) => (
                <div key={measurement.roller_point_id}>
                  <label className="mb-2 block text-sm">
                    Point {measurement.point_no}
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    required
                    value={measurement.size}
                    onChange={(e) =>
                      handleMeasurementChange(
                        detailIndex,
                        measurementIndex,
                        e.target.value,
                      )
                    }
                    className="w-full rounded-xl border px-4 py-2"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-6 py-2 text-white"
        >
          {loading ? "Saving..." : "Save Inspection"}
        </button>
      </div>
    </form>
  );
}
