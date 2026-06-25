import { useEffect, useState } from "react";
import { Calendar, Hash } from "lucide-react";
import { api } from "../../../shared/api/axios.js";

export function RollerForm({
  mode = "Add",
  initialData = null,
  machineId,
  positionId,
  loading = false,
  onSubmit,
  onClose,
}) {
  const [form, setForm] = useState({
    code: "",
    installed_at: "",

    point1: "",
    point2: "",
    point3: "",
  });

  const isEdit = mode === "Edit";

  useEffect(() => {
    if (!initialData) {
      setForm({
        code: "",
        installed_at: new Date().toISOString().slice(0, 16),

        point1: "",
        point2: "",
        point3: "",
      });

      return;
    }

    setForm({
      code: initialData.code || "",

      installed_at: initialData.installed_at?.replace(" ", "T")?.slice(0, 16),

      point1:
        initialData.points?.find((x) => x.point_no === 1)?.initial_size ?? "",

      point2:
        initialData.points?.find((x) => x.point_no === 2)?.initial_size ?? "",

      point3:
        initialData.points?.find((x) => x.point_no === 3)?.initial_size ?? "",
    });
  }, [initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyToAll = () => {
    if (!form.point1) return;

    setForm((prev) => ({
      ...prev,
      point2: prev.point1,
      point3: prev.point1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...(isEdit && { id: initialData.id }),

      code: form.code,
      type: "karet",
      machine_id: Number(machineId),
      position_id: Number(positionId),
      installed_at: form.installed_at.replace("T", " "),
      status: "ACTIVE",

      points: [
        {
          point_no: 1,
          initial_size: Number(form.point1),
        },
        {
          point_no: 2,
          initial_size: Number(form.point2),
        },
        {
          point_no: 3,
          initial_size: Number(form.point3),
        },
      ],
    };

    console.log(payload);

    try {
      let res = await api.post("/master/roller", payload);
      console.log(res);
    } catch (e) {
      console.log(e);
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {isEdit ? "Edit Roller" : "Add Roller"}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {isEdit ? "Update roller information." : "Register a new roller."}
        </p>
      </div>

      {/* Code */}
      <div>
        <label className="mb-2 block text-sm font-medium">Roller Code</label>

        <div className="relative">
          <Hash
            size={16}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            value={form.code}
            onChange={(e) => handleChange("code", e.target.value)}
            placeholder="P1-01-0001"
            className="
              w-full rounded-xl border
              py-3 pl-10 pr-4

              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              outline-none
            "
          />
        </div>
      </div>

      {/* Installed At */}
      <div>
        <label className="mb-2 block text-sm font-medium">Installed Date</label>

        <div className="relative">
          <Calendar
            size={16}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="datetime-local"
            value={form.installed_at}
            onChange={(e) => handleChange("installed_at", e.target.value)}
            className="
              w-full rounded-xl border
              py-3 pl-10 pr-4

              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              outline-none
            "
          />
        </div>
      </div>

      {/* Point Measurements */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium">
            Initial Measurements (mm)
          </label>

          <button
            type="button"
            onClick={applyToAll}
            className="
              text-xs font-medium
              text-blue-600
              hover:text-blue-700
            "
          >
            Apply Point 1 to All
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((point) => (
            <div
              key={point}
              className="
                rounded-xl border
                bg-slate-50
                p-4
              "
            >
              <div className="mb-2 text-xs text-slate-500">Point {point}</div>

              <input
                type="number"
                step="0.01"
                value={form[`point${point}`]}
                onChange={(e) => handleChange(`point${point}`, e.target.value)}
                placeholder="75"
                className="
                  w-full rounded-lg border
                  px-3 py-2

                  text-center
                  text-lg
                  font-semibold

                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          type="button"
          onClick={onClose}
          className="
            rounded-xl border
            px-5 py-2.5
            text-sm font-medium
            hover:bg-slate-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-slate-900
            px-5 py-2.5

            text-sm
            font-semibold
            text-white

            hover:bg-slate-800

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : isEdit ? "Update Roller" : "Save Roller"}
        </button>
      </div>
    </form>
  );
}
