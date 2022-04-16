import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import React, { useCallback, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import { useWallet } from "@solana/wallet-adapter-react";
import { sign } from "tweetnacl";

import "node-snackbar/dist/snackbar.min.css";
import { notification } from "../utils/functions";
import ImageTool from "@editorjs/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";

const Quote = require("@editorjs/quote");

interface props {
  tokenAddress: any;
  isOwner: boolean;
  content: any;
}

const EditorJs: React.FC<props> = ({ tokenAddress, isOwner, content }) => {
  const idosCollectionRef: any = doc(db, "idos", tokenAddress);
  const [editor, setEditor] = useState<any>(null);
  const [saveState, setSaveState] = useState(false);

  const { publicKey, signMessage } = useWallet();

  const [editorContent, setEditorContent] = useState(JSON.parse(content));

  useEffect(() => {
    if (editor) editor.destroy();

    editorContent.blocks.map( async (block: any, index: number) => {
      if (await block.type == "image") {
        await axios.get(block.data.file.url).catch(function (error) {
          if (error.response) {
            delete editorContent.blocks[index];
          }
        });
      }
    })
    setEditorContent(editorContent);

    initEditor();
  }, [isOwner]);

  const initEditor = async () => {
    let editor_: any = null;
    editor_ = await new EditorJS({
      holder: "editorjs",
      readOnly: !isOwner,
      placeholder: "Please enter your content here...",
      minHeight: 0,
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
        quote: Quote,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile (file : File) {
                const dateTime = new Date().getTime();
                return new Promise((resolve, reject) => {
                  const storageRef = ref(storage, `projects/${tokenAddress}/editor/${dateTime + file.name}`);

                  const task = uploadBytesResumable(storageRef, file);
                  task.on(
                    "state_changed",
                    function complete () {
                      getDownloadURL(task.snapshot.ref).then((coverUrl: string) => {
                        resolve({
                          success: 1,
                          file: {
                            url: coverUrl
                          }
                        });
                      });
                    }
                  );
                })
              }
            }
          }
        },
      },
      // onChange: (api: any, event: any)  => {
      //   console.log(api)
      // },
      data: editorContent,
    });
    setEditor(editor_);
  };

  useEffect(() => {
    const btn = document.getElementById("saveEditor");
    if (editor && btn) {
      btn.addEventListener("click", () => {
        signWallet();
      });
    }
  }, [editor]);

  useEffect(() => {
    if (saveState) saveChanges();
  }, [saveState]);

  const saveChanges = async () => {
    await editor
      .save()
      .then(async (outputData: any) => {
        await updateDoc(idosCollectionRef, {
          content: JSON.stringify(outputData),
        });
        notification("success", "Content was successfully saved.", "Update IDO")
      })
      .catch((error: any) => {
        notification("danger", "Unable to save your changes.", "Update IDO")
      });
    setSaveState(false);
  };

  const signWallet = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) throw new Error("Wallet not connected!");
      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      // Encode anything as bytes
      const message = new TextEncoder().encode("I agree to change the details of this IDO.");
      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!sign.detached.verify(message, signature, publicKey.toBytes()))
        throw new Error("Invalid signature!");

      setSaveState(true);
    } 
    catch (error: any) {
      notification("danger", "Unable to sign the transaction.", "Transaction Error");
    }
  }, [publicKey, signMessage]);

  return <div id={"editorjs"} />;
};

export default EditorJs;
