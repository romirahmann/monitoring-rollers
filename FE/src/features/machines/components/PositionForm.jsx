import { MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../../shared/api/axios.js";

export function PositionForm({
  mode = "Add",
  initialData = null,
  loading = false,
  onSubmit,
  onClose,
  machineId,
}) {
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (initialData) {
      setPosition(initialData.position ?? "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position.trim()) return;
    const payload = {
      machine_id: machineId,
      position,
    };

    if (mode === "Add") {
      let res = await api.post(`/master/position`, payload);
    }
    if (mode === "Edit") {
    }

    onSubmit(payload);
  };

  const isEdit = mode === "Edit";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <p className="mt-1 text-sm text-zinc-500">
          {isEdit
            ? "Update the position information."
            : "Add a new position for roller machine."}
        </p>
      </div>

      {/* Input */}
      <div>
        <label
          htmlFor="position"
          className="mb-2 block text-sm font-medium text-zinc-700"
        >
          Position Name
        </label>

        <div className="relative">
          <MapPin
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            id="position"
            autoFocus
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g 1.2"
            className="
              w-full rounded-xl border border-zinc-300
              py-3 pl-10 pr-4 text-sm
              outline-none transition-all

              focus:border-zinc-900
              focus:ring-4
              focus:ring-zinc-200
            "
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          type="button"
          onClick={onClose}
          className="
            rounded-xl border px-5 py-2.5
            text-sm font-medium
            transition-all hover:bg-zinc-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={!position.trim() || loading}
          className="
            flex items-center gap-2
            rounded-xl bg-zinc-900
            px-5 py-2.5
            text-sm font-semibold text-white

            transition-all
            hover:bg-zinc-800

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading && <Loader2 size={16} className="animate-spin" />}

          {isEdit ? "Update Position" : "Save Position"}
        </button>
      </div>
    </form>
  );
}
