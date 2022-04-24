import { doc, getDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../../utils/firebase";

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getProject = async () => {
    const { projectPubKey } = req.query;
    let data:any = await getProjectByAddress(projectPubKey);
    res.status(301).redirect(data.cover)
  }
  getProject();
}

const getProjectByAddress = async (projectPubKey:any) => {
  const docRef = doc(db, "ido-metadata", projectPubKey);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}