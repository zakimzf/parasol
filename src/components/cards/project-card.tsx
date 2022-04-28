import Link from "next/link";

import Card from "../card";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { BellIcon, CollectionIcon } from "@heroicons/react/outline";
import Countdown from "react-countdown";
import { useReminderModal } from "../reminder-modal/useReminderModal";
import React, { useContext, useEffect, useState } from "react";
import { isToday } from "../../utils/functions";
import { NftStore, Project } from "parasol-finance-sdk";
import { NftContext } from "../../context/NftContext";
import { PublicKey } from "@solana/web3.js";

type ProjectDetails = {
  id?: String;
  loading?: boolean;
  logo?: string;
  cover?: string;
  featured?: boolean,
  name?: String;
  description?: String;
  price?: number
  status?: string,
  startTime?: any;
  endTime?: any;
};

type CountdownProps = {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}

const countdownRenderer = ({ days, hours, minutes, seconds }: CountdownProps) =>
  days == 0 ? <span>{hours}h {minutes}m {seconds}s</span> : <span>{days} Days - {hours}h {minutes}m {seconds}s</span>

const ProjectCard = ({
  id,
  loading,
  name,
  description,
  featured,
  logo,
  cover,
  price,
  status,
  startTime,
  endTime
}: ProjectDetails) => {
  const { setReminder, setProjectKey } = useReminderModal();
  const { provider, config } = useContext(NftContext);
  const [details, setDetails] = useState<any>();
  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const nftStore = await new NftStore(provider, config).build();
        const projectId: any = id;
        const project = await new Project(provider, nftStore, new PublicKey(projectId)).build();
        const projectDetails = await project.data();
        setDetails(projectDetails);
      }
      catch (err) { }
    }
    if (id) getProjectDetails();
  }, [id])

  return (
    <Card>
      {cover ? (
        <div className={"relative"}>
          <label className="absolute z-10 top-3 right-3 p-2 bg-opacity-70 text-xs uppercase font-medium rounded-md bg-purple-1">
            {status}
          </label>
          {startTime >= Date.now() ? (
            <div className={"w-full flex justify-center py-1 font-bold items-center absolute bg-white bg-opacity-10 z-10 bottom-0"}>
              <Countdown date={startTime} renderer={countdownRenderer} />
            </div>
          ) : ""}
          <Link href={`/projects/${id}`}>
            <a style={{ position: "relative" }}>
              <img
                className="w-full aspect-video rounded-t-lg"
                src={cover}
                alt={`${id}-cover`}
              />
            </a>
          </Link>
        </div>
      ) : (
        <img
          className="w-full aspect-video rounded-t-lg"
          src={"/assets/preview/placeholder.png"}
          alt={"placeholder"}
        />
      )}
      <div className={"flex-1 flex relative z-10 flex-col p-6"}>
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-3 bg-[#5d5774] w-3/5 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#5d5774] rounded col-span-2"></div>
                  <div className="h-2 bg-[#5d5774] rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-2 bg-[#5d5774] rounded col-span-1"></div>
                  <div className="h-2 bg-[#5d5774] rounded col-span-2"></div>
                  <div className="h-2 bg-[#5d5774] rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="h-2 bg-[#5d5774] rounded col-span-2"></div>
                  <div className="h-2 bg-[#5d5774] rounded col-span-3"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#5d5774] rounded col-span-2"></div>
                  <div className="h-2 bg-[#5d5774] rounded col-span-1"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-[#5d5774] rounded col-span-2"></div>
                  <div className="h-2 bg-[#5d5774] rounded col-span-1"></div>
                </div>
              </div>
              <div className="flex gap-x-3">
                <button className={"button cursor-default w-3/5 text-sm py-1 rounded-full !bg-none bg-[#5d5774] hover:bg-[#5d5774]"}>&nbsp;</button>
                <button className={"button cursor-default w-2/5 text-sm py-1 !bg-none rounded-full !bg-[#5d5774]"}>&nbsp;</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="flex gap-x-3 items-center text-2xl mb-2 font-bold">
              {logo && (
                <img
                  className="w-6 h-6 rounded-md"
                  src={logo}
                  alt={`${id}-logo`} />
              )}
              <Link href={`/projects/${id}`}>
                <a>{name}</a>
              </Link>
              {(featured || true) && <BadgeCheckIcon className={"h-6 -ml-1 text-purple-2"} />}
            </h2>
            <p className="text text-gray-300 mb-3 flex-1 line-clamp-2" title={description?.toString()}>{description}</p>
            <div className="flex-col space-y-3 mt-3 mb-8">
              {details && (
                <div className="flex font-medium items-center text-gray-300 gap-x-3">
                  <span>Token Price</span>
                  <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                  <span className={"flex gap-x-1 items-center"}>
                    ${details.salePrice}
                    <img className="w-4" src={"/assets/logos/usdc-logo.svg"} alt="USDC" />
                  </span>
                </div>
              )}
              <div className="flex font-medium items-center text-gray-300 gap-x-3">
                <div className="flex items-center gap-x-1">
                  IDO Start Date
                </div>
                <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                <span>{startTime.toLocaleDateString()} {isToday(startTime) && startTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex font-medium items-center text-gray-300 gap-x-3">
                <span>IDO End Date</span>
                <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                <span>{endTime.toLocaleDateString()} {isToday(endTime) && endTime.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="flex gap-x-3">
              {startTime >= Date.now() ? (
                <button
                  onClick={() => {
                    setReminder(true);
                    setProjectKey(id);
                  }}
                  className="button py-3 flex-1 gap-x-1 text-base whitespace-nowrap">
                  <BellIcon className={"w-5 h-5"} />
                  Set a Reminder
                </button>
              ) : (
                <Link href={`/projects/${id}/participate`} passHref>
                  <button className="button bg-[#5d5774] py-3 flex-1 text-base whitespace-nowrap">
                    <CollectionIcon className={"w-5 h-5"} />
                    Participate in IDO
                  </button>
                </Link>
              )}
              <Link href={`/projects/${id}`} passHref>
                <button className="button py-3 flex-1 text-base">
                  <span className={"hidden lg:block"}>More</span> Info
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Card>
  )
};
export default ProjectCard;
