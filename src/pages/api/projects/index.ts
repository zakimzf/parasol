import { collection, getDocs } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../utils/firebase";

type Data = {
  name: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: any = await getAllProjects();
  res.status(200).json(data)
}

const getAllProjects = async () => {
  const idosCollectionRef = collection(db, "idos");
  const data = await getDocs(idosCollectionRef);
  return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
}