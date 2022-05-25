import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

import Countdown from "react-countdown";
import { NftStore, Project } from "parasol-finance-sdk";
import { PublicKey } from "@solana/web3.js";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import { BellIcon, CollectionIcon } from "@heroicons/react/outline";

import Card from "components/card";
import { useReminderModal } from "components/reminder-modal/useReminderModal";
import { NftContext } from "context/NftContext";
import { isToday } from "utils/functions";
import { ProjectDetails } from "../../constants";

type CountdownProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const countdownRenderer = ({ days, hours, minutes, seconds }: CountdownProps) =>
  days == 0 ? (
    <span>
      {hours}h {minutes}m {seconds}s
    </span>
  ) : (
    <span>
      {days} Days - {hours}h {minutes}m {seconds}s
    </span>
  );

const ProjectCard = ({
  id,
  loading,
  name,
  description,
  isFeatured,
  logo,
  cover,
  status,
  startTime,
  endTime,
  salePrice,
  hardCap,
}: ProjectDetails) => {
  const [startSaleFlag, setStartSaleFlag] = useState(false);
  const [endSaleFlag, setEndSaleFlag] = useState(false);
  const { setReminder, setProjectKey } = useReminderModal();

  useEffect(() => {
    if (startTime >= Date.now()) {
      setStartSaleFlag(true);
      setEndSaleFlag(false);
    }
    else {
      if (endTime >= Date.now()) {
        setEndSaleFlag(true);
        setStartSaleFlag(false);
      }
      else {
        setEndSaleFlag(false);
        setStartSaleFlag(false);
      }
    }
  }, [startTime, endTime]);

  return (
    <Card>
      {cover ? (
        <div className="relative">
          <label className="absolute top-3 right-3 z-10 rounded-md bg-purple-1 bg-opacity-70 p-2 text-xs font-medium uppercase">
            {status}
          </label>
          {startSaleFlag || endSaleFlag || false ? (
            <div className="absolute bottom-0 z-10 flex w-full items-center justify-center bg-white bg-opacity-10 py-1 font-bold">
              <div className={startSaleFlag ? "flex" : "hidden"}>
                IDO starts in
              </div>
              <div className={endSaleFlag ? "flex" : "hidden"}>IDO ends in</div>
              <Countdown date={startTime} renderer={countdownRenderer} />
            </div>
          ) : (
            ""
          )}
          <Link href={`/projects/${id}`}>
            <a className="relative">
              <img
                src={cover}
                alt={`${id}-cover`}
                className="aspect-video w-full rounded-t-lg"
              />
            </a>
          </Link>
        </div>
      ) : (
        <img
          src="/assets/preview/placeholder.png"
          alt="placeholder"
          className="aspect-video w-full rounded-t-lg"
        />
      )}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        {loading ? (
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-3 w-3/5 rounded bg-[#5d5774]"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-[#5d5774]"></div>
                  <div className="col-span-1 h-2 rounded bg-[#5d5774]"></div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 h-2 rounded bg-[#5d5774]"></div>
                  <div className="col-span-2 h-2 rounded bg-[#5d5774]"></div>
                  <div className="col-span-1 h-2 rounded bg-[#5d5774]"></div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-2 h-2 rounded bg-[#5d5774]"></div>
                  <div className="col-span-3 h-2 rounded bg-[#5d5774]"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-[#5d5774]"></div>
                  <div className="col-span-1 h-2 rounded bg-[#5d5774]"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-[#5d5774]"></div>
                  <div className="col-span-1 h-2 rounded bg-[#5d5774]"></div>
                </div>
              </div>
              <div className="flex gap-x-3">
                <button className="button w-3/5 cursor-default rounded-full bg-[#5d5774] !bg-none py-1 text-sm hover:bg-[#5d5774]">
                  &nbsp;
                </button>
                <button className="button w-2/5 cursor-default rounded-full !bg-[#5d5774] !bg-none py-1 text-sm">
                  &nbsp;
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mb-2 flex items-center gap-x-3 text-2xl font-bold">
              {logo && (
                <img
                  src={logo}
                  alt={`${id}-logo`}
                  className="h-6 w-6 rounded-md"
                />
              )}
              <Link href={`/projects/${id}`}>
                <a>{name}</a>
              </Link>
              {isFeatured && (
                <BadgeCheckIcon className="-ml-1 h-6 text-purple-2" />
              )}
            </h2>
            <p
              className="text mb-3 flex-1 text-gray-300 line-clamp-2"
              title={description?.toString()}
            >
              {description}
            </p>
            <div className="mt-3 mb-8 flex-col space-y-3">
              <div className="flex items-center gap-x-3 font-medium text-gray-300">
                <span>Token Price</span>
                <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                <span className="flex items-center gap-x-1">
                  ${salePrice}
                  <img
                    src="/assets/logos/usdc-logo.svg"
                    alt="USDC"
                    className="w-4"
                  />
                </span>
              </div>
              <div className="flex items-center gap-x-3 font-medium text-gray-300">
                <span>HardCap</span>
                <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                <span className="flex items-center gap-x-1">
                  ${hardCap}
                  <img
                    className="w-4"
                    src="/assets/logos/usdc-logo.svg"
                    alt="USDC"
                  />
                </span>
              </div>
              <div className="flex items-center gap-x-3 font-medium text-gray-300">
                <div className="flex items-center gap-x-1">IDO Start Date</div>
                <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                <span>
                  {startTime.toLocaleDateString()}{" "}
                  {isToday(startTime) && startTime.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center gap-x-3 font-medium text-gray-300">
                <span>IDO End Date</span>
                <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                <span>
                  {endTime.toLocaleDateString()}{" "}
                  {isToday(endTime) && endTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="flex gap-x-3">
              {startTime >= Date.now() ? (
                <button
                  onClick={() => {
                    setReminder(true);
                    setProjectKey(id);
                  }}
                  className="button flex-1 gap-x-1 whitespace-nowrap bg-purple-2 bg-opacity-60 !bg-none py-3 text-base hover:text-white"
                >
                  <BellIcon className="h-5 w-5" />
                  Set a Reminder
                </button>
              ) : (
                <Link href={`/projects/${id}/participate`} passHref>
                  <button
                    disabled={status === "FINISHED" || new Date() > endTime}
                    className={`button ${
                      status === "FINISHED" || new Date() > endTime
                        ? "cursor-not-allowed opacity-80"
                        : ""
                    } flex-1 whitespace-nowrap py-3 text-base`}
                  >
                    <CollectionIcon className="h-5 w-5" />
                    Participate in IDO
                  </button>
                </Link>
              )}
              <Link href={`/projects/${id}`} passHref>
                <button
                  className={`button py-3 ${
                    startTime >= Date.now() ? "bg-opacity-80" : ""
                  } flex-1 text-base`}
                >
                  <span className="hidden lg:block">More</span> Info
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
export default ProjectCard;
