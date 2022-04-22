import Container from "../../components/container";
import Heading from "../../components/heading";
import Apply from "../../components/slices/apply";
import { useContext, useEffect, useState } from "react";
import { RpcHelper } from "parasol-finance-sdk";
import { NftContext } from "../../context/NftContext";
import ProjectCard from "../../components/cards/project-card";

interface project {
  id: string;
  name: string;
  logo: string;
  description: string;
  cover: string;
  symbol: string;
  startTime: Date;
  endTime: Date;
}

const Projects = () => {
  const { provider } = useContext(NftContext);
  const [projects, setProjects] = useState<project[]>([])

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
                Id={project.id}
                Name={project.name}
                Description={project.description}
                Logo={project.logo}
                Cover={project.cover}
                key={index}
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
