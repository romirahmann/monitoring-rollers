import { useState } from "react";
import { api } from "../../../shared/api/axios.js";

export function UnitForm({
  typeMachines = [],
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState({
    name: initialValues?.unitName || "",
    unit: initialValues?.unit || "",
    type_machine_id: typeMachines.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await api.post(`/master/machines`, form);

      onSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Machine Name */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-700">
          Machine Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Example : SM102"
          required
          className="
            w-full
            rounded-2xl
            border
            border-zinc-300
            px-4
            py-3
            outline-none
            transition
            focus:border-zinc-900
            focus:ring-4
            focus:ring-zinc-200
          "
        />
      </div>

      {/* Unit */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-700">
          Unit
        </label>

        <input
          type="text"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="Example : Printing 1"
          required
          className="
            w-full
            rounded-2xl
            border
            border-zinc-300
            px-4
            py-3
            outline-none
            transition
            focus:border-zinc-900
            focus:ring-4
            focus:ring-zinc-200
          "
        />
      </div>

      {/* Type Machine */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-700">
          Type Machine
        </label>

        <select
          name="type_machine_id"
          value={form.type_machine_id}
          onChange={handleChange}
          required
          className="
            w-full
            rounded-2xl
            border
            border-zinc-300
            px-4
            py-3
            outline-none
            transition
            focus:border-zinc-900
            focus:ring-4
            focus:ring-zinc-200
          "
        >
          <option key={typeMachines.id} value={typeMachines.id}>
            {typeMachines.name}
          </option>
        </select>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="
            rounded-2xl
            border
            border-zinc-300
            px-5
            py-3
            font-medium
            hover:bg-zinc-100
            transition
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-2xl
            bg-zinc-900
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-zinc-800
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Save Machine"}
        </button>
      </div>
    </form>
  );
}
