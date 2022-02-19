import Container from "../container";

export default () =>
	<section>
		<Container>
			<div className="relative py-10 px-6 bg-gradient-to-r from-purple-1 to-purple-2 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center">
				<div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
					<svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice"
					     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
						<path className="text-white text-opacity-10" fill="currentColor"
						      d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
						<path className="text-purple-500 text-opacity-20" fill="currentColor"
						      d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
					</svg>
				</div>
				<div className="relative flex items-center flex-1">
					<div className="lg:w-0 lg:flex-1">
						<h2 className="text-3xl font-extrabold tracking-tight text-white">Sign up for our
							newsletter</h2>
						<p className="mt-4 max-w-3xl text-lg text-indigo-100">Anim aute id magna aliqua ad ad non
							deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat.</p>
					</div>
					<div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
						<form className="sm:flex">
							<label htmlFor="email-address" className="sr-only">Email address</label>
							<input id="email-address" name="email-address" type="email" autoComplete="email" required className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md" placeholder="Enter your email" />
							<button type="submit" className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-2 bg-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0">Notify
								me
							</button>
						</form>
						<p className="mt-3 text-sm text-indigo-100">
							We care about the protection of your data. Read our
							<a href="#" className="text-white font-medium underline"> Privacy Policy. </a>
						</p>
					</div>
				</div>
			</div>
		</Container>
	</section>
