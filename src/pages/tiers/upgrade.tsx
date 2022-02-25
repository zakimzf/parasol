import React, {Fragment, useState} from "react";
import CardHost from "../../components/cards/base-card";
import {Listbox, Transition} from '@headlessui/react'
import {SelectorIcon} from '@heroicons/react/solid'
import {ArrowLeftIcon} from "@heroicons/react/outline";
import Link from 'next/link';

const people = [
	{name: 'Wade Cooper'},
	{name: 'Arlene Mccoy'},
	{name: 'Devon Webb'},
	{name: 'Tom Cook'},
	{name: 'Tanya Fox'},
	{name: 'Hellen Schmidt'},
]

export default () => {
	const [selected, setSelected] = useState(people[0])
	return <section className={"py-6"}>
		<div className={"mx-auto max-w-md space-y-6"}>
			<Link href={"/tiers"}>
				<a className="inline-flex gap-x-2 items-center py-3 rounded-lg text-gray-300">
					<ArrowLeftIcon className={"w-4"}/>
					Back
				</a>
			</Link>
			<CardHost hoverEffect={false} classes={"space-y-6"}>
				<div className={"prose prose-lg prose-invert"}>
					<h2>Upgrade NFT</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.</p>
					<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.</p>
				</div>
				<Listbox value={selected} onChange={setSelected}>
					<div className=" mt-1">
						<Listbox.Button
							className="relative w-full py-3 pl-3 pr-10 text-left bg-white bg-opacity-5 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
							<span className="block truncate">{selected.name}</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<SelectorIcon
									className="w-5 h-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<Listbox.Options
								className="absolute w-64 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{people.map((person, personIdx) => (
									<Listbox.Option
										key={personIdx}
										className={({active}) =>
											`cursor-default select-none relative py-2 px-4 ${
												active ? 'text-white bg-purple-2' : 'text-gray-900'
											}`
										}
										value={person}>
										{({selected}) => (
											<>
												<span
													className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
													{person.name}
												</span>
												{/*{selected ? (*/}
												{/*	<span*/}
												{/*		className="absolute inset-y-0 left-0 flex items-center pl-3 text-white"><CheckIcon*/}
												{/*		className="w-5 h-5" aria-hidden="true"/></span>*/}
												{/*) : null}*/}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
				<button
					className={"w-full bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"}>
					Upgrade My NFT
				</button>
			</CardHost>
		</div>
	</section>;
}
