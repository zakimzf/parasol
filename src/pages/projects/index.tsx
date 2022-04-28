import Container from "../../components/container";
import Heading from "../../components/heading";
import Apply from "../../components/slices/apply";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { NftStore, Project as ProjectD, RpcHelper } from "parasol-finance-sdk";
import { NftContext } from "../../context/NftContext";
import Head from "next/head";
import { Project } from "../../constants";
import ProjectCard from "../../components/cards/project-card";
import Layout from "../../components/layout";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Wallet } from "@jup-ag/lifinity-sdk/node_modules/@project-serum/anchor";

const Projects = () => {
  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const { provider, config, wallet } = useContext(NftContext);
  const [projects, setProjects] = useState<any[]>([])
  const [isReady, setIsReady] = useState(false)
  // const [status, setStatus] = useState<string>("PUBLISHED");
  const [filteredProjects, setFilteredProjects] = useState<any>([])
  const [finishedProjects, setFinishedProjects] = useState<any>([])
  const [draftProjects, setDraftProjects] = useState<any>([])

  useEffect(() => {
    if (isReady) {
      setFilteredProjects(projects
        .filter((e) => e.status === "PUBLISHED")
        .filter((e) => e.endTime > new Date())
        .sort((x: any, y: any) => x.startTime.getTime() - y.startTime.getTime())
        .slice(0, 9));

      setFinishedProjects(projects
        .filter((e) => e.status === "FINISHED")
        .slice(0, 9));

      setDraftProjects(projects
        .filter((e: any) => e.status === "DRAFT")
        .filter((e: any) => e.owner == walletAddress)
        .sort((x: any, y: any) => x.startTime.getTime() - y.startTime.getTime()));
    }
  }, [isReady, wallet.connected])

  useEffect(() => {
    const getProjects = async () => {
      const helper = new RpcHelper(provider);
      await helper.getProjectList().then((p: any) => setProjects(p))
      setIsReady(false)
    }
    getProjects();
  }, [])

  useEffect(() => {
    const getProjectDetails = () => {
      let projects_: any = []
      projects.map(async (p: any, index) => {
        const nftStore = await new NftStore(provider, config).build();
        const project = await new ProjectD(provider, nftStore, new PublicKey(p.id)).build();
        const projectDetails = await project.data();
        p.details = projectDetails;
        await projects_.push(p)
        if (projects.length == index + 1) {
          console.log(projects_)
          setProjects(projects_)
          setIsReady(true)
        }
      })
    }
    if (projects.length > 0 && !isReady) {
      try {
        getProjectDetails();
      }
      catch (err) {
        setIsReady(true);
      }
    }
  }, [projects])

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | Projects Seeding</title>
        <meta name="title" content="Parasol Finance ($PSOL) | Projects Seeding" />
        <meta property="og:image" content="/assets/preview/projects.png" />
        <meta property="twitter:image" content="/assets/preview/projects.png" />
      </Head>
      <Heading
        tagline={"Parasol Launchpad"}
        title={"Upcoming Projects"}
        description={
          "There is the list of the next IDOs and projects on Parasol."
        }
      />
      <Layout>
        {draftProjects.length > 0 && (
          <section>
            <Container>
              <div className={"border-b border-gray-800 pb-20"}>
                <div className={"mb-12"}>
                  <a className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    My Projects
                  </a>
                  <p className="truncate mt-1 max-w-prose text-sm lg:text-base text-gray-200">
                    Find here are your draft projects that you created.
                  </p>
                </div>
                {draftProjects.length > 0 && (
                  <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
                    {draftProjects.map((project: any, index: number) => (
                      <ProjectCard
                        key={index}
                        id={project.id}
                        name={project.name}
                        description={project.description}
                        logo={project.logo}
                        cover={project.cover}
                        status={project.status}
                        startTime={project.startTime}
                        endTime={project.endTime}
                        price={project.details.salePrice}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Container>
          </section>
        )}
        <section>
          <Container>
            {isReady && projects.length > 0 ? (
              <>
                {filteredProjects.length > 0 ? (
                  <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project: any, index: number) => (
                      <ProjectCard
                        key={index}
                        id={project.id}
                        name={project.name}
                        description={project.description}
                        logo={project.logo}
                        cover={project.cover}
                        status={project.status}
                        startTime={project.startTime}
                        endTime={project.endTime}
                        price={project.details.salePrice}
                      />
                    ))}
                  </div>
                ) : (
                  <h1 className={"py-12 font-medium text-gray-300 text-center"}>There is no IDO corresponding to these criteria.</h1>
                )}
              </>
            ) : (
              <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map(key => (
                  <ProjectCard key={key} loading={true} />
                ))}
              </div>
            )}
          </Container>
        </section>
        <section>
          <Container>
            {finishedProjects.length > 0 && (
              <>
                <div className={"mb-12"}>
                  <a className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    Finished IDOs
                  </a>
                  <p className="truncate mt-1 max-w-prose text-sm lg:text-base text-gray-200">
                    Find here all the finished IDOS, you can claim your tokens if you have participated.
                  </p>
                </div>
                {finishedProjects.length > 0 && (
                  <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
                    {finishedProjects.map((project: any, index: number) => (
                      <ProjectCard
                        key={index}
                        id={project.id}
                        name={project.name}
                        description={project.description}
                        logo={project.logo}
                        cover={project.cover}
                        status={project.status}
                        startTime={project.startTime}
                        endTime={project.endTime}
                        price={project.details.salePrice}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </Container>
        </section>
        <Apply />
      </Layout>
    </>
  )
};

export default Projects;
