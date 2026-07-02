import { useEffect, useState } from "react";
import { useCategoryStore } from "../../../MasterData/Categories/store/categories.store.js";
import { useCategories } from "../../../MasterData/Categories/hooks/use-categories.js";

const rollerTypes = [
  { label: "Karet", value: "karet" },
  { label: "Teflon", value: "teflon" },
  { label: "Chrome", value: "chrome" },
];

const defaultForm = {
  code: "",
  type: "",
  category_id: "",
  status: 1,
  points: [
    {
      point_no: 1,
      initial_size: "",
      minimum_size: "",
    },
    {
      point_no: 2,
      initial_size: "",
      minimum_size: "",
    },
    {
      point_no: 3,
      initial_size: "",
      minimum_size: "",
    },
  ],
};

export function RollerForm({
  defaultValues,
  categories = [],
  loading = false,
  submitText = "Save Roller",
  onSubmit,
}) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!defaultValues) return;

    setForm({
      ...defaultForm,
      ...defaultValues,
      points:
        defaultValues.points?.length > 0
          ? defaultValues.points
          : defaultForm.points,
    });
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handlePointChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      points: prev.points.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", form);
    onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-5">
        {/* LEFT */}
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold">Roller Information</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Roller Code
                </label>

                <input
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="RL-001"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Roller Type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
                >
                  <option value="">Select Roller Type</option>

                  {rollerTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
                >
                  <option value="">Select Category</option>

                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500"
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold">Roller Measurement</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left">Point</th>
                    <th className="pb-3 text-left">Initial Size</th>
                    <th className="pb-3 text-left">Minimum Size</th>
                  </tr>
                </thead>

                <tbody>
                  {form.points.map((point, index) => (
                    <tr key={point.point_no} className="border-b">
                      <td className="py-4 font-medium">
                        Point {point.point_no}
                      </td>

                      <td className="pr-3">
                        <input
                          type="number"
                          step="0.01"
                          value={point.initial_size}
                          onChange={(e) =>
                            handlePointChange(
                              index,
                              "initial_size",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={point.minimum_size}
                          onChange={(e) =>
                            handlePointChange(
                              index,
                              "minimum_size",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-xl border border-slate-300 px-4 py-2.5"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-8 py-3 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}
