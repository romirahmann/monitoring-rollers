import { useEffect, useState } from "react";

export function MachineForm({
  mode = "Add",
  defaultValues = {},
  typeMachines = [],
  loading = false,
  onSubmit,
}) {
  const isAdd = mode === "Add";

  const [form, setForm] = useState({
    name: defaultValues.name || "",
    unit: defaultValues.unit || "",
    type_machine_id: defaultValues.type_machine_id || "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (defaultValues.image) {
      const url = `${import.meta.env.VITE_API_BASE_URL}/uploads/${defaultValues.image}`;

      setPreview(url);
    } else {
      setPreview(null);
    }
  }, [defaultValues]);

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
    formData.append("unit", form.unit);
    formData.append("type_machine_id", form.type_machine_id);

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
          placeholder="Example : KBA RAPIDA 106"
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

      {/* Unit */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Unit
        </label>

        <input
          type="text"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="Example : Unit A"
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

      {/* Type Machine */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Type Machine
        </label>

        <select
          name="type_machine_id"
          value={form.type_machine_id}
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
          <option value="">Select Type Machine</option>

          {typeMachines.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
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
          {loading ? "Saving..." : isAdd ? "Add Machine" : "Update Machine"}
        </button>
      </div>
    </form>
  );
}
