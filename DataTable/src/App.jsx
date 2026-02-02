import { useEffect, useState } from 'react';
import './App.css'
import DataTable from './DataTable'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name", sortable: true },
    {
      key: "age", label: "Age", sortable: true, render: (value) => (
        <span style={{ color: value >= 30 ? "green" : "orange" }}>
          {value} yrs
        </span>
      )
    },
    { key: "role", label: "Role" },
    {
      key: "actions", label: "Actions", render: (_, row) => (
        <>
          <button onClick={(e) => {
            e.stopPropagation();
            alert(`Edit ${row.name}`);
          }}>
            ✏️
          </button>
          <button onClick={(e) => {
            e.stopPropagation();
            alert(`Delete ${row.name}`);
          }}
            style={{ marginLeft: 6 }}
          >
            🗑️
          </button>
        </>
      )
    }
  ];
  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: 1, name: "Alice", age: 24, role: "Engineer" },
        { id: 2, name: "Bob", age: 30, role: "Designer" },
        { id: 4, name: "Aalind", age: 38, role: "Engineer" },
        { id: 3, name: "Charlie", age: 28, role: "Manager" },
        { id: 5, name: "David", age: 35, role: "Engineer" },
        { id: 6, name: "Sahil", age: 24, role: "Engineer" },
        { id: 7, name: "Aman", age: 30, role: "Designer" },
        { id: 8, name: "Usha", age: 30, role: "Engineer" },
        { id: 9, name: "Devil", age: 28, role: "Manager" },
        { id: 10, name: "Dev", age: 68, role: "Engineer" },
      ])

      setIsLoading(false);
    }, 1500)
  }, []);

  return (
    <div>
      <h3>Reuseable DataTable</h3>
      <DataTable
      columns={columns}
      data={data}
      pagination={{
        page,
        pageSize: 5,
        total: data.length,
        mode: "client",
      }}
      onPageChange={setPage}
    />
    </div>
  )
}

export default App
