import Link from "next/link";

import Card from "../card";
import { BadgeCheckIcon } from "@heroicons/react/solid";

type ProjectDetails = {
  Id: String;
  Logo?: string;
  Cover?: string;
  Featured?: boolean,
  Name: String;
  Description: String;
  Price?: number
};

const ProjectCard = ({
  Id,
  Name,
  Description,
  Featured,
  Logo,
  Cover,
  Price,
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
          {Featured && <BadgeCheckIcon className={"h-7 text-purple-2"} />}
        </h2>
        <p className="text text-gray-300 font-extralight">{Description}</p>
        <div className="flex-col space-y-3 mt-6 mb-8">
          <div className="flex font-medium items-center text-gray-300 gap-x-3">
            <div className="flex items-center gap-x-1">
              IDO Start Date
            </div>
            <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
            <span>XXX</span>
          </div>
          <div className="flex font-medium items-center text-gray-300 gap-x-3">
            <span>IDO End Date</span>
            <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
            <span>XXX</span>
          </div>
        </div>
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
