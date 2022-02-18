import Container from "../utils/container";
import Heading from "./heading";

const Team = () =>
	<section className="">
		<Container>
			<div className="text-center space-y-12 pt-20">
				<Heading title="Meet Our Team" tagline={"Inside Parasol"} description="Meet our amazing team (excepting patapouf)" />
				{/*<div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">*/}
				{/*	<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our team</h2>*/}
				{/*	<p className="text-xl text-gray-500">Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet*/}
				{/*		lectus sit pretium egestas vel mattis neque.</p>*/}
				{/*</div>*/}
				<ul role="list" className="mx-auto space-y-1s6 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
					<li>
						<div className="space-y-6">
							<img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
							<div className="space-y-2">
								<div className="text-lg leading-6 font-medium space-y-1">
									<h3>Whitney Francis</h3>
									<p className="text-purple-2">Copywriter</p>
								</div>
								<ul role="list" className="flex justify-center space-x-5">
									<li>
										<a href="#" className="text-gray-400 hover:text-gray-500">
											<span className="sr-only">Twitter</span>
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
											</svg>
										</a>
									</li>
									<li>
										<a href="#" className="text-gray-400 hover:text-gray-500">
											<span className="sr-only">LinkedIn</span>
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
											</svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="space-y-6">
							<img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
							<div className="space-y-2">
								<div className="text-lg leading-6 font-medium space-y-1">
									<h3>Whitney Francis</h3>
									<p className="text-purple-2">Copywriter</p>
								</div>
								<ul role="list" className="flex justify-center space-x-5">
									<li>
										<a href="#" className="text-gray-400 hover:text-gray-500">
											<span className="sr-only">Twitter</span>
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
											</svg>
										</a>
									</li>
									<li>
										<a href="#" className="text-gray-400 hover:text-gray-500">
											<span className="sr-only">LinkedIn</span>
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
											</svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div className="space-y-6">
							<img className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
							<div className="space-y-2">
								<div className="text-lg leading-6 font-medium space-y-1">
									<h3>Whitney Francis</h3>
									<p className="text-purple-2">Copywriter</p>
								</div>
								<ul role="list" className="flex justify-center space-x-5">
									<li>
										<a href="#" className="text-gray-400 hover:text-gray-500">
											<span className="sr-only">Twitter</span>
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
											</svg>
										</a>
									</li>
									<li>
										<a href="#" className="text-gray-400 hover:text-gray-500">
											<span className="sr-only">LinkedIn</span>
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
												<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
											</svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</Container>
	</section>

// <section className="mt-20">
// 	<Container>
// 		<Heading title="Suck" tagline="SUck" description="MRR"/>
// 		<ul role="list" className="space-y-12 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
// 			<li>
// 				<div className="space-y-4">
// 					<div className="aspect-w-3 aspect-h-2">
// 						<img className="object-cover shadow-lg rounded-lg" src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
// 					</div>
// 					<div className="text-lg leading-6 font-medium space-y-1">
// 						<h3>Emma Dorsey</h3>
// 						<p className="text-purple-2">Senior Front-end Developer</p>
// 					</div>
// 					<div className="text-lg">
// 						<p className="text-gray-500">Ultricies massa malesuada viverra cras lobortis. Tempor
// 							orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl
// 							dictum.</p>
// 					</div>
// 					<ul role="list" className="flex space-x-5">
// 						<li>
// 							<a href="#" className="text-gray-400 hover:text-gray-500">
// 								<span className="sr-only">Twitter</span>
// 								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
// 									<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
// 								</svg>
// 							</a>
// 						</li>
// 						<li>
// 							<a href="#" className="text-gray-400 hover:text-gray-500">
// 								<span className="sr-only">LinkedIn</span>
// 								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
// 									<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
// 								</svg>
// 							</a>
// 						</li>
// 					</ul>
// 				</div>
// 			</li>
// 			<li>
// 				<div className="space-y-4">
// 					<div className="aspect-w-3 aspect-h-2">
// 						<img className="object-cover shadow-lg rounded-lg" src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
// 					</div>
// 					<div className="text-lg leading-6 font-medium space-y-1">
// 						<h3>Emma Dorsey</h3>
// 						<p className="text-purple-2">Senior Front-end Developer</p>
// 					</div>
// 					<div className="text-lg">
// 						<p className="text-gray-500">Ultricies massa malesuada viverra cras lobortis. Tempor
// 							orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl
// 							dictum.</p>
// 					</div>
// 					<ul role="list" className="flex space-x-5">
// 						<li>
// 							<a href="#" className="text-gray-400 hover:text-gray-500">
// 								<span className="sr-only">Twitter</span>
// 								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
// 									<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
// 								</svg>
// 							</a>
// 						</li>
// 						<li>
// 							<a href="#" className="text-gray-400 hover:text-gray-500">
// 								<span className="sr-only">LinkedIn</span>
// 								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
// 									<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
// 								</svg>
// 							</a>
// 						</li>
// 					</ul>
// 				</div>
// 			</li>
// 			<li>
// 				<div className="space-y-4">
// 					<div className="aspect-w-3 aspect-h-2">
// 						<img className="object-cover shadow-lg rounded-lg" src="https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
// 					</div>
// 					<div className="text-lg leading-6 font-medium space-y-1">
// 						<h3>Emma Dorsey</h3>
// 						<p className="text-purple-2">Senior Front-end Developer</p>
// 					</div>
// 					<div className="text-lg">
// 						<p className="text-gray-500">Ultricies massa malesuada viverra cras lobortis. Tempor
// 							orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl
// 							dictum.</p>
// 					</div>
// 					<ul role="list" className="flex space-x-5">
// 						<li>
// 							<a href="#" className="text-gray-400 hover:text-gray-500">
// 								<span className="sr-only">Twitter</span>
// 								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
// 									<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
// 								</svg>
// 							</a>
// 						</li>
// 						<li>
// 							<a href="#" className="text-gray-400 hover:text-gray-500">
// 								<span className="sr-only">LinkedIn</span>
// 								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
// 									<path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
// 								</svg>
// 							</a>
// 						</li>
// 					</ul>
// 				</div>
// 			</li>
// 		</ul>
// 	</Container>
// </section>


// <section className="pt-32 pb-20">
// 	<Container>
// 		<div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
// 			<div className="space-y-5 sm:space-y-4">
// 				<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Team</h2>
// 				<p className="text-xl text-gray-300">Nulla quam felis, enim faucibus proin velit,
// 					ornare id pretium. Augue ultrices sed arcu condimentum vestibulum suspendisse.
// 					Volutpat eu faucibus vivamus eget bibendum cras.</p>
// 			</div>
// 			<div className="lg:col-span-2">
// 				<ul role="list"
// 				    className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
// 					<li>
// 						<div className="space-y-4">
// 							<div className="aspect-w-3 aspect-h-2">
// 								<img className="object-cover aspect-square shadow-lg rounded-lg"
// 								     src="https://avatars.githubusercontent.com/u/5221349?v=4"
// 								     alt=""/>
// 							</div>
// 							<div className="text-lg leading-6 font-medium space-y-1">
// 								<h3>Clint.Network</h3>
// 								<p className="text-purple-2">Senior Front-end Developer</p>
// 							</div>
// 							<div className="text-lg">
// 								<p className="text-gray-300">Ultricies massa malesuada viverra cras
// 									lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget
// 									turpis urna maecenas cras. Nisl dictum.</p>
// 							</div>
//
// 							<ul role="list" className="flex space-x-5">
// 								<li>
// 									<a href="#" className="text-gray-400 hover:text-gray-500">
// 										<span className="sr-only">Twitter</span>
// 										<svg className="w-5 h-5" fill="currentColor"
// 										     viewBox="0 0 20 20" aria-hidden="true">
// 											<path
// 												d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
// 										</svg>
// 									</a>
// 								</li>
// 								<li>
// 									<a href="#" className="text-gray-400 hover:text-gray-500">
// 										<span className="sr-only">LinkedIn</span>
// 										<svg className="w-5 h-5" fill="currentColor"
// 										     viewBox="0 0 20 20" aria-hidden="true">
// 											<path fill-rule="evenodd"
// 											      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
// 											      clip-rule="evenodd"/>
// 										</svg>
// 									</a>
// 								</li>
// 							</ul>
// 						</div>
// 					</li>
// 					<li>
// 						<div className="space-y-4">
// 							<div className="aspect-w-3 aspect-h-2">
// 								<img className="object-cover aspect-square shadow-lg rounded-lg"
// 								     src="https://scontent-frx5-1.xx.fbcdn.net/v/t31.18172-8/10548010_10201349982430452_1381392084690317652_o.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=1poFQmVD_50AX-5ddOi&_nc_ht=scontent-frx5-1.xx&oh=00_AT_1yyqVyYydt6O4ZG9C7y9xhCZpoziWjCgWoPgkAOoZAg&oe=62271214"
// 								     alt=""/>
// 							</div>
// 							<div className="text-lg leading-6 font-medium space-y-1">
// 								<h3>Alex Sadovskij</h3>
// 								<p className="text-purple-2">Senior Front-end Developer</p>
// 							</div>
// 							<div className="text-lg">
// 								<p className="text-gray-300">Ultricies massa malesuada viverra cras
// 									lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget
// 									turpis urna maecenas cras. Nisl dictum.</p>
// 							</div>
//
// 							<ul role="list" className="flex space-x-5">
// 								<li>
// 									<a href="#" className="text-gray-400 hover:text-gray-500">
// 										<span className="sr-only">Twitter</span>
// 										<svg className="w-5 h-5" fill="currentColor"
// 										     viewBox="0 0 20 20" aria-hidden="true">
// 											<path
// 												d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
// 										</svg>
// 									</a>
// 								</li>
// 								<li>
// 									<a href="#" className="text-gray-400 hover:text-gray-500">
// 										<span className="sr-only">LinkedIn</span>
// 										<svg className="w-5 h-5" fill="currentColor"
// 										     viewBox="0 0 20 20" aria-hidden="true">
// 											<path fill-rule="evenodd"
// 											      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
// 											      clip-rule="evenodd"/>
// 										</svg>
// 									</a>
// 								</li>
// 							</ul>
// 						</div>
// 					</li>
// 				</ul>
// 			</div>
// 		</div>
// 	</Container>
// </section>


export default Team;
