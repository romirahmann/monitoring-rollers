import { useState } from "react";

export function TypeMachineForm({
  mode = "Add",
  categories = [],
  defaultValues = {},
  loading = false,
  onSubmit,
}) {
  const isAdd = mode === "Add";

  const [form, setForm] = useState({
    name: defaultValues.name || "",
    category_id: defaultValues.category_id || "",
    description: defaultValues.description || "",
    image: null,
  });

  const [preview, setPreview] = useState(
    defaultValues.image || defaultValues.image || null,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setPreview(null);

    setForm((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("category_id", form.category_id);
    formData.append("description", form.description);

    // Hanya kirim image jika user memilih gambar baru
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Machine Image
        </label>

        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
          {preview ? (
            <div className="group relative">
              <img
                src={preview}
                alt="Machine Preview"
                className="h-56 w-full object-cover"
              />

              <div
                className="
                  absolute inset-0
                  flex items-center justify-center gap-3
                  bg-black/50
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              >
                <label
                  htmlFor="machine-image"
                  className="
                    cursor-pointer
                    rounded-xl
                    bg-white
                    px-4 py-2
                    text-sm font-medium
                    text-slate-900
                  "
                >
                  Change Image
                </label>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="
                    rounded-xl
                    bg-red-500
                    px-4 py-2
                    text-sm
                    text-white
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <label
              htmlFor="machine-image"
              className="
                flex
                h-56
                cursor-pointer
                flex-col
                items-center
                justify-center
                gap-3
                border-2
                border-dashed
                border-slate-300
                bg-slate-50
                transition
                hover:border-slate-500
              "
            >
              <span className="text-5xl">📷</span>

              <div className="text-center">
                <p className="font-medium">Upload Machine Image</p>

                <p className="text-sm text-slate-400">
                  JPG, PNG, WEBP (Max 10MB)
                </p>
              </div>
            </label>
          )}

          <input
            id="machine-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Machine Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Machine Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Example : SM102"
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

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Category
        </label>

        <select
          name="category_id"
          value={form.category_id}
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
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
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
            resize-none
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
              ? "Add Type Machine"
              : "Update Type Machine"}
        </button>
      </div>
    </form>
  );
}
