import { doc, getDoc } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../utils/firebase";

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getProject = async () => {
    const { projectPubKey, cover } = req.query;
    let data:any = await getProjectByAddress(projectPubKey);
    if (cover == "") res.status(301).redirect(data.projectCover)
    else res.status(200).json(data)
  }
  getProject();
}

const getProjectByAddress = async (projectPubKey:any) => {
  const docRef = doc(db, "ido-metadata", projectPubKey);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}