import Link from "next/link";

import Card from "../card";
import { BadgeCheckIcon } from "@heroicons/react/solid";

type ProjectDetails = {
  id: String;
  logo?: string;
  cover?: string;
  featured?: boolean,
  name: String;
  description: String;
  price?: number
  startTime: any;
  endTime: any;
};

const ProjectCard = ({
  id,
  name,
  description,
  featured,
  logo,
  cover,
  price,
  startTime,
  endTime
}: ProjectDetails) => {
  const startTime_ = new Date(startTime).toISOString().slice(0, 10);
  const endTime_ = new Date(endTime).toISOString().slice(0, 10);
  return (
    <Card>
      {cover && (
        <Link href={`/projects/${id}`}>
          <a style={{ position: "relative" }}>
            <img
              className="w-full rounded-t-lg"
              src={cover}
              alt={`${id}-cover`}
            />
          </a>
        </Link>
      )}
      {/*<label className="absolute z-10 top-3 right-3 p-2 bg-opacity-100 text-xs uppercase font-medium rounded-md bg-purple-1">Whitelist Opened</label>*/}
      <div className={`flex flex-col px-6 ${logo ? "pt-16" : "pt-6"} pb-6`}>
        {logo && (
          <img
            className="absolute w-20 h-20 border-4 border-gray-700 bg-gray-700 -top-10 rounded-xl"
            src={logo}
            alt={`${id}-logo`}
          />
        )}
        <h2 className="flex gap-x-2 items-center text-2xl mb-2 font-bold">
          <Link href={`/projects/${id}`}>
            <a>{name}</a>
          </Link>
          {featured && <BadgeCheckIcon className={"h-7 text-purple-2"} />}
        </h2>
        <p className="text text-gray-300 font-extralight">{description}</p>
        <div className="flex-col space-y-3 mt-3 mb-8">
          <div className="flex font-medium items-center text-gray-300 gap-x-3">
            <div className="flex items-center gap-x-1">
              IDO Start Date
            </div>
            <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
            <span>{startTime_}</span>
          </div>
          <div className="flex font-medium items-center text-gray-300 gap-x-3">
            <span>IDO End Date</span>
            <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
            <span>{endTime_}</span>
          </div>
        </div>
        <div className="flex gap-x-3">
          <Link href={`/projects/${id}/participate`} passHref>
            <button className="button py-3 flex-1 text-base mb-3 whitespace-nowrap">
              Participate in IDO
            </button>
          </Link>
          <Link href={`/projects/${id}`} passHref>
            <button className="button py-3 flex-1 text-base mb-3">More Info</button>
          </Link>
        </div>
      </div>
    </Card>
  )
};
export default ProjectCard;
