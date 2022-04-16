import Container from "./container";

type HeadingDetails = {
  tagline?: string,
  title: string,
  description?: string,
  leftAligned?: boolean
}

const Heading = ({ title, tagline, description, leftAligned }: HeadingDetails) =>
  <section>
    <Container>
      <div className={`${leftAligned ? "text-left" : "text-center"} pt-10 pb-14`}>
        <h2 className="text-base font-semibold tracking-wider mb-3 text-purple-400 uppercase">{tagline}</h2>
        <a id="features" className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">{title}</a>
        <p className="mt-5 text-sm lg:text-base text-gray-200">{description}</p>
      </div>
    </Container>
  </section>

export default Heading;
