import './App.css'
import DataTable from './DataTable'

function App() {
  
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
  ];
  
  const data = [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 28 },
  ];

  return (
    <div>
      <h3>Reuseable DataTable</h3>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default App
