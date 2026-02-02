import { useState } from "react";

function getSotedData(data, sortConfig) {
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

    const sortData = getSotedData(data, sortConfig);

    function handleSort(col) {

        if (!col.sortable) return;

        setSortConfig((prev) => {
            if (prev && prev.key === col.key) {
                return {
                    key: col.key,
                    direction: prev.direction === "asc" ? "desc" : "asc"
                };
            }

            return {
                key: col.key,
                direction: "asc"
            }
        })
    }

    return (
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
                {sortData.map((row) => {
                    return <tr key={row.id}>
                        {columns.map((col) => {
                            return <td key={col.key}>
                                {row[col.key]}
                            </td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    )
}