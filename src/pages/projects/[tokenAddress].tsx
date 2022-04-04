import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { SRLWrapper } from "simple-react-lightbox";
import Markdown from "markdown-to-jsx";

import Container from "../../components/container";
import axios from "axios";
import NumberFormat from "react-number-format";
import dynamic from "next/dynamic";

// const Editor = dynamic(() => import("../../components/editor"), { ssr: false });
const EditorJs = dynamic(() => import("../../components/editorJs"), { ssr: false });

const markdown = `

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
`;

const ProjectDetails = () => {
  const router = useRouter();

  const { tokenAddress } = router.query;

  const [ido, setIdo] = useState<any>(null);

  useEffect(() => {
    const getDataByTokenAddress = async () => {
      const { data }: any = await axios.get(`/api/projects/${tokenAddress}`);
      if (data) setIdo(data);
      else router.push("/404");
    };
    if (tokenAddress) getDataByTokenAddress();
  }, [tokenAddress]);

  const [value, setValue] = useState<any>("**Hello world!!!**");

  return (
    <section className="pt-6">
      {ido ? (
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
                <img
                  className="rounded-full h-16 mb-2 m-0"
                  src={ido.projectIcon}
                  alt=""
                />
                <div>
                  <h1 className="text-4xl mb-0">{ido.projectName}</h1>
                  <p className={"my-2 font-semibold"}>
                    We bring new technologies to our community.
                  </p>
                </div>
              </div>

              <SRLWrapper>
                <Markdown
                  options={{
                    overrides: {
                      img: {
                        props: {
                          className:
                            "rounded-lg cursor-pointer ease transition-transform duration-300 hover:scale-105",
                        },
                      },
                    },
                  }}
                >
                  {`![](${ido.projectCover})`}
                </Markdown>
                {/* <Markdown
                  options={{
                    overrides: {
                      img: {
                        props: {
                          className:
                            "rounded-lg cursor-pointer ease transition-transform duration-300 hover:scale-105",
                        },
                      },
                    },
                  }}
                >
                  {markdown}
                </Markdown> */}
              </SRLWrapper>
              <EditorJs />
            </div>
            <div className="col-span-3">
              <div className="sticky flex flex-col gap-y-6 top-20">
                <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
                  <div className={"relative px-6 pt-6 pb-6"}>
                    <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                      {ido.projectName}
                      {ido.isFeatured && (
                        <BadgeCheckIcon className={"h-7 text-purple-2"} />
                      )}
                    </h2>
                    <div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
                      <img
                        className="h-8"
                        src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                        alt="USDC"
                      />
                      <div className="flex items-end gap-x-2 text-4xl font-bold">
                        <NumberFormat
                          value={ido.hardCap}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span>USDC</span>
                      </div>
                    </div>
                    <div className="prose prose-lg prose-invert">
                      <p>{ido.description}</p>
                    </div>
                    <div className="flex-col space-y-3 mt-6">
                      <div className="flex font-medium items-center text-gray-300 gap-x-3">
                        <span>Hard Cap</span>
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                        <span>
                          <NumberFormat
                            value={ido.hardCap}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </div>
                      <div className="flex font-medium items-center text-gray-300 gap-x-3">
                        <span>Price per Token</span>
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                        <span>
                          <NumberFormat
                            value={ido.tokenPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </div>
                    </div>
                    <button
                      className={
                        "w-full mt-8 bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"
                      }
                    >
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
      ) : (
        ""
      )}
    </section>
  );
};

export default ProjectDetails;
