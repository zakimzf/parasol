import React, { Fragment, useContext, useState } from "react";
import Link from "next/link";

import {
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ClockIcon,
  CollectionIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";

import Container from "components/container";
import ProjectCard from "components/cards/project-card";
import { NftContext } from "context/NftContext";
import { useProjectData } from "context/ProjectContext";

const Projects = () => {
  const { helper } = useContext(NftContext);
  const [status, setStatus] = useState<string>("PUBLISHED");
  const { projects, setProjects, lastTimestamp, setLastTimestamp } =
    useProjectData();

  const filteredProjects = projects
    .filter((e: any) => e.status === status)
    .filter((e: any) => e.endTime > new Date())
    .sort((x: any, y: any) => x.startTime.getTime() - y.startTime.getTime())
    .slice(0, 3);

  if (Date.now() - lastTimestamp > 3600000) {
    (async () => {
      await helper?.getProjectList().then((p: any) => setProjects(p));
      setLastTimestamp(Date.now());
    })();
  }

  return (
    <section>
      <Container>
        <div className="mb-12 flex items-center gap-x-6">
          <div className="flex-1 truncate">
            <a className="mb-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Upcoming & Live IDOs
            </a>
            <p className="truncate text-sm text-gray-200 lg:text-base">
              We only display IDOs that are featured or have been balloted.
            </p>
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center gap-x-2 rounded-lg bg-white bg-opacity-5 px-5 py-3 uppercase text-gray-200 hover:bg-opacity-10">
                <span className="hidden lg:block">Filter by Status</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setStatus("PUBLISHED")}
                        className={`${
                          active ? "bg-purple-2 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm`}
                      >
                        <CollectionIcon className="h-5 w-5" />
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
                        className={`${
                          active ? "bg-purple-2 text-white" : "text-gray-900"
                        } group flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm`}
                      >
                        <ClockIcon className="h-5 w-5" />
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
              <h1 className="py-12 text-center font-medium text-gray-300">
                There is no IDO corresponding to these criteria.
              </h1>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <ProjectCard key={key} loading={true} />
            ))}
          </div>
        )}
        <div className="flex justify-center pt-12">
          <Link href="/projects">
            <a
              className={
                "button border border-gray-600 !bg-none text-sm text-gray-400 hover:text-purple-2"
              }
            >
              View All Projects
              <ChevronDoubleRightIcon className="w-4" />
            </a>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Projects;
