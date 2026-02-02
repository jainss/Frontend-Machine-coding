import { useState, useMemo } from "react";

/* ---------- SORT HELPER ---------- */
function getSortedData(data, sortConfig) {
  if (!sortConfig) return data;

  const { key, direction } = sortConfig;

  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export default function DataTable({
  columns,
  data,
  pagination,
  onPageChange,
  isLoading = false,
  error = null,
}) {
  const { page, pageSize, total, mode } = pagination;

  /* ---------- STATES ---------- */
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState(new Set());

  /* ---------- ERROR ---------- */
  if (error) {
    return <div style={{ padding: 20, color: "red" }}>❌ {error}</div>;
  }

  /* ---------- LOADING ---------- */
  if (isLoading) {
    return <div style={{ padding: 20 }}>⏳ Loading...</div>;
  }

  /* ---------- EMPTY ---------- */
  if (!data || data.length === 0) {
    return <div style={{ padding: 20 }}>📭 No data available</div>;
  }

  /* ---------- SORT ---------- */
  const sortedData = useMemo(() => {
    return mode === "client"
      ? getSortedData(data, sortConfig)
      : data;
  }, [data, sortConfig, mode]);

  /* ---------- PAGINATION ---------- */
  const totalPages = Math.ceil(total / pageSize);

  const paginatedData =
    mode === "client"
      ? sortedData.slice(
          (page - 1) * pageSize,
          page * pageSize
        )
      : sortedData;

  /* ---------- SORT HANDLER ---------- */
  function handleSort(col) {
    if (!col.sortable) return;

    setSortConfig((prev) => {
      if (prev?.key === col.key) {
        return {
          key: col.key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: col.key, direction: "asc" };
    });

    onPageChange?.(1);
  }

  /* ---------- ROW SELECT ---------- */
  function handleRowClick(rowId, e) {
    const isMulti = e.ctrlKey || e.metaKey;

    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      isMulti
        ? next.has(rowId)
          ? next.delete(rowId)
          : next.add(rowId)
        : (next.clear(), next.add(rowId));
      return next;
    });
  }

  return (
    <div>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                style={{
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                }}
              >
                {col.label}
                {sortConfig?.key === col.key &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              onClick={(e) => handleRowClick(row.id, e)}
              style={{
                background: selectedRowIds.has(row.id)
                  ? "#cce5ff"
                  : "transparent",
                cursor: "pointer",
              }}
            >
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: 10 }}>
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
