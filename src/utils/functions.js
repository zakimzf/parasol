import { db } from "./firebase";
import { doc, getDoc, } from "firebase/firestore";
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import React from "react";

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

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full mx-6 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-1">
            {iconByType()}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-purple-2 hover:text-purple-1 focus:outline-none focus:ring-2 focus:ring-purple-2">
          Close
        </button>
      </div>
    </div>
  ))
}