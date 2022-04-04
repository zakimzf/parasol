import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";

const Editor = () => {
    return (
        <div className="border-2">
            <CKEditor
                editor={ InlineEditor }
                data="project description"
                onReady={ (editor:any) => {
                    // You can store the "editor" and use when it is needed.
                    console.log( "Editor is ready to use!", editor );
                } }
                onChange={ ( event:any, editor :any) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event:any, editor:any ) => {
                    console.log( "Blur.", editor );
                } }
                onFocus={ ( event:any, editor:any ) => {
                    console.log( "Focus.", editor );
                } }
            />
        </div>
    );
}

export default Editor;
