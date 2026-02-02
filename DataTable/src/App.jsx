import './App.css'
import DataTable from './DataTable'

function App() {
  
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name", sortable: true },
    { key: "age", label: "Age", sortable: true },
    { key: "role", label: "Role" },
  ];
  
  const data = [
    { id: 1, name: "Alice", age: 24, role: "Engineer" },
    { id: 2, name: "Bob", age: 30, role: "Designer" },
    { id: 4, name: "Aalind", age: 38, role: "Engineer" },
    { id: 3, name: "Charlie", age: 28, role: "Manager" },
    { id: 5, name: "David", age: 35, role: "Engineer" },
  ];

  return (
    <div>
      <h3>Reuseable DataTable</h3>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default App
