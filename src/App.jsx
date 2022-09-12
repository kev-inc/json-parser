import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view'

function App() {

  const [jsonString, setJsonString] = useState('')
  const [jsonObject, setJsonObject] = useState({})
  const [err, setErr] = useState(null)
  const [config, setConfig] = useState({
    enableClipboard: false,
    displayDataTypes: false,
    displayObjectSize: false,
    displayArrayKey: false,
    showJsonString: true,
    showJsonParsed: true
  })

  useEffect(() => {
    try {
      if (jsonString.length > 0) {
        const js = JSON.parse(jsonString)
        setJsonObject(js)
      } else {
        setJsonObject({})
      }
      setErr(null)
    } catch (e) {
      setErr(e.message)
    }
  }, [jsonString])


  return (
    <div className='bg-gray-100 h-screen flex flex-col'>
      <div className="text-xl font-semibold p-4 mb-2 border bg-white shadow-sm text-blue-500 text-center">
        JSON Parser
      </div>
      <div className='flex gap-4 bg-white border px-4 py-2 mx-4 rounded-lg'>
        <div className="flex flex-1 gap-4">
          <div class="flex items-center">
            <input type="checkbox" checked={config.showJsonString} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={(e) => setConfig({ ...config, showJsonString: e.target.checked })} />
            <label class="ml-2 text-sm font-medium text-gray-900">Show JSON String</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" checked={config.showJsonParsed} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={(e) => setConfig({ ...config, showJsonParsed: e.target.checked })} />
            <label class="ml-2 text-sm font-medium text-gray-900">Show Parsed JSON</label>
          </div>
        </div>
        <div className='flex gap-4'>
          <div class="flex items-center">
            <input type="checkbox" checked={config.enableClipboard} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={(e) => setConfig({ ...config, enableClipboard: e.target.checked })} />
            <label class="ml-2 text-sm font-medium text-gray-900">Enable Clipboard</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" checked={config.displayObjectSize} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={(e) => setConfig({ ...config, displayObjectSize: e.target.checked })} />
            <label class="ml-2 text-sm font-medium text-gray-900">Display Object Size</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" checked={config.displayDataTypes} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={(e) => setConfig({ ...config, displayDataTypes: e.target.checked })} />
            <label class="ml-2 text-sm font-medium text-gray-900">Display Data Types</label>
          </div>
          <div class="flex items-center">
            <input type="checkbox" checked={config.displayArrayKey} class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={(e) => setConfig({ ...config, displayArrayKey: e.target.checked })} />
            <label class="ml-2 text-sm font-medium text-gray-900">Display Array Key</label>
          </div>
        </div>

      </div>

      <div className="px-4 py-2 flex gap-4 h-full">
        {config.showJsonString && (
          <div className='bg-white border p-4 rounded-lg flex-1 flex flex-col'>
            <div className="text-xl font-semibold text-blue-500 mb-3">JSON String</div>
            <pre className='flex-1'>
              <textarea
                class="block p-2.5 w-full text-xs text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:border h-full"
                value={jsonString}
                onChange={e => setJsonString(e.target.value)}
                style={{ resize: 'none' }}
              />
            </pre>
          </div>
        )}
        {config.showJsonParsed && (
          <div className='bg-white border p-4 rounded-lg flex-1 flex flex-col'>
            <div className="text-xl font-semibold text-blue-500 mb-3">Parsed JSON</div>
            <div className='block p-2.5 rounded-lg bg-gray-100 flex-1 overflow-auto'>
              {err === null ? (
                <ReactJson
                  src={jsonObject}
                  name={false}
                  enableClipboard={config.enableClipboard}
                  displayDataTypes={config.displayDataTypes}
                  displayObjectSize={config.displayObjectSize}
                  displayArrayKey={config.displayArrayKey}
                  iconStyle="square"
                  style={{ height: '1px' }}
                />
              ) : (
                <pre>{err}</pre>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
