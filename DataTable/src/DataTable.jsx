import { useState } from "react";

function getSortedData(data, sortConfig) {
    if (!sortConfig) return data;

    const { key, direction } = sortConfig;

    return [...data].sort((a, b) => {
        if (a[key] > b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] < b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    })
}

export default function DataTable({ columns, data }) {
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRowIds, setSelectedRowIds] = useState(new Set());

    const pageSize = 3;

    const sortedData = getSortedData(data, sortConfig);

    const totalPages = Math.ceil(sortedData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = sortedData.slice(
        startIndex,
        startIndex + pageSize
    );

    function handleRowClick(rowId, event){
        const isMulti = event.ctrlKey || event.metaKey;

        setSelectedRowIds((prev)=>{
            const next= new Set(prev);

            if(isMulti){
                next.has(rowId)? next.delete(rowId):next.add(rowId);
            }else{
                next.clear();
                next.add(rowId);
            }

            return next;
        })
    }

    function handleSort(col) {
        if (!col.sortable) return;

        setSortConfig(prev => {
            if (prev && prev.key === col.key) {
                return {
                    key: col.key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key: col.key, direction: "asc" };
        });

        setCurrentPage(1); // 🔑 reset page
    }
    return (
        <div>
            <table border="1" cellPadding="0">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                onClick={() => handleSort(col)}
                                style={{
                                    cursor: col.sortable ? "pointer" : "default",
                                    userSelect: "none",
                                }}>
                                {col.label}
                                {sortConfig?.key == col.key && (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row) => {
                        return <tr
                            key={row.id}
                            onClick={(e) => handleRowClick(row.id, e)} style={{
                                background: selectedRowIds.has(row.id)? "#cce5ff": "transparent",
                                cursor: "pointer",
                            }}>
                            {columns.map((col) => {
                                return <td key={col.key}>
                                    {row[col.key]}
                                </td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>

            {/* Pagination UI  */}
            <div style={{ marginTop: "10px" }}>
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}>
                    Prev
                </button>
                <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage == totalPages}>
                    Next
                </button>
            </div>
        </div>

    )
}