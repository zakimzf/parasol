import Link from "next/link";
import { BadgeCheckIcon } from "@heroicons/react/solid";

import Card from "../card";

type ProjectDetails = {
  Id: String;
  Logo?: string;
  Cover?: string;
  Name: String;
  Description: String;
};

const ProjectCard = ({
  Id,
  Name,
  Description,
  Logo,
  Cover,
}: ProjectDetails) => {
  return (
    <Card>
      {Cover && (
        <Link href={`/projects/${Id}`}>
          <a style={{ position: "relative" }}>
            <img
              className="w-full rounded-t-lg"
              src={Cover}
              alt={`${Id}-cover`}
            />
          </a>
        </Link>
      )}
      {/*<label className="absolute z-10 top-3 right-3 p-2 bg-opacity-100 text-xs uppercase font-medium rounded-md bg-purple-1">Whitelist Opened</label>*/}
      <div className={`flex flex-col px-6 ${Logo ? "pt-16" : "pt-6"} pb-6`}>
        {Logo && (
          <img
            className="absolute w-20 h-20 border-4 border-gray-700 bg-gray-700 -top-10 rounded-xl"
            src={Logo}
            alt={`${Id}-logo`}
          />
        )}
        <h2 className="flex gap-x-2 items-center text-2xl mb-2 font-bold">
          <Link href={`/projects/${Id}`}>
            <a>{Name}</a>
          </Link>
          <BadgeCheckIcon className={"h-7 text-purple-2"} />
        </h2>
        <p className="text text-gray-300 font-extralight">{Description}</p>
        <div className="flex gap-x-3">
          <Link href={`/projects/${Id}/participate`} passHref>
            <button className="button py-3 flex-1 text-base mb-3 whitespace-nowrap">
              Participate in IDO
            </button>
          </Link>
          <Link href={`/projects/${Id}`} passHref>
            <button className="button py-3 flex-1 text-base mb-3">More Info</button>
          </Link>
        </div>
      </div>
    </Card>
  )
};
export default ProjectCard;
