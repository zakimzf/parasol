import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import { useEffect, useState } from "react";

const EditorJs = () => {
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    let editor_ = null;
    const initEditor = async () => {
      editor_ = await new EditorJS({
        holder: "editorjs",
        // autofocus: true,
        // readOnly: true,
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
        data: {},
        onChange: (api: any, event: any) => {},
      });

      setEditor(editor_);
    };
    initEditor();
  }, []);

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default EditorJs;
