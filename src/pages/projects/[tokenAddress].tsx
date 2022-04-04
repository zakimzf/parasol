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
const EditorJs = dynamic(() => import("../../components/editorjs"), {
  ssr: false,
});

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

  return (
    <section className="pt-6">
      {ido ? (
        <Container>
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
              </SRLWrapper>
              <EditorJs
                content={ido.content || "{}"}
                isOwner={true}
                tokenAddress={tokenAddress}
              />
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
