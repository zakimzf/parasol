import { ChevronDoubleRightIcon } from "@heroicons/react/outline";

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
          {/*<Menu as="div" className="relative inline-block text-left">*/}
          {/*  <div>*/}
          {/*    <Menu.Button className="flex gap-x-2 items-center uppercase bg-white bg-opacity-5 hover:bg-opacity-10 px-5 py-3 rounded-lg text-gray-200">*/}
          {/*      Filter by Status*/}
          {/*      <ChevronDownIcon*/}
          {/*        className="w-5 h-5"*/}
          {/*        aria-hidden="true"*/}
          {/*      />*/}
          {/*    </Menu.Button>*/}
          {/*  </div>*/}
          {/*  <Transition*/}
          {/*    as={Fragment}*/}
          {/*    enter="transition ease-out duration-100"*/}
          {/*    enterFrom="transform opacity-0 scale-95"*/}
          {/*    enterTo="transform opacity-100 scale-100"*/}
          {/*    leave="transition ease-in duration-75"*/}
          {/*    leaveFrom="transform opacity-100 scale-100"*/}
          {/*    leaveTo="transform opacity-0 scale-95"*/}
          {/*  >*/}
          {/*    <Menu.Items className="absolute z-30 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">*/}
          {/*      <div className="px-1 py-1 ">*/}
          {/*        <Menu.Item>*/}
          {/*          {({ active }) => (*/}
          {/*            <button*/}
          {/*              className={`${*/}
          {/*                active ? "bg-purple-2 text-white" : "text-gray-900"*/}
          {/*              } group flex rounded-md items-center w-full px-3 py-2 text-sm`}*/}
          {/*            >*/}
          {/*              {active ? (*/}
          {/*                <PencilIcon*/}
          {/*                  className="w-5 h-5 mr-2"*/}
          {/*                  aria-hidden="true"*/}
          {/*                />*/}
          {/*              ) : (*/}
          {/*                <PencilIcon*/}
          {/*                  className="w-5 h-5 mr-2"*/}
          {/*                  aria-hidden="true"*/}
          {/*                />*/}
          {/*              )}*/}
          {/*              Edit*/}
          {/*            </button>*/}
          {/*          )}*/}
          {/*        </Menu.Item>*/}
          {/*      </div>*/}
          {/*    </Menu.Items>*/}
          {/*  </Transition>*/}
          {/*</Menu>*/}
        </div>
        <div className={"mb-12"}>
          <a className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Upcoming IDOs
          </a>
          <p className="truncate mt-1 max-w-prose text-sm lg:text-base text-gray-200">
            We only display IDOs that are featured or have been balloted.
          </p>
        </div>
        <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            if (project.status == "PUBLISHED") {
              return (
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
              );
            }
          })}
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
