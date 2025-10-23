import axios from "axios"
import { useState } from "react"

function App() {
  const [passager, setPassager] = useState({})
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const URL = "https://simulacion-ahqv.onrender.com/predict"

  const handleChange = (e: any) => {
    setPassager({
      ...passager,
      [e.target.id]: e.target.value
    })
    setError(null)
  }

  const handleReset = () => {
    setPassager({})
    setResult(null)
    setError(null)
    // Reset all form inputs
    const form = document.querySelector('form')
    if (form) {
      form.reset()
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(null)
      setResult(null)
      const resp = await axios.post(URL, passager)
      setResult(resp.data.percentage_survival)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ocurrió un error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-mono text-center text-green-700 mb-6">
            Titanic 
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-mono mb-1">
                Clase del pasajero
              </label>
              <select
                id="Pclass"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 font-mono">
                <option value="">Seleccionar...</option>
                <option value="1">Primera</option>
                <option value="2">Segunda</option>
                <option value="3">Tercera</option>
              </select>
            </div>

            {/* Sex */}
            <div>
              <label className="block text-gray-700 font-mono mb-1">
                Sexo
              </label>
              <select
                id="Sex"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 font-mono">
                <option value="">Seleccionar...</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-700 font-mono mb-1">
                Edad
              </label>
              <input
                id="Age"
                onChange={handleChange}
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 font-mono"
                placeholder="Ej. 30"
              />
            </div>

            {/* SibSp */}
            <div>
              <label className="block text-gray-700 font-mono mb-1">
                Hermanos / Cónyuges a bordo
              </label>
              <input
                id="SibSp"
                onChange={handleChange}
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 font-mono"
                placeholder="Ej. 2"
              />
            </div>

            {/* Parch */}
            <div>
              <label className="block text-gray-700 font-mono mb-1">
                Padres / Hijos a bordo
              </label>
              <input
                id="Parch"
                onChange={handleChange}
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 font-mono"
                placeholder="Ej. 2"
              />
            </div>

            {/* Fare */}
            <div>
              <label className="block text-gray-700 font-mono mb-1">
                Tarifa
              </label>
              <input
                id="Fare"
                onChange={handleChange}
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 font-mono"
                placeholder="Ej. 50.5"
              />
            </div>

            {/* Embarked */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-mono mb-1">
                Puerto de embarque (Embarked)
              </label>
              <select
                id="Embarked"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 font-mono">
                <option value="">Seleccionar...</option>
                <option value="C">Cherbourg</option>
                <option value="Q">Queenstown</option>
                <option value="S">Southampton</option>
              </select>
            </div>

            {/* Botones */}
            <div className="md:col-span-2 flex justify-center gap-4 mt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                type="button"
                className={`${
                  loading ? 'bg-green-200' : 'bg-green-600 hover:bg-green-700'
                } text-white px-6 py-2 rounded-xl font-mono transition duration-200`}
              >
                {loading ? 'Calculando...' : 'Probabilidad'}
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="bg-red-600 text-white px-6 py-2 rounded-xl font-mono hover:bg-red-700 transition duration-200"
              >
                Limpiar
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-6 text-center">
              <div className="text-red-600 bg-red-50 px-4 py-3 rounded-lg font-mono">
                {error}
              </div>
            </div>
          )}

          {/* Resultado */}
          {result && (
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700 mb-2 font-mono">Probabilidad de sobrevivir:</p>
              <div className="text-3xl font-mono text-green-600 bg-green-100 inline-block px-6 py-2 rounded-xl shadow-inner">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
