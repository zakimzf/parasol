import Container from "../../components/container";
import Heading from "../../components/heading";
import Apply from "../../components/slices/apply";
import { useContext, useEffect, useState } from "react";
import { RpcHelper } from "parasol-finance-sdk";
import { NftContext } from "../../context/NftContext";
import ProjectCard from "../../components/cards/project-card";

const projects = [
  {
    id: "flippies",
    name: "Orion Money",
    description:
      "Thetan Arena is an esport game based on blockchain technology",
    logo: "https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h",
    cover:
      "https://storage.googleapis.com/polkastarter-production-assets/nfy5nnqh2v55q1dbfcynrqeipzcb",
  },
  {
    id: "flippies",
    name: "Wilder World",
    description:
      "An NFT P2E Metaverse with unique microverses & living NFT pets",
    logo: "https://storage.googleapis.com/polkastarter-production-assets/hm8u0aagfyir5n1dbfpizmpe0fu9",
    cover:
      "https://storage.googleapis.com/polkastarter-production-assets/jiq12ptcg86gphxhluu1b69sp33q",
  },
  {
    id: "flippies",
    name: "Tina Arena",
    description:
      "Thetan Arena is an esport game based on blockchain technology",
    logo: "https://storage.googleapis.com/polkastarter-production-assets/tcwqly5amlb5m9b5uge0zfl4iwxm",
    cover:
      "https://storage.googleapis.com/polkastarter-production-assets/icaa44umdc3z299t6bwd5z81n67v",
  },
  {
    id: "flippies",
    name: "Orion Money",
    description:
      "Thetan Arena is an esport game based on blockchain technology",
    logo: "https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h",
    cover:
      "https://storage.googleapis.com/polkastarter-production-assets/nfy5nnqh2v55q1dbfcynrqeipzcb",
  },
  {
    id: "flippies",
    name: "Wilder World",
    description:
      "An NFT P2E Metaverse with unique microverses & living NFT pets",
    logo: "https://storage.googleapis.com/polkastarter-production-assets/hm8u0aagfyir5n1dbfpizmpe0fu9",
    cover:
      "https://storage.googleapis.com/polkastarter-production-assets/jiq12ptcg86gphxhluu1b69sp33q",
  },
  {
    id: "flippies",
    name: "Tina Arena",
    description:
      "Thetan Arena is an esport game based on blockchain technology",
    logo: "https://storage.googleapis.com/polkastarter-production-assets/tcwqly5amlb5m9b5uge0zfl4iwxm",
    cover:
      "https://storage.googleapis.com/polkastarter-production-assets/icaa44umdc3z299t6bwd5z81n67v",
  },
];

interface project {
  id: string;
  name: string;
  logo: string;
  description: string;
  cover: string;
  symbol: string;
  tokenPrice: number;
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
                price={project.tokenPrice}
                key={index}
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
