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
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    if (editor) editor.destroy();
    initEditor();
  }, [isOwner]);

  const initEditor = async () => {
    let editor_: any = null;
    editor_ = await new EditorJS({
      holder: "editorjs",
      // autofocus: true,
      readOnly: !isOwner,
      placeholder: "Please enter your content here...",
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
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
        if (editor_) {
          editor_
            .save()
            .then(async (outputData: any) => {
              console.log(outputData)
              await updateDoc(idosCollectionRef, {
                content: JSON.stringify(outputData),
              });
            })
            .catch((error: any) => {
              console.log("Saving failed: ", error);
            });
        }
      },
      onPaste: (event: any) => {
        console.log(event, 44444444);
      },
    });
    setEditor(editor_);
  };

  return (
    <div className={(isOwner && "bg-[#231f38] p-4") || ""}>
      <div id="editorjs"></div>
    </div>
  );
};

export default EditorJs;
