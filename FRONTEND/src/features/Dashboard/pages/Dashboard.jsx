export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>

        <p className="text-slate-500">Welcome back, Administrator.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              rounded-2xl
              border border-slate-200
              bg-white
              p-5
            "
          >
            <p className="text-sm text-slate-500">Active Machines</p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">24</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
