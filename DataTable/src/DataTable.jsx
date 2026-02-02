export default function DataTable({ columns, data }) {
    return (
        <table border="1" cellPadding="0">
            <thead>
                <tr>
                    {columns.map((col) => {
                        return <th key={col.key}>{col.label}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => {
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