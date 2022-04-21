import Container from "../../components/container";
import Heading from "../../components/heading";
import Apply from "../../components/slices/apply";

const Projects = () => (
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
          {/*{projects.map((project, index) => (*/}
          {/*  <ProjectCard*/}
          {/*    Id={project.id}*/}
          {/*    Name={project.name}*/}
          {/*    Description={project.description}*/}
          {/*    Logo={project.logo}*/}
          {/*    Cover={project.cover}*/}
          {/*    key={index}*/}
          {/*  />*/}
          {/*))}*/}
        </div>
      </Container>
    </section>
    <Apply />
  </>
);

export default Projects;
