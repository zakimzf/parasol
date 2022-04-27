import Link from "next/link";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

const Apply = () => (
  <section className="py-6 lg:pt-0 lg:pb-12">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        <span className="block">Want to Launch your Project?</span>
      </h2>
      <p className="mt-5 max-w-prose mx-auto text-gray-300 text-lg">
        You can launch your project in a few clicks and proceed to an IDO.
      </p>
      <div className="mt-8 flex justify-center gap-x-3">
        <Link href={"/projects/submit"} passHref>
          <a className={"button text-base !bg-none bg-purple-2"}>
            <PaperAirplaneIcon className={"w-5 h-5"} />
            <span className={"lg:hidden"}>Submit Project</span>
            <span className={"hidden lg:block"}>Submit Your Project</span>
          </a>
        </Link>
        <a href={"https://docs.parasol.finance/"} target={"_blank"} className={"button text-base"} rel="noreferrer">
            Learn More
        </a>
      </div>
    </div>
  </section>
)

export default Apply;