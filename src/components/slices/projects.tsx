import { ChevronDownIcon } from "@heroicons/react/outline";

import Container from "../container";

const Projects = () => (
  <section>
    <Container>
      <div className="md:float-right sm:flex gap-x-3 pt-3 uppercase text-sm grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 justify-center xs:pb-10">
        <div className="flex gap-x-2 items-center border border-white border-opacity-30 px-5 py-3 rounded-lg text-gray-200">
          712 Participants
          <ChevronDownIcon className="h-5" />
        </div>
        <div className="flex gap-x-2 items-center border border-white border-opacity-30 px-5 py-3 rounded-lg text-gray-200">
          Check Our Blog
          <ChevronDownIcon className="h-5" />
        </div>
        <div className="flex gap-x-2 items-center border border-white border-opacity-30 px-5 py-3 rounded-lg text-gray-200">
          90 Gang Bang
          <ChevronDownIcon className="h-5" />
        </div>
      </div>

      <div className="space-y-5 sm:space-y-4 mb-12 md:max-w-xl lg:max-w-3xl xl:max-w-none">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Upcoming IDOs
        </h2>
        <p className="text-xl text-gray-300">
          We bring new technologies to our community
        </p>
      </div>
      {/*<h1 className="text-4xl font-medium mb-2">Upcoming IDOs</h1>*/}
      {/*<p className="text-xl font-light text-gray-300 mb-12">We bring new technologies to our community</p>*/}
      <div className="grid gap-7 grid-cols-1 lg:grid-cols-2 lg:grid-cols-3">
        {/*{*/}
        {/*  projects.map((project, index) => (*/}
        {/*    <ProjectCard Id={project.id} Name={project.name} Description={project.description} Logo={project.logo} Cover={project.cover} key={index}/>*/}
        {/*  ))*/}
        {/*}*/}
      </div>
      {/*<div className={"flex justify-center pt-12"}>*/}
      {/*	<Link href={"/ds"}>*/}
      {/*		<a className={`flex items-center justify-center items-center gap-x-1 g-purple-2 text-white bg-transparent border border-gray-600 text-gray-400 px-7 py-3 text-base font-medium rounded-md`}>*/}
      {/*			View All Projects*/}
      {/*			<ChevronDoubleRightIcon className={"w-4"}/>*/}
      {/*		</a>*/}
      {/*	</Link>*/}
      {/*</div>*/}
    </Container>
  </section>
);

export default Projects;
