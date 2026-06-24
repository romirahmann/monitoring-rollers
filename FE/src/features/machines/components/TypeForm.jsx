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
    category,
    image: null,
  });

  const [preview, setPreview] = useState(
    initialValues?.image_url || initialValues?.image || null,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image Upload */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-700">
          Machine Image
        </label>

        <div className="overflow-hidden rounded-2xl border border-zinc-300 bg-white">
          {preview ? (
            <div className="relative group">
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
                    text-zinc-900
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
                    text-sm font-medium
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
                border-zinc-300
                bg-zinc-50
                text-zinc-500
                transition
                hover:border-zinc-500
              "
            >
              <span className="text-5xl">📷</span>

              <div className="text-center">
                <p className="font-medium">Upload Machine Image</p>

                <p className="text-sm text-zinc-400">
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
            resize-none
            transition
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
            transition
            hover:bg-zinc-100
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
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Save Type"}
        </button>
      </div>
    </form>
  );
}
