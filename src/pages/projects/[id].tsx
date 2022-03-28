import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { SRLWrapper } from "simple-react-lightbox";
import Markdown from "markdown-to-jsx";

import Container from "../../components/container";

const project =
{
  id: "flippies",
  name: "Orion Money",
  description: "Thetan Arena is an esport game based on blockchain technology",
  logo: "https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h",
  cover: "https://storage.googleapis.com/polkastarter-production-assets/nfy5nnqh2v55q1dbfcynrqeipzcb"
};

const Logo = require("/public/images/team/Anthony.png")

const markdown = `![](https://storage.googleapis.com/polkastarter-production-assets/h3bth4ctn32w62tmrk7a9cewyxn8)

Sagittis scelerisque nulla cursus in enim consectetur quam.

Faucibus commodo massa rhoncus, volutpat. **Dignissim** sed **eget risus enim**. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. [Mattis mauris semper](#) sed amet vitae sed turpis id.

*   Quis elit egestas venenatis mattis dignissim.
*   Cras cras lobortis vitae vivamus ultricies facilisis tempus.
*   Orci in sit morbi dignissim metus diam arcu pretium.

Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit viverra aliquam porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut nisl, justo, amet, mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed elit interdum dignissim.

From beginner to expert in 30 days
----------------------------------

Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.

> Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.

Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.

Everything you need to get up and running
-----------------------------------------

Purus morbi dignissim senectus mattis [adipiscing](#). Amet, massa quam varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.

Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
`

const renderers = {
  //This custom renderer changes how images are rendered
  //we use it to constrain the max width of an image to its container
  image: ({
    alt,
    src,
    title,
  }: {
		alt?: string;
		src?: string;
		title?: string;
	}) => (
    <img
      alt={alt}
      src={src as any}
      title={title} />
  ),
};

let amount = 300000;

const ProjectDetails = () => {
  const router = useRouter()
  
  const {id} = router.query;
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nutanbhogendrasharma/")
    // 	.then(res => res.json())
    // 	.then(
    // 		(data) => {
    // 			setIsLoaded(true);
    // 			setBlogs(data.items);
    // 		},
    // 		(error) => {
    // 			setIsLoaded(true);
    // 			setError(error);
    // 		}
    // 	)
  }, [])

  return <section className="pt-6">
    <Container>
      {/*<nav className="flex mb-8" aria-label="Breadcrumb">*/}
      {/*	<ol role="list" className="flex items-center space-x-4">*/}
      {/*		<li>*/}
      {/*			<div className="flex items-center">*/}
      {/*				<Link href={"/projects"}>*/}
      {/*					<a className=" text-sm font-medium text-gray-300 hover:text-white">Projects</a>*/}
      {/*				</Link>*/}
      {/*			</div>*/}
      {/*		</li>*/}
      {/*		<li>*/}
      {/*			<div className="flex items-center">*/}
      {/*				<svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">*/}
      {/*					<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />*/}
      {/*				</svg>*/}
      {/*				<a href="#" className="ml-4 text-sm font-medium text-gray-300 hover:text-white" aria-current="page">Project*/}
      {/*					Nero*/}
      {/*				</a>*/}
      {/*			</div>*/}
      {/*		</li>*/}
      {/*	</ol>*/}
      {/*</nav>*/}
      <div className="grid grid-cols-9">
        <div className="prose markdown prose-lg prose-invert col-span-6">
          <div className="flex items-center gap-x-6">
            <img className="rounded-full h-16 mb-2 m-0" src="https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h" alt="" />
            <div>
              <h1 className="text-4xl mb-0">Mecha Morphing</h1>
              <p className={"my-2 font-semibold"}>We bring new technologies to our community.</p>
            </div>
          </div>
          <SRLWrapper>
            <Markdown options={{
              overrides: {
                img: {
                  props: {
                    className: "rounded-lg cursor-pointer ease transition-transform duration-300 hover:scale-105",
                  }
                }
              }
            }}>{markdown}</Markdown>
          </SRLWrapper>
        </div>
        <div className="col-span-3">
          <div className="sticky flex flex-col gap-y-6 top-20">
            <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
              <div className={"relative px-6 pt-6 pb-6"}>
                <h2 className="flex gap-x-2 items-center text-2xl font-bold">
									Mecha Morphing
                  <BadgeCheckIcon className={"h-7 text-purple-2"} />
                </h2>
                <div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
                  <img className="h-8" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
                  <div className="flex items-end gap-x-2 text-4xl font-bold">
                    { amount.toLocaleString("en-US", {minimumFractionDigits: 0}) }
                    <span>USDC</span>
                  </div>
                </div>
                <div className="prose prose-lg prose-invert">
                  <p>The allowlist for Orbitau is now available and you can apply for it below.</p>
                  <p>Note that you need to have at least 250 POLS Power to qualify for this allowlist.
										Learn more.
                  </p>
                </div>
                <div className="flex-col space-y-3 mt-6">
                  <div className="flex font-medium items-center text-gray-300 gap-x-3">
                    <span>Hard Cap</span>
                    <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                    <span>$500,000</span>
                  </div>
                  <div className="flex font-medium items-center text-gray-300 gap-x-3">
                    <span>Price per Token</span>
                    <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                    <span>$0.21</span>
                  </div>
                </div>
                <button className={"w-full mt-8 bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"}>
									Participate to Sale
                </button>
              </div>
            </div>
            {/*<div className={"flex gap-x-6"}>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaFacebookF size={25} />*/}
            {/*	</button>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaTwitter size={25} />*/}
            {/*	</button>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaTelegramPlane size={25} />*/}
            {/*	</button>*/}
            {/*	<button className={"flex-1 bg-[#231f38] flex justify-center shadow-half-strong border border-gray-800 rounded-lg p-6"}>*/}
            {/*		<FaDiscord size={25} />*/}
            {/*	</button>*/}
            {/*</div>*/}
            {/*<button className={"bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg px-5 py-4 text-lg font-medium rounded-lg"}>*/}
            {/*	Apply Now*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    </Container>
  </section>
}

export default ProjectDetails;
