import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const EditorJs = () => {
  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: "editorjs",

    /**
     * Available Tools list.
     * Pass Tool"s class or Settings object for each Tool you want to use
     */
    tools: {
      header: {
        class: Header,
        inlineToolbar: ["link"],
        shortcut: "CMD+SHIFT+H",
      },
      list: {
        class: List,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+L",
      },
    },
  });

  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default EditorJs;
