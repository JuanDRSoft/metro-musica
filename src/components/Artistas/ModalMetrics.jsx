import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

const ModalMetrics = ({ isOpen, closeModal, metrics }) => {
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium text-center leading-6 text-gray-900"
                  >
                    {'Metricas'}
                  </Dialog.Title>

                  <div>Suscriptores: {metrics.subscriberCount}</div>
                  <div>Numero de Videos: {metrics.videoCount}</div>
                  <div>Numero de Vistas: {metrics.viewCount}</div>
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
