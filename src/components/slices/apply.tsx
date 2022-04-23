import Link from "next/link";

const Apply = () => (
  <section className="pb-12">
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
            <a className={"inline-flex items-center justify-center bg-purple-2 text-white hover:bg-white hover:text-purple-2 px-5 py-3 text-base font-medium rounded-md"}>
              Submit Your Project
            </a>
          </Link>
        </div>
        <div className="ml-3 inline-flex">
          <a href={"https://docs.parasol.finance/"} target={"_blank"} className={"inline-flex items-center justify-center bg-white text-purple-2 hover:bg-purple-2 hover:text-white px-5 py-3 text-base font-medium rounded-md"} rel="noreferrer">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default Apply;