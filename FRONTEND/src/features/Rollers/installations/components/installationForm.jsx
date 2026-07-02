import { useState } from "react";

export function InstallationForm({
  mode = "Add",
  rollers = [],
  positions = [],
  defaultValues = {},
  loading = false,
  onSubmit,
}) {
  const data = defaultValues ?? {};

  const isAdd = mode === "Add";

  const [form, setForm] = useState({
    roller_id: data.roller_id || "",
    position_id: data.position_id || "",
    installation_date:
      data.installation_date || new Date().toISOString().split("T")[0],
    installed_by: data.installed_by || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Roller */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Roller
        </label>

        <select
          name="roller_id"
          value={form.roller_id}
          onChange={handleChange}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-2.5
            outline-none
            transition
            focus:border-blue-500
          "
        >
          <option value="">Select Roller</option>

          {rollers.map((roller) => (
            <option key={roller.id} value={roller.id}>
              {roller.code} - {roller.type}
            </option>
          ))}
        </select>
      </div>

      {/* Position */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Position
        </label>

        <select
          name="position_id"
          value={form.position_id}
          onChange={handleChange}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-2.5
            outline-none
            transition
            focus:border-blue-500
          "
        >
          <option value="">Select Position</option>

          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.machine_name} - {position.name}
            </option>
          ))}
        </select>
      </div>

      {/* Installation Date */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Installation Date
        </label>

        <input
          type="date"
          name="installation_date"
          value={form.installation_date}
          onChange={handleChange}
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-2.5
            outline-none
            transition
            focus:border-blue-500
          "
        />
      </div>

      {/* Installed By */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Installed By
        </label>

        <input
          type="text"
          name="installed_by"
          value={form.installed_by}
          onChange={handleChange}
          placeholder="Example : Romi Rahman"
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-2.5
            outline-none
            transition
            focus:border-blue-500
          "
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-slate-900
            px-5
            py-2.5
            text-white
            transition
            hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Saving..."
            : isAdd
              ? "Install Roller"
              : "Update Installation"}
        </button>
      </div>
    </form>
  );
}
