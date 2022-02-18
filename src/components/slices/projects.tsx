import Container from "../container";
import ProjectCard from "../cards/ProjectCard";
import {ChevronDownIcon} from "@heroicons/react/outline";

const projects = [
	{
		id: 'flippies',
		name: 'Orion Money',
		description: 'Thetan Arena is an esport game based on blockchain technology',
		logo: 'https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h',
		cover: 'https://storage.googleapis.com/polkastarter-production-assets/nfy5nnqh2v55q1dbfcynrqeipzcb'
	},
	{
		id: 'flippies',
		name: 'Wilder World',
		description: 'An NFT P2E Metaverse with unique microverses & living NFT pets',
		logo: 'https://storage.googleapis.com/polkastarter-production-assets/hm8u0aagfyir5n1dbfpizmpe0fu9',
		cover: 'https://storage.googleapis.com/polkastarter-production-assets/jiq12ptcg86gphxhluu1b69sp33q'
	},
	{
		id: 'flippies',
		name: 'Tina Arena',
		description: 'Thetan Arena is an esport game based on blockchain technology',
		logo: 'https://storage.googleapis.com/polkastarter-production-assets/tcwqly5amlb5m9b5uge0zfl4iwxm',
		cover: 'https://storage.googleapis.com/polkastarter-production-assets/icaa44umdc3z299t6bwd5z81n67v'
	},
]

export default () =>
	<section>
		<Container>
			<div className="float-right flex gap-x-3 pt-3 uppercase text-sm">
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
			<h1 className="text-4xl font-medium mb-2">Upcoming IDOs</h1>
			<p className="text-xl font-light text-gray-300 mb-12">We bring new technologies to our community</p>
			<div className="grid grid-cols-3 gap-7">
				{projects.map((project) =>
					<ProjectCard Id={project.id} Name={project.name} Description={project.description} Logo={project.logo} Cover={project.cover} />)}
			</div>
		</Container>
	</section>
