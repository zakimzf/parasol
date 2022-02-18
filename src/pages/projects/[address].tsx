import {useRouter} from 'next/router'
import Container from "../../components/container";
import {useEffect, useState} from "react";
import {BadgeCheckIcon} from "@heroicons/react/solid";

const project =
	{
		id: 'flippies',
		name: 'Orion Money',
		description: 'Thetan Arena is an esport game based on blockchain technology',
		logo: 'https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h',
		cover: 'https://storage.googleapis.com/polkastarter-production-assets/nfy5nnqh2v55q1dbfcynrqeipzcb'
	};

let amount = 300000;

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
								Nero
							</a>
						</div>
					</li>
				</ol>
			</nav>
			<div className="grid grid-cols-9">
				<div className="prose prose-lg prose-invert col-span-6">
					<div className="flex items-center gap-x-6">
						<img className="rounded-full h-16 mb-2 m-0" src="https://storage.googleapis.com/polkastarter-production-assets/aovnyvd72hvhc5l8ab2e9404jq0h" alt="" />
						<div>
							<h1 className="text-4xl- mb-0">Mecha Morphing</h1>
							<p className={"my-2 font-semibold"}>We bring new technologies to our community.</p>
						</div>
					</div>
					<figure>
						<img className="w-full rounded-lg" src="https://storage.googleapis.com/polkastarter-production-assets/h3bth4ctn32w62tmrk7a9cewyxn8" />
						<figcaption>Sagittis scelerisque nulla cursus in enim consectetur quam.</figcaption>
					</figure>
					<p>Faucibus commodo massa rhoncus, volutpat. <strong>Dignissim</strong> sed <strong>eget risus
						enim</strong>. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec
						est. Odio penatibus risus viverra tellus varius sit neque erat velit. Faucibus commodo massa
						rhoncus, volutpat. Dignissim sed eget risus enim. <a href="#">Mattis mauris semper</a> sed
						amet vitae sed turpis id.
					</p>
					<ul role="list">
						<li>Quis elit egestas venenatis mattis dignissim.</li>
						<li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
						<li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
					</ul>
					<p>Quis semper vulputate aliquam venenatis egestas sagittis quisque orci. Donec commodo sit
						viverra aliquam porttitor ultrices gravida eu. Tincidunt leo, elementum mattis elementum ut
						nisl, justo, amet, mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed elit
						interdum dignissim.
					</p>
					<h2>From beginner to expert in 30 days</h2>
					<p>Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum
						urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas
						pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
						Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis diam.
					</p>
					<blockquote>
						<p>Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed consectetur
							neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.
						</p>
					</blockquote>
					<p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper
						sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra
						tellus varius sit neque erat velit.
					</p>
					<h2>Everything you need to get up and running</h2>
					<p>Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>. Amet, massa quam varius
						orci dapibus volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed
						tempus ut viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor
						dignissim. Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis
						quam.
					</p>
					<p>Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper
						sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra
						tellus varius sit neque erat velit.
					</p>
				</div>
				<div className="col-span-3">
					<div className="sticky flex flex-col gap-y-6 top-20">
						<div className="relative bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg">
							<div className={`relative px-6 pt-6 pb-6`}>
								<h2 className="flex gap-x-2 items-center text-2xl font-bold">
									Mecha Morphing
									<BadgeCheckIcon className={"h-7 text-purple-2"} />
								</h2>
								<div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
									<img className="h-8" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
									<div className="flex items-end gap-x-2 text-4xl font-bold">
										{ amount.toLocaleString('en-US', {minimumFractionDigits: 0}) }
										<span>USDC</span>
									</div>
								</div>
								<div className="prose prose-lg prose-invert">
									<p>The allowlist for Orbitau is now available and you can apply for it below.</p>
									<p>Note that you need to have at least 250 POLS Power to qualify for this allowlist.
										Learn more.
									</p>
								</div>
								<div className="flex-col space-y-3 mt-6">
									<div className="flex font-medium items-center text-gray-300 gap-x-3">
										<span>Hard Cap</span>
										<span className="flex-1 h-1 border-b border-dashed border-gray-400" />
										<span>$500,000</span>
									</div>
									<div className="flex font-medium items-center text-gray-300 gap-x-3">
										<span>Price per Token</span>
										<span className="flex-1 h-1 border-b border-dashed border-gray-400" />
										<span>$0.21</span>
									</div>
								</div>
							</div>
						</div>
						<button className={"bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg px-5 py-4 text-lg font-medium rounded-lg"}>
							Apply Now
						</button>
					</div>
				</div>
			</div>
		</Container>
	</section>
}

export default ProjectDetails;
