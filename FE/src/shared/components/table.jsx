import { useMemo, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function SharedTable({
  columns = [],
  data = [],
  loading = false,
  pageSizeOptions = [10, 25, 50, 100],
}) {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;

      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortField(field);
    setSortDirection("asc");
  };

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              {columns.map((column) => (
                <th
                  key={column.field}
                  onClick={() => column.sortable && handleSort(column.field)}
                  className={`px-4 py-3 text-left text-sm font-semibold ${
                    column.sortable ? "cursor-pointer select-none" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {column.header}

                    {column.sortable && sortField === column.field && (
                      <>
                        {sortDirection === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10">
                  Data not found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={row.id} className="border-t hover:bg-slate-50">
                  {columns.map((column) => (
                    <td key={column.field} className="px-4 py-3 text-sm">
                      {column.render
                        ? column.render(row[column.field], row, index)
                        : row[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 border-t">
        <div>
          Total Data : <b>{data.length}</b>
        </div>

        <div className="flex items-center gap-2">
          <span>Rows</span>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {pageSizeOptions.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="border px-3 py-1 rounded"
          >
            Prev
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="border px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
