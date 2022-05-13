import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage";
import { useWallet } from "@solana/wallet-adapter-react";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import { sign } from "tweetnacl";
import { doc, updateDoc } from "firebase/firestore";

import { db, storage } from "utils/firebase";
import { notification, slugify } from "utils/functions";

import "node-snackbar/dist/snackbar.min.css";

const Quote = require("@editorjs/quote");

interface props {
  projectPubKey: any;
  content: any;
  isOwner?: boolean;
  oldCover?: string;
  isCoverUpdated?: boolean;
  coverFile?: any;
  loading?: boolean;
  setLoading?: any;
}

const EditorJs: React.FC<props> = ({ projectPubKey, isOwner, content, oldCover, isCoverUpdated, coverFile, loading, setLoading }) => {
  const idosCollectionRef: any = doc(db, "ido-metadata", projectPubKey);
  const [editor, setEditor] = useState<any>(null);

  const { publicKey, signMessage } = useWallet();

  const [editorContent, setEditorContent] = useState(JSON.parse(content));
  const [imagesToRemove, setImagesToRemove] = useState<any>([]);

  const blocksArray = JSON.parse(content).blocks;

  useEffect(() => {
    if (editor) editor.destroy();

    if (editorContent.blocks) {
      editorContent.blocks.map(async (block: any, index: number) => {
        if ((await block.type) == "image") {
          await axios.get(block.data.file.url).catch(function (error) {
            if (error.response) {
              delete editorContent.blocks[index];
            }
          });
        }
      });
      setEditorContent(editorContent);
    }

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
          config: {
            defaultLevel: 2
          },
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
              uploadByFile (file: File) {
                const dateTime = new Date().getTime();
                return new Promise((resolve, reject) => {
                  const storageRef = ref(
                    storage,
                    `projects/${projectPubKey}/editor/${dateTime + file.name}`
                  );

                  const task = uploadBytesResumable(storageRef, file);
                  task.on("state_changed", function complete () {
                    getDownloadURL(task.snapshot.ref).then(
                      (coverUrl: string) => {
                        resolve({
                          success: 1,
                          file: {
                            url: coverUrl,
                          },
                        });
                      }
                    );
                  });
                });
              },
            },
          },
        },
      },
      onChange: (api: any, event: any) => {
        if (event.type == "block-removed") {
          const index = event.detail.index;
          if (blocksArray && blocksArray[index].type == "image") {
            const url = blocksArray[index].data.file.url;
            setImagesToRemove((preValue: Array<string>) => [...preValue, url]);
            blocksArray.splice(index, 1);
          }
        }
      },
      onReady: () => {
        var headers = document.getElementsByClassName("ce-header");
        for (var i = 0; i < headers.length; i++) {
          headers[i].setAttribute("id", slugify(headers[i].innerHTML));
        }
      },
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
    if (loading) saveChanges();
  }, [loading]);

  const changeCover = async () => {
    if (isCoverUpdated) {
      const storageRef = ref(storage, `projects/${projectPubKey}/${coverFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, coverFile);
      await uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => notification("danger", "Unable to save your cover.", "Update IDO"),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (cover) => {
            await updateDoc(idosCollectionRef, {
              cover,
            });
            const imgRef: any = ref(storage, oldCover);
            deleteObject(imgRef)
            notification(
              "success",
              "Cover was successfully saved.",
              "Update IDO"
            );
            setLoading(false);
          });
        }
      );
    }
  }

  const saveChanges = async () => {
    try {
      await changeCover();
      await editor
        .save()
        .then(async (outputData: any) => {
          imagesToRemove.map((url: string) => {
            const imgRef: any = ref(storage, url);
            deleteObject(imgRef)
          });
          await updateDoc(idosCollectionRef, {
            content: JSON.stringify(outputData),
          });
          notification(
            "success",
            "Content was successfully saved.",
            "Update IDO"
          );
        })
        .catch((error: any) => {
          notification("danger", "Unable to save your content.", "Update IDO");
        });

      if (!isCoverUpdated) setLoading(false);
    }
    catch (error) {
      setLoading(false);
      notification(
        "danger",
        "Unable to save your changes.",
        "Update IDO"
      );
    }
  };

  const signWallet = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) throw new Error("Wallet not connected!");
      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage)
        throw new Error("Wallet does not support message signing!");

      // Encode anything as bytes
      const message = new TextEncoder().encode(
        "I agree to change the details of this IDO."
      );
      // Sign the bytes using the wallet
      const signature = await signMessage(message);
      // Verify that the bytes were signed using the private key that matches the known public key
      if (!sign.detached.verify(message, signature, publicKey.toBytes()))
        throw new Error("Invalid signature!");

      setLoading(true);
    }
    catch (error: any) {
      notification(
        "danger",
        "Unable to sign the transaction.",
        "Transaction Error"
      );
    }
  }, [publicKey, signMessage]);

  return <div id={"editorjs"} />;
};

export default EditorJs;
