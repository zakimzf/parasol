import {ChevronDoubleDownIcon, QuestionMarkCircleIcon} from "@heroicons/react/outline";

const Swap = () =>
	<>
		<section className="py-10">
			<div className="max-w-md mx-auto">
				<div className="p-2 rounded-lg bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg sm:p-3">
					<div className="flex items-center justify-between flex-wrap">
						<div className="w-0 flex-1 flex items-center">
          <span className="flex p-2 rounded-lg bg-purple-2">
	          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </span>
							<p className="ml-3 font-medium text-white truncate">
								<span className="md:hidden"> We announced a new product! </span>
								<span className="hidden md:inline"> Big news! We're excited to announce a brand new product. </span>
							</p>
						</div>
						<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
							<button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white">
								<span className="sr-only">Dismiss</span>
								<svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			{/*<div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">*/}
			{/*	<div>*/}
			{/*		<h2 className="text-base font-semibold tracking-wider text-purple-2 uppercase">Parasol Finance</h2>*/}
			{/*		<p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Token Swap</p>*/}
			{/*		<p className="mt-5 max-w-prose mx-auto text-xl text-gray-300">Need to Buy or Sell Parasol Token*/}
			{/*			($PSOL)?</p>*/}
			{/*	</div>*/}
			{/*</div>*/}
			<div className="max-w-md mx-auto mt-6 shadow-2xl text-white rounded-xl overflow-hidden shadow-lg">
				<div className="bg-[#231f38] text-gray-100 px-5 py-6 sm:p-8">
					<div className="flex justify-between items-end pb-3 text-xs text-gray-300">
						<div className="text-sm font-semibold  dark:text-white"><span>You pay</span></div>
						<div className="hidden md:flex">
							<div
								className="flex w-full justify-between items-center text-xs  dark:text-white">
								<span translate="no">Balance: <span translate="no">0</span></span>
								<div>
									<button type="button"
									        className="cursor-not-allowed opacity-50 ml-2 cursor-pointer dark:text-[10px] dark:leading-[14px] py-0.5 px-1 dark:px-2 rounded-xl dark:bg-black-75 dark:text-white-35 font-bold text-jupiter-blue "
									        data-dashlane-rid="259f74659ae25e25">HALF
									</button>
									<button type="button"
									        className="cursor-not-allowed opacity-50 ml-1 cursor-pointer dark:text-[10px] dark:leading-[14px] py-0.5 px-1 dark:px-2 rounded-xl dark:bg-black-75 dark:text-white-35 font-bold text-jupiter-blue "
									        data-dashlane-rid="44c0d7f9dbf8462b">MAX
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white bg-opacity-5 rounded-xl">
						<div className="px-3 border-transparent rounded-xl bg-jupiter-input-light dark:bg-black-25">
							<div>
								<div className="flex flex-col dark:text-white">
									<div className="py-3 flex justify-between items-center">
										<button type="button"
										        className="py-2 px-2 rounded-lg flex items-center hover:bg-gray-100 dark:hover:bg-white-10"
										        data-dashlane-rid="5c95cc28226c3a40">
											<div
												className="w-6 h-6 text-xs flex items-center justify-center rounded-full">
												<img
													src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
													width="24" height="24" className="rounded-full" alt="USDC" /></div>
											<div className="ml-4 mr-2 font-semibold" translate="no">USDC</div>
											<div className=" dark:text-white fill-current">
												<svg width="10" height="6" viewBox="0 0 10 6" fill="inherit"
												     xmlns="http://www.w3.org/2000/svg">
													<path fill-rule="evenodd" clip-rule="evenodd"
													      d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z"
													      fill="inherit" />
												</svg>
											</div>
										</button>
										<input inputMode="decimal" data-lpignore="true" placeholder="0.00"
										       className="h-full w-full bg-transparent dark:text-white text-right font-semibold text-lg"
										       type="text" value="10" data-dashlane-rid="0c53f5e89806715f"
										       data-form-type="other" /></div>
								</div>
							</div>
						</div>
					</div>
					<ChevronDoubleDownIcon className="h-5 my-4 text-gray-300 mx-auto" />
					<div className="flex justify-between pb-0 mt-2 text-xs text-gray-300">
						<div className="text-sm font-semibold  dark:text-white">You receive</div>
						<div className="flex items-center  dark:text-white"><span
							translate="no">Balance: <span translate="no">500,000</span> PSOL</span></div>
					</div>
					<div>
						<div className="flex flex-col dark:text-white">
							<div className="py-3 flex justify-between items-center">
								<button type="button"
								        className="py-2 px-2 rounded-lg flex items-center hover:bg-gray-100 dark:hover:bg-white-10"
								        data-dashlane-rid="81e29d4dd1be74dc" data-form-type="other"
								        data-dashlane-label="true">
									<div className="w-6 h-6 text-xs flex items-center justify-center rounded-full"><img
										src="https://raw.githubusercontent.com/parasol-finance/white-paper/main/logo.png"
										width="24" height="24" className="rounded-full" alt="PSOL" /></div>
									<div className="ml-4 mr-2 font-semibold" translate="no">PSOL</div>
									<div className=" dark:text-white fill-current">
										<svg width="10" height="6" viewBox="0 0 10 6" fill="inherit"
										     xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd"
											      d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z"
											      fill="inherit" />
										</svg>
									</div>
								</button>
							</div>
						</div>
					</div>
					<div><p
						className="text-center text-[rgba(0,0,0,0.5)] text-xs leading-[14px] dark:text-white dark:text-opacity-50">5
						routes found!</p>
						<div className="chakra-collapse"
						>
							<div className="no-scrollbar overflow-hidden">
								<div className="pt-[15px] mt-1 no-scrollbar !overflow-y-hidden"
								>
									<div>
										<div
											className="cursor-pointer relative w-full rounded-lg p-px leading-tight bg-jupiter-gradient dark:bg-jupiter-swap-gradient"
											translate="no"
										>
											<div
												className="absolute px-2 py-1 font-semibold text-white bg-jupiter-yellow dark:bg-jupiter-primary"
											>
											</div>
											<div
												className="flex items-center justify-between p-4 border rounded-lg dark:text-white dark:border-transparent bg-jupiter-input-light text-[13px] bg-white bg-opacity-5">
												<div className="">
													<div className="flex items-center font-semibold"><span
														className="overflow-hidden whitespace-nowrap overflow-ellipsis">Cropper</span>
													</div>
													<div className="flex space-x-1">
														<div
															className="flex space-x-1 -50 dark:text-white-50">
															<div className="font-semibold text-[11px]"><span>USDC</span>
															</div>
															<div className="flex items-center">
																<svg width="10" height="5" viewBox="0 0 10 5"
																     fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M0.112 3.328V2.38H6.016V0.892L9.388 2.848L6.016 4.816V3.328H0.112Z"
																		fill="rgba(255, 255, 255, 0.5)" />
																</svg>
															</div>
														</div>
														<div
															className="flex space-x-1 -50 dark:text-white-50">
															<div className="font-semibold text-[11px]"><span>PSOL</span>
															</div>
														</div>
													</div>
												</div>
												<div className="text-sm"><input inputMode="decimal" data-lpignore="true"
												                                placeholder="0.00"
												                                className="h-full w-full bg-transparent dark:text-white text-right font-semibold text-base"
												                                type="text" value="73.7362587"
												                                data-dashlane-rid="82b8c133400ba3bf"
												                                data-form-type="other" /></div>
											</div>
										</div>
										<div className="cursor-pointer relative w-full rounded-lg p-px leading-tight "
										     translate="no"
										>
											<div
												className="flex items-center justify-between p-4 border rounded-lg dark:text-white dark:border-transparent bg-jupiter-input-light text-[13px] dark:bg-black-25">
												<div className="">
													<div className="flex items-center font-semibold"><span
														className="overflow-hidden whitespace-nowrap overflow-ellipsis">Cropper (95%) + Raydium (5%)</span>
													</div>
													<div className="flex space-x-1">
														<div
															className="flex space-x-1 -50 dark:text-white-50">
															<div className="font-semibold text-[11px]"><span>USDC</span>
															</div>
															<div className="flex items-center">
																<svg width="10" height="5" viewBox="0 0 10 5"
																     fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M0.112 3.328V2.38H6.016V0.892L9.388 2.848L6.016 4.816V3.328H0.112Z"
																		fill="rgba(255, 255, 255, 0.5)" />
																</svg>
															</div>
														</div>
														<div
															className="flex space-x-1 -50 dark:text-white-50">
															<div className="font-semibold text-[11px]"><span>PSOL</span>
															</div>
														</div>
													</div>
												</div>
												<div className="text-sm"><input inputMode="decimal" data-lpignore="true"
												                                placeholder="0.00"
												                                className="h-full w-full bg-transparent dark:text-white text-right font-semibold text-base"
												                                type="text" value="73.7269737"
												                                data-dashlane-rid="2e2c2bf5e7831cc7"
												                                data-form-type="other" /></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex items-center mt-2">
								<button type="button"
								        className="flex items-center text-center text-[rgba(0,0,0,0.5)] text-xs leading-[14px] dark:text-white-35 font-semibold"
								        data-dashlane-rid="afb010e7901b9809" data-dashlane-label="true"
								        data-form-type="other">
									<svg className="mr-2" width="10" height="6" viewBox="0 0 10 6" fill="inherit"
									     xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="event" clip-rule="evenodd"
										      d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31657 -0.0976311 9.70709 0.292893C10.0976 0.683417 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31657 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893Z"
										      fill="currentColor" />
									</svg>
									<span className="text-gray-200">More</span></button>
								<p className="ml-auto text-right sm:text-center text-[rgba(0,0,0,0.5)] text-xs leading-[14px] dark:text-white dark:text-opacity-50">
									<span>from </span><span>71.4</span> <span>to </span><span>73.6201289</span></p>
							</div>
						</div>
					</div>
					{/*<div className="mb-8">*/}
					{/*	<h1 className="mb-1 font-bold text-2xl">Connect a Wallet</h1>*/}
					{/*	<p className="text-gray-200">You have to connect your wallet first.</p>*/}
					{/*</div>*/}
					{/*<div className="grid gap-6 sm:gap-8">*/}
					{/*</div>*/}
				</div>
				<div className="px-5 py-5 bg-[#2a2542] space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
					<div className="flow-root">
						<a href="https://docs.parasol.finance/" target={"_blank"}
						   className="flex items-center font-medium text-gray-200">
							<QuestionMarkCircleIcon className="h-5 text-gray-200" />
							<span className="ml-2">Your wallet is not supported?</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	</>

export default Swap;
