import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

const ModalMetrics = ({ isOpen, closeModal, metrics, name }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-[80vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium text-center leading-6 text-gray-900"
                  >
                    Metricas de {name}
                  </Dialog.Title>

                  <div className="flex w-full mt-10 border py-1 rounded-xl bg-red-500 text-white">
                    <p className="w-full text-center">Vistas</p>
                    <p className="w-full text-center">Suscriptores</p>
                    <p className="w-full text-center">Videos</p>
                    <p className="w-full text-center">Fecha</p>
                  </div>

                  {metrics?.length > 0 &&
                    metrics.map((e) => {
                      if (e.date) {
                        const fechaTimestamp = e.date.toDate() // Convertir la marca de tiempo de Firestore a objeto Date

                        // Formatear la fecha como una cadena de texto en el formato deseado
                        const fechaFormateada = fechaTimestamp.toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                        const horaFormateada = fechaTimestamp.toLocaleTimeString('es-ES')

                        return (
                          <div className="flex py-2">
                            <p className="w-full text-center">{e.viewCount}</p>
                            <p className="w-full text-center">{e.subscriberCount}</p>
                            <p className="w-full text-center">{e.videoCount}</p>
                            <p className="w-full text-center">
                              {fechaFormateada}-{horaFormateada}
                            </p>
                          </div>
                        )
                      }
                    })}

                  {/* <div>Suscriptores: {metrics?.subscriberCount}</div>
                  <div>Numero de Videos: {metrics?.videoCount}</div>
                  <div>Numero de Vistas: {metrics?.viewCount}</div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalMetrics
