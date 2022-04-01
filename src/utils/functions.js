import { db } from "./firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}


export const validURL = (str) => {
  const pattern = new RegExp("^(https?:\\/\\/)?"+ // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"+ // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
    "(\\#[-a-z\\d_]*)?$","i"); // fragment locator
  return !!pattern.test(str);
}

export const isTokenAddressExist = async (id)=>{
  
  const docRef = doc(db, "idos", id);
  const docSnap = await getDoc(docRef);
  
  return docSnap.exists();
}

export const errClasses = ["border-red-600", "text-red-600", "placeholder-red-600", "focus:outline-none", "focus:ring-red-600", "border-2", "focus:border-red-600", "sm:text-sm"];