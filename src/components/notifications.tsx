import React, { Fragment, useState } from "react"
import { Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/solid"
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon } from "@heroicons/react/outline";

export enum NotificationType {
  Information,
  Success,
  Warning,
  Danger,
}

interface NotificationProps {
  type: NotificationType;
  title: String;
  message: String;
}

const Notification: React.FC<NotificationProps> = ({ type, title, message }: NotificationProps) => {
  const [show, setShow] = useState(true);

  function iconByType () {
    switch (type) {
      case NotificationType.Success:
        return <CheckCircleIcon className="h-6 w-6 text-green-400" />
      case NotificationType.Warning:
        return <ExclamationIcon className="h-6 w-6 text-orange-400" />
      case NotificationType.Danger:
        return <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
      case NotificationType.Information:
        return <InformationCircleIcon className="h-6 w-6 text-blue-400" />
    }
  }
  return (
    <>
      <div
        aria-live="assertive"
        className="sticky top-0 bg-red-600 w-full z-50 pointer-events-none">
        <div className={"absolute w-full h-screen p-6"}>
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            <Transition
              show={show}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      {iconByType()}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">{title}</p>
                      <p className="mt-1 text-sm text-gray-500">{message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShow(false)
                        }}>
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification;