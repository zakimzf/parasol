import { ChevronDoubleRightIcon, ChevronDownIcon, ClockIcon, CollectionIcon } from "@heroicons/react/outline";

import Container from "../container";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { NftContext } from "../../context/NftContext";
import { Project } from "../../constants";
import { RpcHelper } from "parasol-finance-sdk";
import Link from "next/link";
import ProjectCard from "../cards/project-card";
import { Menu, Transition } from "@headlessui/react";

const Projects = () => {
  const { provider } = useContext(NftContext);
  const [projects, setProjects] = useState<Project[]>([])
  const [status, setStatus] = useState<string>("PUBLISHED");
  const filteredProjects = projects
    .filter((e) => e.status === status)
    .filter((e) => e.endTime > new Date())
    .slice(0, 3);

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
        {/*<div className="float-right sm:flex gap-x-3 pl-6 lg:pl-0 pt-1 lg:pt-3 uppercase text-sm grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 justify-center">*/}
        {/*  */}
        {/*</div>*/}
        <div className={"flex items-center gap-x-6 mb-12"}>
          <div className={"truncate flex-1"}>
            <a className="text-3xl mb-1 font-extrabold text-white tracking-tight sm:text-4xl">
              Upcoming IDOs
            </a>
            <p className="truncate text-sm lg:text-base text-gray-200">
              We only display IDOs that are featured or have been balloted.
            </p>
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex gap-x-2 items-center uppercase bg-white bg-opacity-5 hover:bg-opacity-10 px-5 py-3 rounded-lg text-gray-200">
                <span className={"hidden lg:block"}>Filter by Status</span>
                <ChevronDownIcon
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-30 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setStatus("PUBLISHED")}
                        className={`${active ? "bg-purple-2 text-white" : "text-gray-900"} group flex rounded-md items-center gap-x-3 w-full px-3 py-2 text-sm`}>
                        <CollectionIcon className={"w-5 h-5"} />
                        Upcoming IDOs
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setStatus("FINISHED")}
                        className={`${active ? "bg-purple-2 text-white" : "text-gray-900"} group flex rounded-md items-center gap-x-3 w-full px-3 py-2 text-sm`}>
                        <ClockIcon className={"w-5 h-5"} />
                        Finished IDOs
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
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
              <h1 className={"py-12 font-medium text-gray-300 text-center"}>
                There is no IDO corresponding to these criteria.
              </h1>
            )}
          </>
        ) : (
          <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map(key => (
              <ProjectCard key={key} loading={true}/>
            ))}
          </div>
        )}
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
