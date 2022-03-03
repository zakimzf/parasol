import Image from "next/image";

import styles from "./main.module.css"

let logo = require("./assets/logo-min.png");
let parasol = require("./assets/logo_p-min.png");
let token = require("./assets/logo_q-min.png");

const FloatingParasol = () => (
  <div className="w-full absolute-aspect-square relative -mt-12 -mr-3">
    <div className={styles.logo}>
      <Image src={logo} alt="logo" />
    </div>
    <div className={styles.parasol}>
      <Image src={parasol} alt="parasol" />
    </div>
    <div className={styles.token}>
      <Image src={token} alt="token" />
    </div>
    {/*<div className="flex absolute transition-all opacity-0 hover:opacity-100 duration-500 justify-center items-center hover:backdrop-blur cursor-pointer w-full h-full z-10">*/}
    {/*	<button className="inline-flex items-center px-4 py-2 gap-x-2 text-base font-medium uppercase text-sm bg-opacity-30 rounded-md bg-black text-white">*/}
    {/*		Apply for IDO*/}
    {/*	</button>*/}
    {/*</div>*/}
  </div>)

export default FloatingParasol;
