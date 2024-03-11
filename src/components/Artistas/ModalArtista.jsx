import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import SelectImage from '../../utils/SelectImage'
import axios from 'axios'
import Autotoggle from '../../utils/Autotoggle'

const ModalArtista = ({ data, openModal1, setOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState()
  const [name, setName] = useState('')
  const [countrie, setCountrie] = useState('')
  const [genere, setGenere] = useState([])
  const [urlYoutube, setUrlYoutube] = useState('')
  const [urlSpotify, setUrlSpotify] = useState('')
  const [image, setImage] = useState('')
  const [chanelImage, setChanelImage] = useState('')

  const { handleArtist, generos, countries } = useAuth()
  useEffect(() => {
    function extractUsernameFromUrl(url) {
      const usernameRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([^\/?]+)/i
      const usernameMatch = url.match(usernameRegex)
      return usernameMatch ? usernameMatch[1] : null
    }

    function extractId(url) {
      const channelRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/([^\/\n\s]+)/i
      const channelMatch = url.match(channelRegex)
      return channelMatch ? channelMatch[1] : null
    }
    if (urlYoutube) {
      const username = extractUsernameFromUrl(urlYoutube)
      const id = extractId(urlYoutube)
      const apiKey = 'AIzaSyC7XUuqDaZaEVzTQt1D3A9d0VBjdSVZSd4'

      if (username) {
        const fetchData = async () => {
          try {
            // Realiza la solicitud a la API de YouTube
            const response = await axios.get(
              `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=1&type=channel&q=@${username}&key=${apiKey}`
            )

            // Actualiza el estado con los datos del video
            const data = response?.data.items[0].snippet.channelId
            // setCanalData(response?.data.items[0]);

            const response2 = await axios.get(
              `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${data}&key=${apiKey}`
            )

            // setCanalData(response2?.data.items[0]);
            // setYoutubeData(response2?.data.items[0]);
            setChanelImage(response2?.data.items[0].snippet.thumbnails.default.url)
            console.log(response2)
          } catch (error) {
            console.error('Error al obtener datos del video:', error)
          }
        }

        fetchData()
      } else if (id) {
        const fetchData = async () => {
          try {
            // Realiza la solicitud a la API de YouTube
            const response = await axios.get(
              `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${id}&key=${apiKey}`
            )

            // Actualiza el estado con los datos del video
            setChanelImage(response?.data.items[0].snippet.thumbnails.default.url)
            // setCanalData(response?.data.items[0]);
            // setYoutubeData(response2?.data.items[0]);
          } catch (error) {
            console.error('Error al obtener datos del video:', error)
          }
        }

        fetchData()
      } else if (urlYoutube == '') {
        setUrlYoutube(null)
      }
    }
  }, [urlYoutube])

  useEffect(() => {
    if (data?.id) {
      setId(data.id)
      setName(data.name)
      setCountrie(data.countrie)
      setGenere(data.genere)
      setUrlYoutube(data.urlYoutube)
      setUrlSpotify(data.urlSpotify)
    }
  }, [data])

  function closeModal() {
    if (openModal1) {
      setOpenModal(false)
      setId('')
    } else {
      setIsOpen(false)
      setId('')
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  const initial = () => {
    setId('')
    setName('')
    setCountrie('')
    setGenere([])
    setUrlYoutube('')
    setUrlSpotify('')
    closeModal()
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if ([name, countrie, genere, urlYoutube, urlSpotify].includes('')) {
      toast.warning('Llena todos los campos')
      return
    }

    const body = {
      name,
      countrie,
      genere,
      urlSpotify,
      urlYoutube,
      image,
      chanelImage
    }

    handleArtist(body, initial, id)
  }

  const deleteGenere = (e) => {
    const filter = genere.filter((gen) => gen !== e)

    setGenere(filter)
  }

  const countrieOptions = countries.map((e) => {
    return {
      label: e.translations.spa.common,
      value: e.translations.spa.common
    }
  })

  return (
    <>
      {!data?.name && (
        <div className="inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-red-500 p-2 px-5 font-medium text-white"
          >
            Crear Artista
          </button>
        </div>
      )}

      <Transition appear show={openModal1 || isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 z-20" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto  z-20">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium text-center leading-6 text-gray-900"
                  >
                    {data?.name ? 'Editar Artista' : 'Crear Artista'}
                  </Dialog.Title>
                  <form className="mt-5" onSubmit={onSubmit}>
                    <div className="flex justify-center mb-3">
                      <SelectImage image={image} setImage={setImage} album={'artistas'} />
                    </div>

                    <label>Nombre</label>
                    <input
                      className="p-1 border border-red-500 rounded-xl w-full mb-3 mt-1 pl-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <label>País</label>
                    <div className="mb-3">
                      <Autotoggle
                        state={countrie}
                        onChange={(e) => setCountrie(e.value)}
                        options={countrieOptions}
                      />
                    </div>

                    <label>Géneros Musicales</label>
                    <select
                      className="p-1 border border-red-500 rounded-xl w-full mb-3 mt-1 pl-3"
                      value={genere}
                      onChange={(e) => setGenere([...genere, e.target.value])}
                    >
                      <option value="">Selecciona un genero</option>
                      {generos.map((e) => (
                        <option>{e.name}</option>
                      ))}
                    </select>

                    <div className="flex flex-wrap px-2 gap-2 mb-5 justify-center w-full">
                      {genere.map((e) => (
                        <div
                          className="bg-red-200 text-red-500 px-3 rounded-full flex items-baseline gap-3"
                          onClick={() => deleteGenere(e)}
                        >
                          {e} <i class="fas fa-times-circle text-black"></i>
                        </div>
                      ))}
                    </div>

                    <label>Url YouTube</label>
                    {
                      <div className="flex items-center gap-5">
                        <input
                          className="p-1 border border-red-500 rounded-xl w-full mb-3 mt-1 pl-3"
                          value={urlYoutube}
                          onChange={(e) => setUrlYoutube(e.target.value)}
                        />

                        {chanelImage && (
                          <div className="rounded-full overflow-hidden border w-14 h-12">
                            <img src={chanelImage} className="w-full h-full" />
                          </div>
                        )}
                      </div>
                    }

                    <label>Url Spotify</label>
                    <input
                      className="p-1 border border-red-500 rounded-xl w-full mb-3 mt-1 pl-3"
                      value={urlSpotify}
                      onChange={(e) => setUrlSpotify(e.target.value)}
                    />

                    <div className="mt-4 flex justify-center">
                      <button
                        type="submit"
                        className="bg-red-500 w-[50%] p-1 rounded-xl font-semibold text-white duration-200 hover:bg-red-800"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalArtista
