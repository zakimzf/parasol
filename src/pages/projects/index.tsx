import Container from "../../components/container";
import Heading from "../../components/heading";
import Apply from "../../components/slices/apply";
import React, { useContext, useEffect, useState } from "react";
import { RpcHelper } from "parasol-finance-sdk";
import { NftContext } from "../../context/NftContext";
import ProjectCard from "../../components/cards/project-card";
import Head from "next/head";
import { Project } from "../../constants";
import Layout from "../../components/layout";

const Projects = () => {
  const { provider } = useContext(NftContext);
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const getProjects = async () => {
      const helper = new RpcHelper(provider);
      await helper.getProjectList().then((p: any) => setProjects(p))
    }
    getProjects();
  }, [])
  console.log(projects)
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
      <section>
        <Container>
          <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
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
        </Container>
      </section>
      <Apply />
    </>
  )
};

export default Projects;
