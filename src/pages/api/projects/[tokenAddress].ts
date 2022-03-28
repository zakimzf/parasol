import { doc, getDoc } from "firebase/firestore";
import type {NextApiRequest, NextApiResponse} from "next"
import { db } from "../../../utils/firebase";

type Data = {
  name: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const getProject = async()=>{
    const {tokenAddress} = req.query;
  
    const data:any = await getProjectByAddress(tokenAddress);
    res.status(200).json(data)
  }
  getProject();
}

const getProjectByAddress = async(tokenAddress:any) => {

  const docRef = doc(db, "idos", tokenAddress);
  const docSnap = await getDoc(docRef);

  return docSnap.data();

}