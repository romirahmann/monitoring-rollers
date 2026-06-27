import { ChevronLeft, ChevronRight, Pencil, Trash2, Eye } from "lucide-react";

export function SharedTable({
  columns = [],
  data = [],
  loading = false,

  currentPage = 1,
  totalPages = 1,
  onPageChange,

  actions = [],
}) {
  const hasAction = actions.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Header */}
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                >
                  {column.title}
                </th>
              ))}

              {hasAction && (
                <th className="w-40 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Action
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-slate-100">
                  {[...columns, ...(hasAction ? [{}] : [])].map((_, i) => (
                    <td key={i} className="px-5 py-4">
                      <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasAction ? 1 : 0)}
                  className="py-16 text-center text-slate-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id ?? rowIndex}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-4 text-sm text-slate-700"
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}

                  {hasAction && (
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {actions.map((action, index) => {
                          const Icon = action.icon;

                          return (
                            <button
                              key={index}
                              onClick={() => action.onClick(row)}
                              className={`
                                rounded-lg p-2 transition
                                ${
                                  action.variant === "danger"
                                    ? "text-red-600 hover:bg-red-50"
                                    : action.variant === "warning"
                                      ? "text-amber-600 hover:bg-amber-50"
                                      : "text-slate-600 hover:bg-slate-100"
                                }
                              `}
                              title={action.label}
                            >
                              <Icon size={18} />
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange?.(currentPage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
