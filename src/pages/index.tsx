import type { NextPage } from "next"
import Hero from "../components/slices/hero";
import Projects from "../components/slices/projects";
import Layout from "../components/layout";

const Home: NextPage = () =>
  <Layout>
    {/* <Notification title={"Successfully saved!"} source={"Anyone with a link can now view this"}/> */}
    <Hero />
    <Projects />
    {/*<Hiring />*/}
    {/*<Brands />*/}
    {/*<Stats />*/}
    {/*<AboutParasol />*/}
    {/*<section className="pb-16 my-32 bg-gradient-to-r from-purple-1 to-purple-2 lg:pb-0 lg:z-10 lg:relative">*/}
    {/*	<div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">*/}
    {/*		<div className="relative lg:-my-8">*/}
    {/*			<div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"/>*/}
    {/*			<div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">*/}
    {/*				<div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">*/}
    {/*					<img className="object-cover lg:h-full lg:w-full" src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />*/}
    {/*				</div>*/}
    {/*			</div>*/}
    {/*		</div>*/}
    {/*		<div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">*/}
    {/*			<div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">*/}
    {/*				<blockquote>*/}
    {/*					<div>*/}
    {/*						<svg className="h-12 w-12 text-white opacity-90" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">*/}
    {/*							<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />*/}
    {/*						</svg>*/}
    {/*						<p className="mt-6 text-2xl font-medium text-white">Lorem ipsum dolor sit amet,*/}
    {/*							consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat*/}
    {/*							est integer dolor auctor adipiscing nunc urna, sit.</p>*/}
    {/*					</div>*/}
    {/*					<footer className="mt-6">*/}
    {/*						<p className="text-base font-medium text-white">Judith Black</p>*/}
    {/*						<p className="text-base font-medium text-cyan-100">CEO at PureInsights</p>*/}
    {/*					</footer>*/}
    {/*				</blockquote>*/}
    {/*			</div>*/}
    {/*		</div>*/}
    {/*	</div>*/}
    {/*</section>*/}
    {/*<Apply />*/}
    {/*<br />*/}
    {/*<br />*/}
    {/*<br />*/}
    {/*<div aria-live="assertive" className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6">*/}
    {/*	<div className="w-full flex flex-col items-center space-y-4 sm:items-end">*/}
    {/*		<div className="max-w-sm w-full bg-[#231f38] rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">*/}
    {/*			<div className="p-4">*/}
    {/*				<div className="flex items-start">*/}
    {/*					<div className="flex-shrink-0">*/}
    {/*						<svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">*/}
    {/*							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
    {/*						</svg>*/}
    {/*					</div>*/}
    {/*					<div className="ml-3 w-0 flex-1 pt-0.5">*/}
    {/*						<p className="text-sm font-medium">Successfully saved!</p>*/}
    {/*						<p className="mt-1 text-sm text-gray-300">Anyone with a link can now view this*/}
    {/*							file.</p>*/}
    {/*					</div>*/}
    {/*					/!*<div className="ml-4 flex-shrink-0 flex">*!/*/}
    {/*					/!*	<button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">*!/*/}
    {/*					/!*		<span className="sr-only">Close</span>*!/*/}
    {/*					/!*		<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">*!/*/}
    {/*					/!*			<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />*!/*/}
    {/*					/!*		</svg>*!/*/}
    {/*					/!*	</button>*!/*/}
    {/*					/!*</div>*!/*/}
    {/*				</div>*/}
    {/*			</div>*/}
    {/*		</div>*/}
    {/*	</div>*/}
    {/*</div>*/}
    {/*<Team />*/}
    {/*<Newsletter />*/}
    {/*<div className="nomics-ticker-widget" data-name="Parasol Finance" data-base="PSOL3" data-quote="USD"/>*/}
    {/*<script src="https://widget.nomics.com/embed.js"/>*/}
    {/*<Tiers />*/}
    {/*<EyeCatcher />*/}
  </Layout>

export default Home;
