// shared/components/PageHeader.jsx

import { Search, Plus, Download, Filter } from "lucide-react";

export function PageHeader({
  title,
  description,
  searchPlaceholder = "Search...",
  onSearch,
  actionLabel,
  onAction,
  children,
}) {
  return (
    <div className="mb-6">
      {/* Title */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            {title}
          </h1>

          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>

        {actionLabel && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus size={18} />
            {actionLabel}
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
}
