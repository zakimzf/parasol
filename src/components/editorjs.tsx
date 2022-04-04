import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import { useEffect, useState } from "react";

interface props {
  isOwner: boolean;
  content: any;
}

const EditorJs: React.FC<props> = ({ isOwner, content }) => {
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
            inlineToolbar: false,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
          table: Table,
        },
        data: content,
        onChange: (api: any, event: any) => {
          editor_
            .save()
            .then((outputData: any) => {
              console.log(outputData);
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
