import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import { useEffect, useState } from "react";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

interface props {
  tokenAddress: any;
  isOwner: boolean;
  content: any;
}

const EditorJs: React.FC<props> = ({ tokenAddress, isOwner, content }) => {
  const idosCollectionRef: any = doc(db, "idos", tokenAddress);

  useEffect(() => {
    let editor_: any = null;
    const initEditor = async () => {
      editor_ = await new EditorJS({
        holder: "editorjs",
        // autofocus: true,
        readOnly: !isOwner,
        placeholder: "Please enter your content here...",
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["marker", "link"],
          },
          list: {
            class: List,
            inlineToolbar: ["link", "bold"],
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
          table: Table,
        },
        data: JSON.parse(content),
        onChange: (api: any, event: any) => {
          editor_
            .save()
            .then(async (outputData: any) => {
              await updateDoc(idosCollectionRef, {
                content: JSON.stringify(outputData),
              });
            })
            .catch((error: any) => {
              console.log("Saving failed: ", error);
            });
        },
      });
    };
    initEditor();
  }, []);

  return (
    <div className="bg-[#231f38] p-4">
      <div id="editorjs"></div>
    </div>
  );
};

export default EditorJs;
