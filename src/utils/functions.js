import { db } from "./firebase";
import { doc, getDoc, } from "firebase/firestore";
import { toast } from "react-nextjs-toast"

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
  // success error info 
  toast.notify(message, {
    duration: 5,
    type: type,
    title: title
  })
}