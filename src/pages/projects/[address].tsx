import {useRouter} from 'next/router'
import Container from "../../components/utils/container";
import ProjectCard from "../../components/cards/ProjectCard";
import {useEffect, useState} from "react";

const project =
	{
		id: 'flippies',
		name: 'Orion Money',
		description: 'Thetan Arena is an esport game based on blockchain technology',
		logo: 'https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h',
		cover: 'https://storage.googleapis.com/polkastarter-production-assets/nfy5nnqh2v55q1dbfcynrqeipzcb'
	};

const ProjectDetails = function () {
	const router = useRouter()
	const {address} = router.query;

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		// fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nutanbhogendrasharma/")
		// 	.then(res => res.json())
		// 	.then(
		// 		(data) => {
		// 			setIsLoaded(true);
		// 			setBlogs(data.items);
		// 		},
		// 		(error) => {
		// 			setIsLoaded(true);
		// 			setError(error);
		// 		}
		// 	)
	}, [])

	// useEffect(() => {
	// 	router.push('/suck').then();
	// });
	// router.push('/suck').then(r => {});
	// const {pathname} = Router
	// if(pathname == '/' ){
	// 	Router.push('/hello-nextjs')
	// }
	// Router.Pu('/hello-nextjs')
	const t = 5;
	return <section className="pt-6">
		<Container>
			<nav className="flex mb-8" aria-label="Breadcrumb">
				<ol role="list" className="flex items-center space-x-4">
					{/*<li>*/}
					{/*	<div>*/}
					{/*		<a href="#" className="text-gray-300 hover:text-gray-500">*/}
					{/*			<svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">*/}
					{/*				<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />*/}
					{/*			</svg>*/}
					{/*			<span className="sr-only">Home</span>*/}
					{/*		</a>*/}
					{/*	</div>*/}
					{/*</li>*/}
					<li>
						<div className="flex items-center">
							{/*<svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">*/}
							{/*	<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />*/}
							{/*</svg>*/}
							<a href="#" className=" text-sm font-medium text-gray-300 hover:text-gray-700">Projects</a>
						</div>
					</li>
					<li>
						<div className="flex items-center">
							<svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
							</svg>
							<a href="#" className="ml-4 text-sm font-medium text-gray-300 hover:text-gray-700" aria-current="page">Project
								Nero</a>
						</div>
					</li>
				</ol>
			</nav>
			<div className="flex gap-x-6">
				<img className="rounded-full h-20" src="https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h" alt="" />
				<div>
					<h1 className="text-4xl font-medium mb-2">Parasol Finance</h1>
					<p className="text-xl font-light text-gray-300 mb-12">We bring new technologies to our community</p>
					{/*<h1>Ark Rivals</h1>*/}
					{/*<h2>An NFT P2E Metaverse with unique microverses & living NFT pets</h2>*/}
				</div>
			</div>
			<div className="grid grid-cols- gap-12">
				<div className="col-span-7">
					<img className="w-full" src="https://storage.googleapis.com/polkastarter-production-assets/h3bth4ctn32w62tmrk7a9cewyxn8" alt={"hero"} />
				</div>
				<div className="col-span-5">
					<ProjectCard Id={project.id} Name={project.name} Description={project.description} />
				</div>
			</div>
		</Container>
	</section>
}

export default ProjectDetails;
