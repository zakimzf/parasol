import Container from "../../components/container";
import Heading from "../../components/heading";
import Apply from "../../components/slices/apply";
import React, { useContext, useEffect, useState } from "react";
import { RpcHelper } from "parasol-finance-sdk";
import { NftContext } from "../../context/NftContext";
import Head from "next/head";
import { Project } from "../../constants";
import ProjectCard from "../../components/cards/project-card";
import Layout from "../../components/layout";

const Projects = () => {
  const { provider } = useContext(NftContext);
  const [projects, setProjects] = useState<Project[]>([])
  const [status, setStatus] = useState<string>("PUBLISHED");
  const filteredProjects = projects
    .filter((e) => e.status === status)
    .slice(0, 9);

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
        <Apply />
      </Layout>
    </>
  )
};

export default Projects;
