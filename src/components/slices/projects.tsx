import { ChevronDoubleRightIcon, ChevronDownIcon } from "@heroicons/react/outline";

import Container from "../container";
import React, { useContext, useEffect, useState } from "react";
import { NftContext } from "../../context/NftContext";
import { Project } from "../../constants";
import { RpcHelper } from "parasol-finance-sdk";
import ProjectCard from "../cards/project-card";
import Link from "next/link";

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
  return (
    <section>
      <Container>
        <div className="md:float-right sm:flex gap-x-3 pt-3 uppercase text-sm grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 justify-center xs:pb-10">
          <div className="flex gap-x-2 items-center bg-white bg-opacity-5 px-5 py-3 rounded-lg text-gray-200">
            712 Participants
            <ChevronDownIcon className="h-5"/>
          </div>
          <div className="flex gap-x-2 items-center bg-white bg-opacity-5 px-5 py-3 rounded-lg text-gray-200">
            712 Participants
            <ChevronDownIcon className="h-5"/>
          </div>
          <div className="flex gap-x-2 items-center bg-white bg-opacity-5 px-5 py-3 rounded-lg text-gray-200">
            712 Participants
            <ChevronDownIcon className="h-5"/>
          </div>
          {/*<div className="flex gap-x-2 items-center border border-white border-opacity-30 px-5 py-3 rounded-lg text-gray-200">*/}
          {/*  Check Our Blog*/}
          {/*  <ChevronDownIcon className="h-5"/>*/}
          {/*</div>*/}
          {/*<div className="flex gap-x-2 items-center border border-white border-opacity-30 px-5 py-3 rounded-lg text-gray-200">*/}
          {/*  90 Gang Bang*/}
          {/*  <ChevronDownIcon className="h-5"/>*/}
          {/*</div>*/}
        </div>
        <div className={"mb-12"}>
          <a className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Upcoming IDOs
          </a>
          <p className="truncate mt-1 max-w-prose text-sm lg:text-base text-gray-200">
            We bring new technologies to our community
          </p>
        </div>
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
        <div className={"flex justify-center pt-12"}>
        	<Link href={"/projects"}>
        		<a className={"button text-sm !bg-none border border-gray-600 text-gray-400"}>
        			View All Projects
        			<ChevronDoubleRightIcon className={"w-4"}/>
        		</a>
        	</Link>
        </div>
      </Container>
    </section>
  );
};

export default Projects;
