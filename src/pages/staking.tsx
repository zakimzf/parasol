import Heading from "../components/heading";
import { CheckCircleIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from "@heroicons/react/outline"
import { RadioGroup } from "@headlessui/react"
import React, { useState } from "react";
import Container from "../components/container";
import CardHost from "../components/cards/base-card";

const operations = [
  { id: 0, title: "Stake", description: "Lock your $PSOL for 90 days." },
  { id: 1, title: "Unstake", description: "Retrieve your locked $PSOL." },
]

const advantages = [
  {
    id: 1,
    name: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
  },
]

const Staking = () => {
  const [selectedOperation, setSelectedOperation] = useState(operations[0])
  return (
    <>
      <Heading tagline={"Parasol Finance"} title={"Parasol Staking"} description={"Stake $PSOL and earn Airdrops for every IDOs."} />
      <div className="overflow-hidden">
        <Container>
          <div className="relative grid grid-cols-9">
            <div className={"relative col-span-6 pr-12"}>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Key Advantages to Stake Your $PSOL.
              </h3>
              <p className="mt-3 text-lg">
                By staking your $PSOL tokens, you will earn Airdrops on all future IDOs on the platform.
              </p>
              <dl className="mt-10 space-y-10">
                {advantages.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-2 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true"/>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium">{item.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-200">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={"flex flex-col col-span-3"}>
              <CardHost padding={6}>
                <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                  {selectedOperation.id == 0 ? "Stake" : "Unstake"} PSOL Tokens
                </h2>
                <p className="mt-3 text-lg">
                  By staking your $PSOL tokens, you will earn Airdrops on all future IDOs on the platform.
                </p>
                <div className={"flex mt-6 justify-between items-end mb-4"}>
                  <label className="text-sm font-medium">Stake Amount:</label>
                  <div className="flex gap-x-2 items-center text-xs font-medium">
                    <button
                      className={"bg-gray-500 text-[9px] bg-opacity-50 uppercase font-bold text-gray-400 px-2 py-[2px] rounded-full hover:bg-opacity-30"}>
                      Half
                    </button>
                    <button
                      className={"bg-gray-500 text-[9px] bg-opacity-50 uppercase font-bold text-gray-400 px-2 py-[2px] rounded-full hover:bg-opacity-30"}>
                      Max
                    </button>
                  </div>
                </div>
                <div
                  className={"flex justify-between items-stretch bg-white bg-opacity-5 rounded-xl px-4 py-3"}>
                  <button
                    type="button"
                    className="gap-x-2 py-2 px-2 rounded-lg flex items-center"
                  >
                    <img
                      src={"/images/logos/parasol-logo-mark-reverse-rgb.svg"}
                      className="w-5 h-5 rounded-full"
                      alt={"PSOL"}
                    />
                    <div className="font-semibold" translate={"no"}>
                      PSOL
                    </div>
                  </button>
                  <input
                    type={"number"}
                    inputMode="decimal"
                    className={"bg-transparent outline-0 ring-0 border-transparent font-semibold text-right text-gray-300 text-lg w-full"}
                  />
                </div>
                <RadioGroup className={"mt-6"} value={selectedOperation} onChange={setSelectedOperation}>
                  <RadioGroup.Label className="text-base font-medium">What you want to do?</RadioGroup.Label>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {operations.map((mailingList) => (
                      <RadioGroup.Option
                        key={mailingList.id}
                        value={mailingList}
                        className={({ checked, active }) => `${checked ? "border-transparent" : "border-gray-300"} ${active ? "border-purple-2" : ""} relative border-2 rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none`
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className="flex-1 flex">
                              <div className="flex flex-col">
                                <RadioGroup.Label as="span" className="block font-bold text-sm font-medium ">
                                  {mailingList.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm ">
                                  {mailingList.description}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            <CheckCircleIcon className={`${!checked ? "invisible" : ""} h-5 w-5 text-purple-2`}/>
                            <div
                              className={`${checked ? "border-purple-2" : "border-transparent"} border-2 absolute -inset-px rounded-lg pointer-events-none`}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <button
                  className="w-full mt-8 bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg">
                  {selectedOperation.id == 0 ? "Stake" : "Unstake"} Your $PSOL
                </button>
              </CardHost>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}


export default Staking;