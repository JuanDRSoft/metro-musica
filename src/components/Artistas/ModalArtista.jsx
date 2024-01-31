import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ModalArtista = ({ data, openModal1, setOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [countrie, setCountrie] = useState("");
  const [genere, setGenere] = useState("");
  const [urlYoutube, setUrlYoutube] = useState("");
  const [urlSpotify, setUrlSpotify] = useState("");

  const { handleArtist } = useAuth();

  useEffect(() => {
    if (data?.id) {
      setId(data.id);
      setName(data.name);
      setCountrie(data.countrie);
      setGenere(data.genere);
      setUrlYoutube(data.urlYoutube);
      setUrlSpotify(data.urlSpotify);
    }
  }, [data]);

  function closeModal() {
    if (openModal1) {
      setOpenModal(false);
      setId("");
    } else {
      setIsOpen(false);
      setId("");
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  const initial = () => {
    setId("");
    setName("");
    setCountrie("");
    setGenere("");
    setUrlYoutube("");
    setUrlSpotify("");
    closeModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([name, countrie, genere, urlYoutube, urlSpotify].includes("")) {
      toast.warning("Llena todos los campos");
      return;
    }

    const body = {
      name,
      countrie,
      genere,
      urlSpotify,
      urlYoutube,
    };

    handleArtist(body, initial, id);
  };

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
                    {data?.name ? "Editar Artista" : "Crear Artista"}
                  </Dialog.Title>
                  <form className="mt-5" onSubmit={onSubmit}>
                    <label>Nombre</label>
                    <input
                      className="p-1 border rounded-xl w-full mb-3 mt-1 pl-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <label>Pais</label>
                    <input
                      className="p-1 border rounded-xl w-full mb-3 mt-1 pl-3"
                      value={countrie}
                      onChange={(e) => setCountrie(e.target.value)}
                    />

                    <label>Géneros Musicales</label>
                    <input
                      className="p-1 border rounded-xl w-full mb-3 mt-1 pl-3"
                      value={genere}
                      onChange={(e) => setGenere(e.target.value)}
                    />

                    <label>Url YouTube</label>
                    <input
                      className="p-1 border rounded-xl w-full mb-3 mt-1 pl-3"
                      value={urlYoutube}
                      onChange={(e) => setUrlYoutube(e.target.value)}
                    />

                    <label>Url Spotify</label>
                    <input
                      className="p-1 border rounded-xl w-full mb-3 mt-1 pl-3"
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
  );
};

export default ModalArtista;
