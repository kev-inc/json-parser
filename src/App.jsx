import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view'

function App() {

  const [jsonString, setJsonString] = useState('')
  const [jsonObject, setJsonObject] = useState({})
  const [err, setErr] = useState(null)

  useEffect(() => {
    try {
      if (jsonString.length > 0) {
        const js = JSON.parse(jsonString)
        setJsonObject(js)
      }
      setErr(null)
    } catch (e) {
      setErr(e.message)
    }
  }, [jsonString])

  return (
    <div className='bg-gray-100 h-screen'>
      <div className="text-xl font-semibold p-4 mb-4 border bg-white shadow-sm text-blue-500 text-center">
        JSON Parser
      </div>
      <div className="px-4 py-2 grid grid-cols-2 gap-4 h-full">
        <div className='bg-white border px-4 py-2 rounded-lg '>
          <div className="text-xl font-semibold text-blue-500 mb-3">JSON String</div>
          <pre>
            <textarea
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none h-screen "
              value={jsonString}
              onChange={e => setJsonString(e.target.value)}
            />
          </pre>
        </div>
        <div className='bg-white border px-4 py-2 rounded-lg h-full'>
          <div className="text-xl font-semibold text-blue-500 mb-3">Parsed JSON</div>
          {err === null ? (
            <ReactJson
            src={jsonObject}
            name={false}
            enableClipboard={false}
            displayDataTypes={false}
          />
          ) : (
            <pre>{err}</pre>
          )}
          
        </div>
      </div>


    </div>
  );
}

export default App;
