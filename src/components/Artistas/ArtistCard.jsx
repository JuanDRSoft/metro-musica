import React, { useState } from 'react'
import MenuArtist from './MenuArtist'
import ModalArtista from './ModalArtista'
import useAuth from '../../hooks/useAuth'
import ModalMetrics from './ModalMetrics'

const ArtistCard = ({ data }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openModalMetrics, setOpenModalMetrics] = useState(false)

  const { name, genere, urlSpotify, urlYoutube, countrie, image, chanelImage } = data
  const { deleteArtist } = useAuth()

  const edit = () => {
    setOpenModal(true)
  }
  const ondelete = () => {
    deleteArtist(data.id)
  }

  const toggleOpenMetrics = () => {
    setOpenModalMetrics(!openModalMetrics)
  }

  return (
    <div className="bg-white shadow mt-3  rounded-xl">
      <div className="bg-gray-300 rounded-t-xl p-1 px-3 flex justify-between">
        <h1 className="font-medium">{name}</h1>
        <MenuArtist edit={edit} ondelete={ondelete} data={data} openMetrics={toggleOpenMetrics} />
      </div>

      <div className="p-3 flex items-center">
        <div className="w-full">
          <div className="flex items-center gap-2">
            {image ? (
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                <img src={image} />
              </div>
            ) : (
              <i class="fas fa-user-circle text-6xl"></i>
            )}

            {chanelImage && (
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                <img src={chanelImage} />
              </div>
            )}
          </div>
        </div>

        <div className="w-full">
          <p>
            <i class="fas fa-map-marker-alt mr-1 text-red-500"></i>
            {countrie}
          </p>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-2">
            <i class="fas fa-music mr-1 text-blue-500"></i>
            {genere.map((e) => (
              <div className="bg-blue-50 rounded-xl px-2">{e}</div>
            ))}
          </div>
        </div>

        <div className="w-full">
          <a
            href={`${urlSpotify.includes('https') ? urlSpotify : `//${urlSpotify}`}`}
            target="_blank"
          >
            <i class="fab fa-spotify text-green-500"></i> {urlSpotify}
          </a>
        </div>

        <div className="w-full">
          <a
            href={`${urlYoutube.includes('https') ? urlYoutube : `//${urlYoutube}`}`}
            target="_blank"
            className="flex items-center gap-2"
          >
            <i class="fab fa-youtube  text-red-500"></i>

            {urlYoutube}
          </a>
        </div>
      </div>

      <ModalArtista data={data} openModal1={openModal} setOpenModal={setOpenModal} />
      <ModalMetrics isOpen={openModalMetrics} closeModal={toggleOpenMetrics} />
    </div>
  )
}

export default ArtistCard
