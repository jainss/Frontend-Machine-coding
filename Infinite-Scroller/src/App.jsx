import { useCallback, useState, useRef } from 'react'
import InfiniteScroll from './infiniteScroll'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const controllerRef = useRef(null);

  const handleInput = useCallback((e) => {
    setQuery(e.target.value);
  }, [])

  const renderItem = useCallback(({title}, key, ref)=><div key={key} ref={ref}>
    {title}
  </div>)

  const getData = useCallback((query, pageNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (controllerRef.current) controllerRef.current.abort()
          controllerRef.current = new AbortController();
        const promise = await fetch('https://openlibrary.org/search.json?' + new URLSearchParams({
          q: query,
          page: pageNumber
        }), { signal: controllerRef.current.signal })

        const data = await promise.json();
        console.log(data);
        setData((prevData) => [...prevData, ...data.docs]);
        resolve();
        
      } catch (error) {
        console.log(error, "here is the error!!");
        reject();
      }

    })
  }, [])

  return <>
    <input type='text' value={query} onChange={handleInput} />
    <InfiniteScroll renderlistItem={renderItem} listDate={data} getData={getData} query={query} />
  </>
}

export default App
