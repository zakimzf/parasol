import Container from "../utils/container";

type HeadingDetails = {
	tagline?: string,
	title: string,
	description?: string
}

const Heading = ({title, tagline, description}: HeadingDetails) =>
	<Container>
		<div className="text-center pb-14">
			<h2 className="text-base font-semibold tracking-wider text-purple-400 uppercase">{tagline}</h2>
			<a id="features" className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">{title}</a>
			<p className="mt-5 max-w-prose mx-auto text-sm lg:text-base text-gray-200">{description}</p>
		</div>
	</Container>

export default Heading;
