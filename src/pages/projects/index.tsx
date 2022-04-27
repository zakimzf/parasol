import Container from "../../components/container";
import Heading from "../../components/heading";
import Apply from "../../components/slices/apply";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { RpcHelper } from "parasol-finance-sdk";
import { NftContext } from "../../context/NftContext";
import Head from "next/head";
import { Project } from "../../constants";
import ProjectCard from "../../components/cards/project-card";
import Layout from "../../components/layout";
import { useWallet } from "@solana/wallet-adapter-react";

const Projects = () => {
  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const { provider } = useContext(NftContext);
  const [projects, setProjects] = useState<Project[]>([])
  // const [status, setStatus] = useState<string>("PUBLISHED");

  const filteredProjects = projects
    .filter((e) => e.status === "PUBLISHED")
    .filter((e) => e.endTime > new Date())
    .sort((x: any, y: any) => x.startTime.getTime() - y.startTime.getTime())
    .slice(0, 9);

  const finishedProjects = projects
    .filter((e) => e.status === "FINISHED")
    .slice(0, 9);
    
  const draftProjects = projects
    .filter((e: any) => e.status === "DRAFT")
    .filter((e: any) => e.owner == walletAddress)
    .sort((x: any, y: any) => x.startTime.getTime() - y.startTime.getTime());

  useEffect(() => {
    const getProjects = async () => {
      const helper = new RpcHelper(provider);
      await helper.getProjectList().then((p: any) => setProjects(p))
    }
    getProjects();
  }, [])
  
  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | Projects Seeding</title>
        <meta name="title" content="Parasol Finance ($PSOL) | Projects Seeding"/>
        <meta property="og:image" content="/assets/preview/projects.png"/>
        <meta property="twitter:image" content="/assets/preview/projects.png"/>
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
                    {draftProjects.map((project, index) => (
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
            {projects.length > 0 ? (
              <>
                {filteredProjects.length > 0 ? (
                  <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, index) => (
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
                  <ProjectCard key={key} loading={true}/>
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
                    {finishedProjects.map((project, index) => (
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
