import { db } from "./firebase";
import { doc, getDoc, } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { XIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => cb(reader.result);
  reader.onerror = error => console.log("Error: ", error);
}

export const validURL = (str) => {
  const pattern = new RegExp("^(https?:\\/\\/)?" +
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$", "i");
  return !!pattern.test(str);
}

export const isTokenAddressExist = async (id) => {
  const docRef = doc(db, "idos", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export const errClasses = ["border-red-600", "text-red-600", "placeholder-red-600", "focus:outline-none", "focus:ring-red-600", "border-2", "focus:border-red-600", "sm:text-sm"];

export const notification = (type, message, title = "") => {
  function iconByType () {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-green-400" />
      case "warning":
        return <ExclamationIcon className="h-6 w-6 text-orange-400" />
      case "danger":
        return <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
      case "info":
        return <InformationCircleIcon className="h-6 w-6 text-blue-400" />
    }
  }

  const hideNotif = (t, click = 1) => {
    toast.dismiss(t.id)
    t.visible = false;
    document.getElementById("notifId").classList.add("opacity-0");
  }

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      id="notifId"
    >
      <div
        aria-live="assertive"
        className="sticky top-0 bg-red-600 w-full z-50 pointer-events-none">
        <div className={"absolute w-full h-screen p-6"}>
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            <Transition
              show={true}
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
                        onClick={() => hideNotif(t)}>
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
    </div>
  ))
}