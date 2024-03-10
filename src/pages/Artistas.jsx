import React, { useState } from 'react'
import ModalArtista from '../components/Artistas/ModalArtista'
import useAuth from '../hooks/useAuth'
import MenuArtist from '../components/Artistas/MenuArtist'
import ArtistCard from '../components/Artistas/ArtistCard'
import DynamicFilter from '../utils/DynamicFilter'
import { FilterArtist } from '../Data/Filters'

const Artistas = () => {
  const [filter, setFilter] = useState()
  const { artist } = useAuth()

  return (
    <div>
      <h1 className="font-bold text-4xl">Artistas</h1>
      <hr className="mt-3 border" />

      <div className="flex justify-end mt-3">
        <ModalArtista />
      </div>

      <div className="mt-10">
        <DynamicFilter
          data={artist}
          setFilter={setFilter}
          options={FilterArtist()}
          filter={filter}
        />
      </div>

      <div className="mt-10">
        {(filter ? filter : artist).map((e) => (
          <ArtistCard data={e} />
        ))}

        {filter?.length == 0 && (
          <div className="w-full text-center text-2xl text-gray-300">No existen registros</div>
        )}
      </div>
    </div>
  )
}

export default Artistas
