import { useForm } from "react-hook-form";

export function UserForm({
  mode = "Add",
  defaultValues = {},
  roles = [],
  loading = false,
  onSubmit,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: defaultValues.username || "",
      password: "",
      role_id: defaultValues.role_id || "",
    },
  });

  const isAdd = mode === "Add";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Username */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Username
        </label>

        <input
          {...register("username")}
          placeholder="Enter username"
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

      {/* Password */}
      {isAdd && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
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
      )}

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Role
        </label>

        <select
          {...register("role_id")}
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
          <option value="">Select Role</option>

          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Button */}
      <div className="flex justify-end gap-3 pt-2">
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
          {loading ? "Saving..." : isAdd ? "Add User" : "Update User"}
        </button>
      </div>
    </form>
  );
}
