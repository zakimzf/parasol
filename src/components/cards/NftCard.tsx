import {useRef} from "react";
import {ShoppingBagIcon} from "@heroicons/react/outline";

// const ParasolLogo = require('/public/images/logos/parasol-logo-mark-reverse-rgb.svg');

type NftDetails = {
	poster?: string,
	video: string,
	name: string,
	amount: number,
	vestingPeriod: number,
	offset?: number
}

const NftCard = ({name, amount, poster, video, vestingPeriod, offset}: NftDetails) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const playVideo = () => videoRef.current && videoRef.current.play();
	const pauseVideo = () => videoRef.current && videoRef.current.pause();
	return <article
		onMouseOver={playVideo}
		onMouseOut={pauseVideo}
		className={`mt-${offset} cursor-pointer relative mx-4 lg:mx-0 flex-col bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg overflow-hidden`}>
		<div className="">
			<div className="relative">
				<span className="absolute top-0 right-0 m-3 items-center justify-center px-2 py-1 font-medium leading-none indigo-500 bg-purple-500 bg-opacity-50 rounded">8/12</span>
				<video ref={videoRef} preload="auto" poster={poster} loop className="w-full">
					<source src={video} />
				</video>
			</div>
			<div className="px-6 py-7 flex flex-col gap-y-5 items-start">
				<h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-white text-gray-800">
					{name}
				</h3>
				<div className="flex items-baseline text-4xl xl:text-4xl lg:text-2xl font-extrabold">
					<span className="flex text-white gap-x-3 items-center">
						<img className="h-8" src="/images/logos/parasol-logo-mark-full-color-rgb.svg" alt="psol" />
						<div className="flex items-end gap-x-2">
							{amount > 10000 ? (amount / 1000).toLocaleString('en-US', {minimumFractionDigits: 0}) + "K" : amount.toLocaleString('en-US', {minimumFractionDigits: 0})}
							<span className="text-2xl font-medium text-gray-200">PSOL</span>
						</div>
					</span>
				</div>
				<p className="text-gray-200">
					Guaranteed allocation of the amount of 210 PSOL in dollars at the time of the participation.
				</p>
				<ul className="space-y-4" role="list">
					<li className="flex items-start">
						<div className="flex-shrink-0">
							<svg aria-hidden="true" className="h-6 w-6 text-purple-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
							</svg>
						</div>
						<p className="ml-3 text-base text-gray-200">
							<span className="font-bold">Dynamic Vesting Period:</span> {vestingPeriod} weeks
						</p>
					</li>
					<li className="flex items-start">
						<div className="flex-shrink-0">
							<svg aria-hidden="true" className="h-6 w-6 text-purple-2" fill="none"
							     stroke="currentColor" viewBox="0 0 24 24"
							     xmlns="http://www.w3.org/2000/svg">
								<path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
							</svg>
						</div>
						<p className="ml-3 text-base text-gray-200">
							<span className="font-bold">Starting Vesting Fees:</span> 21%
						</p>
					</li>
				</ul>
				<button className="flex gap-x-2 items-center justify-center w-full whitespace-nowrap bg-gradient-to-r from-purple-1 to-purple-2 font-medium rounded-md p-3 hover:bg-white hover:text-purple-2">
					<ShoppingBagIcon className="h-5" />
					{/*<img className="h-4" src="/images/logos/parasol-logo-mark-reverse-rgb.svg" alt="psol" />*/}
					Buy NFT Access Key
				</button>
				{/*<button className="bg-purple-2 rounded-lg w-full py-3">ds</button>*/}
			</div>
		</div>
		{/*<div className="flex-1 flex flex-col justify-between px-6 gap-y-4">*/}
		{/*	*/}
		{/*	<div className="rounded-md shadow">*/}
		{/*		/!*<OrderButton v-if="bonusLevel === 1" :name="name" :amount="price / 1.05"/>*!/*/}
		{/*		/!*<OrderButton v-else-if="bonusLevel === 2" :name="name" :amount="price * 0.85"/>*!/*/}
		{/*		/!*<OrderButton v-else :name="name" :amount="price"/>*!/*/}
		{/*	</div>*/}
		{/*</div>*/}
	</article>;
}
export default NftCard;
