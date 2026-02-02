import './App.css'
import fileTree from './data'
import FileExplorer from './FileExlporer'

function App() {

  return (
    <div style={{ padding: 20 }}>
      <h3>📁 File Explorer</h3>
      <FileExplorer data={fileTree} />
    </div>
  )
}

export default App
