import React from 'react'
import useAuth from '../hooks/useAuth'

const FilterArtist = () => {
  const { generos, countries } = useAuth()

  const genere = generos.map((e) => {
    return {
      label: e.name,
      value: e.name
    }
  })

  const countrieOptions = countries.map((e) => {
    return {
      label: e.translations.spa.common,
      value: e.translations.spa.common
    }
  })

  return [
    { value: 'name', label: 'Nombre', type: 'text' },
    { value: 'urlYoutube', label: 'URL', type: 'text' },
    { value: 'countrie', label: 'País', type: 'autotoggle', options: countrieOptions },
    { value: 'genere', label: 'Generos', type: 'select', options: genere }
  ]
}

export { FilterArtist }
