import Container from "../components/container";
import NftCard from "../components/cards/NftCard";
import Heading from "../components/slices/heading";

const Tiers = function () {
	return (
		<>
			<Heading tagline="An Unique System" title="Our NFT Access Keys" description="Ready to Buy your NFT Access Key using $PSOL token?" />
			<section>
				<Container fluid={false}>
					{/*<div className="text-center mb-12">*/}
					{/*	<h2 className="text-base font-semibold tracking-wider mb-2 text-purple-400 uppercase">An Unique System</h2>*/}
					{/*	<a id="features" className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">*/}
					{/*		Our NFT Access Keys*/}
					{/*	</a>*/}
					{/*	<p className="mt-5 max-w-prose mx-auto text-sm lg:text-base text-gray-200">*/}
					{/*		Ready to Buy your NFT Access Key using $PSOL token?*/}
					{/*		<Link href="/">*/}
					{/*			<a className="text-purple-2 font-medium ml-1">*/}
					{/*				Read More.*/}
					{/*			</a>*/}
					{/*		</Link>*/}
					{/*	</p>*/}
					{/*</div>*/}
					<div className="grid grid-cols-4 gap-x-7">
						<NftCard name="Dreamer" amount={210} poster="/images/tiers/covers/Dreamer.png" video="https://parasol.finance/_nuxt/videos/1.4914065.mp4" vestingPeriod={12} />
						<NftCard name="Rider" amount={2100} poster="/images/tiers/covers/Rider.png" video="https://parasol.finance/_nuxt/videos/2.b97bbf5.mp4" vestingPeriod={8} />
						<NftCard name="Chiller" amount={21000} poster="/images/tiers/covers/Chiller.png" video="https://parasol.finance/_nuxt/videos/3.7803a7c.mp4" vestingPeriod={6} />
						<NftCard name="MoonWalker" amount={210000} poster="/images/tiers/covers/MoonWalker.png" video="https://parasol.finance/_nuxt/videos/4.93829ce.mp4" vestingPeriod={4} />
					</div>
				</Container>
			</section>
			<section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
				<div className="max-w-max lg:max-w-7xl mx-auto">
					<div className="relative z-10 text-center py-10 mb-8 md:mb-2 md:px-6">
						<div className="text-base max-w-prose lg:max-w-none">
							<h2 className="leading-6 text-purple-400 font-semibold tracking-wide uppercase">NFTs as Tiers System</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">The Vital Concepts Behind Parasol
							</p>
						</div>
					</div>
					<div className="relative">
						<div className="relative md:p-6">
							<div className="lg:grid lg:grid-cols-2 lg:gap-6">
								<div className="prose prose-indigo prose-lg text-gray-300 lg:max-w-none">
									<p>Ultrices ultricies a in odio consequat egestas rutrum. Ut vitae aliquam in ipsum.
										Duis nullam placerat cursus risus ultrices nisi, vitae tellus in. Qui non fugiat
										aut minus aut rerum. Perspiciatis iusto mollitia iste minima soluta id.</p>
									<p>Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus
										felis id dignissim eget. Est augue <a href="#">maecenas</a> risus nulla ultrices
										congue nunc tortor. Eu leo risus porta integer suspendisse sed sit ligula elit.
									</p>
									<ol role="list">
										<li>Integer varius imperdiet sed interdum felis cras in nec nunc.</li>
										<li>Quam malesuada odio ut sit egestas. Elementum at porta vitae.</li>
									</ol>
									<p>Amet, eu nulla id molestie quis tortor. Auctor erat justo, sed pellentesque
										scelerisque interdum blandit lectus. Nec viverra amet ac facilisis vestibulum.
										Vestibulum purus nibh ac ultricies congue.</p>
								</div>
								<div className="mt-6 prose prose-indigo prose-lg text-gray-300 lg:mt-0">
									<p>Erat pellentesque dictumst ligula porttitor risus eget et eget. Ultricies tellus
										felis id dignissim eget. Est augue maecenas risus nulla ultrices congue nunc
										tortor.</p>
									<p>Eu leo risus porta integer suspendisse sed sit ligula elit. Elit egestas lacinia
										sagittis pellentesque neque dignissim vulputate sodales. Diam sed mauris felis
										risus, ultricies mauris netus tincidunt. Mauris sit eu ac tellus nibh non eget
										sed accumsan. Viverra ac sed venenatis pulvinar elit. Cras diam quis tincidunt
										lectus. Non mi vitae, scelerisque felis nisi, netus amet nisl.</p>
									<p>Eu eu mauris bibendum scelerisque adipiscing et. Justo, elementum consectetur
										morbi eros, posuere ipsum tortor. Eget cursus massa sed velit feugiat sed ut.
										Faucibus eros mauris morbi aliquam nullam. Scelerisque elementum sit magna
										ullamcorper dignissim pretium.</p>
								</div>
							</div>
							<div className="mt-8 inline-flex rounded-md shadow">
								<a href="#" className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Contact
									sales </a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
export default Tiers;
