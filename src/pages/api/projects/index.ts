import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../utils/firebase";

type Data = {
  name: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const getProject = async()=>{
    const { tokenAddress } = req.query;
  
    const data:any = await getAllProjects();
    res.status(200).json(data)
  }
  getProject();
}

const getAllProjects = async() => {

  const idosCollectionRef = collection(db, "idos");
  const data = await getDocs(idosCollectionRef);
  const projects = await data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
  return projects;

}