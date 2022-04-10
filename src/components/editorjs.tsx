import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useCallback } from "react";
import { sign } from "tweetnacl";
import Snackbar from "node-snackbar"; 

import "node-snackbar/dist/snackbar.min.css";

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
      // onChange: (api: any, event: any) => {
      // },
      // onPaste: (event: any) => {
      //   console.log(event);
      // },
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
        Snackbar.show({
          pos: "bottom-center",
          text: "Content was successfully saved.",
          backgroundColor: "#231f38",
          showAction: false
        });
      })
      .catch((error: any) => {
        // console.log("Saving failed: ", error);
      });
    setSaveState(false);
  };
  
  const signWallet = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn"t connected
      if (!publicKey) throw new Error("Wallet not connected!");
      // `signMessage` will be undefined if the wallet doesn"t support it
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      // Encode anything as bytes
      const message = new TextEncoder().encode("Hello, world!");
      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!sign.detached.verify(message, signature, publicKey.toBytes()))
        throw new Error("Invalid signature!");

      setSaveState(true);
    } 
    catch (error: any) {
      console.log(`Signing failed: ${error?.message}`);
    }
  }, [publicKey, signMessage]);

  return <div id={"editorjs"} />;
};

export default EditorJs;
