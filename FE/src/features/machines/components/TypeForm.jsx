import { useState } from "react";

export function TypeForm({
  category,
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
    category: category,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
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

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-700">
          Description
        </label>

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Machine description..."
          className="
            w-full
            rounded-2xl
            border
            border-zinc-300
            px-4
            py-3
            outline-none
            transition
            resize-none
            focus:border-zinc-900
            focus:ring-4
            focus:ring-zinc-200
          "
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-700">
          Category
        </label>

        <input
          value={category}
          disabled
          className="
            w-full
            rounded-2xl
            border
            border-zinc-200
            bg-zinc-100
            px-4
            py-3
            text-zinc-600
            cursor-not-allowed
          "
        />
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
          {loading ? "Saving..." : "Save Type"}
        </button>
      </div>
    </form>
  );
}
