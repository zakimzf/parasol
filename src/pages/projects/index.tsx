import React, { useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";

import { RpcHelper } from "parasol-finance-sdk";
import { useWallet } from "@solana/wallet-adapter-react";

import ProjectCard from "components/cards/project-card";
import Container from "components/container";
import Heading from "components/heading";
import Layout from "components/layout";
import Apply from "components/slices/apply";
import { NftContext } from "context/NftContext";
import { useProjectData } from "context/ProjectContext";

const Projects = () => {
  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const { helper } = useContext(NftContext);
  const { projects, setProjects, lastTimestamp, setLastTimestamp } =
    useProjectData();

  if (Date.now() - lastTimestamp > 3600000) {
    (async () => {
      await helper?.getProjectList().then((p: any) => setProjects(p));
      setLastTimestamp(Date.now());
    })();
  }

  const filteredProjects = projects
    .filter((e: any) => e.status === "PUBLISHED")
    .filter((e: any) => e.endTime > new Date())
    .sort((x: any, y: any) => x.startTime.getTime() - y.startTime.getTime())
    .slice(0, 9);

  const finishedProjects = projects
    .filter(
      (e: any) =>
        e.status === "FINISHED" ||
        (e.status === "PUBLISHED" && new Date() > e.endTime)
    )
    .slice(0, 9);

  const draftProjects = projects
    .filter((e: any) => e.status === "DRAFT")
    .filter((e: any) => e.owner == walletAddress)
    .sort((x: any, y: any) => x.startTime.getTime() - y.startTime.getTime());

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | Projects Seeding</title>
        <meta
          name="title"
          content="Parasol Finance ($PSOL) | Projects Seeding"
        />
        <meta property="og:image" content="/assets/preview/projects.png" />
        <meta property="twitter:image" content="/assets/preview/projects.png" />
      </Head>
      <Heading
        tagline={"Parasol Launchpad"}
        title={"Upcoming & Live Projects"}
        description={"Here are all the projects of Parasol Finance."}
      />
      <Layout>
        {draftProjects.length > 0 && (
          <section>
            <Container>
              <div className={"border-b border-gray-800 pb-20"}>
                <div className={"mb-12"}>
                  <a className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    My Projects
                  </a>
                  <p className="mt-1 max-w-prose truncate text-sm text-gray-200 lg:text-base">
                    Find here are your draft projects that you created.
                  </p>
                </div>
                {draftProjects.length > 0 && (
                  <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:grid-cols-3">
                    {draftProjects.map((project: any, index: any) => (
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
                        salePrice={project.salePrice}
                        isFeatured={project.isFeatured}
                        hardCap={project.hardCap}
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
                  <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project: any, index: any) => (
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
                        salePrice={project.salePrice}
                        isFeatured={project.isFeatured}
                        hardCap={project.hardCap}
                      />
                    ))}
                  </div>
                ) : (
                  <h1 className={"py-12 text-center font-medium text-gray-300"}>
                    There is no IDO corresponding to these criteria.
                  </h1>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((key) => (
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
                  <a className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Finished IDOs
                  </a>
                  <p className="mt-1 max-w-prose truncate text-sm text-gray-200 lg:text-base">
                    Find here all the finished IDOS, you can claim your tokens
                    if you have participated.
                  </p>
                </div>
                {finishedProjects.length > 0 && (
                  <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:grid-cols-3">
                    {finishedProjects.map((project: any, index: any) => (
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
                        salePrice={project.salePrice}
                        isFeatured={project.isFeatured}
                        hardCap={project.hardCap}
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
  );
};

export default Projects;
