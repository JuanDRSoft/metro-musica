import React, { useState } from 'react'
import { toast } from 'react-toastify'

const DynamicFilter = ({ data, options, setFilter, filter }) => {
  const [state, setState] = useState()

  const onSearch = () => {
    if (!state) {
      toast.warning('No hay datos para filtrar')
      return
    }

    const datosFiltrados = data.filter((item) => {
      for (let key in state) {
        if (!item[key].toLowerCase().includes(state[key].toLowerCase())) {
          return false
        }
      }
      return true
    })
    setFilter(datosFiltrados)
  }

  return (
    <div>
      <div className="flex gap-5">
        {options.map((value) => {
          return (
            <div className="w-full">
              <label>{value.label}</label>
              {value.type == 'select' ? (
                <select
                  className="w-full border border-red-500 p-1 rounded-xl px-2"
                  value={state ? state[value.value] : ''}
                  onChange={(e) => setState({ ...state, [value.value]: e.target.value })}
                >
                  <option>Selecciona Un {value.label}</option>
                  {value.options.map((e) => (
                    <option value={e.value}>{e.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={state ? state[value.value] : ''}
                  type={value.type}
                  onChange={(e) => setState({ ...state, [value.value]: e.target.value })}
                  className="w-full border border-red-500 p-1 rounded-xl px-2"
                />
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center mt-3 gap-3 w-full justify-center">
        <button
          className="bg-red-500 w-40 p-1 text-white font-semibold rounded-xl"
          onClick={onSearch}
        >
          Buscar
        </button>

        {filter && (
          <button
            className="bg-black w-40 p-1 text-white font-semibold rounded-xl"
            onClick={() => {
              setFilter()
              setState()
            }}
          >
            Reestablecer filtro
          </button>
        )}
      </div>
    </div>
  )
}

export default DynamicFilter
