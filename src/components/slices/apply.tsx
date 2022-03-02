import Link from "next/link";
import Button, { ButtonType } from "../button";

const Apply = () => (
  <section className="pt-24 pb-12">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        <span className="block">Want to Launch your Project?</span>
      </h2>
      <p className="mt-5 max-w-prose mx-auto text-gray-300 text-lg">
        You can launch your project in a few clicks and proceed to an IDO.
      </p>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-md shadow">
          <Link href={"/projects/submit"} passHref>
            <Button type={ButtonType.Primary} value={"Apply For IDO"} />
          </Link>
        </div>
        <div className="ml-3 inline-flex">
          <Link href={"/"} passHref>
            <Button type={ButtonType.Secondary} value={"Learn More"} />
          </Link>
        </div>
      </div>
    </div>
  </section>
)

export default Apply;