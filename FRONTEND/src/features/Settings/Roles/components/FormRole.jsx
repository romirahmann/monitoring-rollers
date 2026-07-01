import { useForm } from "react-hook-form";

export function RoleForm({
  mode = "Add",
  defaultValues = {},
  loading = false,
  onSubmit,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: defaultValues.name || "",
      description: defaultValues.description || "",
    },
  });

  const isAdd = mode === "Add";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl bg-white p-6"
    >
      {/* Role Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Role Name
        </label>

        <input
          {...register("name")}
          placeholder="Enter role name"
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

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={4}
          placeholder="Enter role description"
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-2.5
            outline-none
            transition
            resize-none
            focus:border-blue-500
          "
        />
      </div>

      {/* Button */}
      <div className="flex justify-end pt-2">
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
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : isAdd ? "Add Role" : "Update Role"}
        </button>
      </div>
    </form>
  );
}
