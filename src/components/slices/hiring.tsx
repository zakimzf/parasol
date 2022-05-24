import Container from "components/container";

const Hiring = () => (
  <div className="relative">
    <div className="absolute inset-x-0 bottom-0 h-1/2 " />
    <Container>
      <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
            alt="People working"
          />
          <div className="absolute inset-0 bg-purple-2 mix-blend-multiply" />
        </div>
        <div className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-center text-4xl filter drop-shadow-xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">We Are </span>
            <span className="text-purple-300">Hiring</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-center text-xl sm:max-w-3xl">
            We are always looking for new qualified people, so don&apos;t hesitate to contact us!
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <a href="mailto:contact@parasol.finance"
              className="button !bg-none bg-white bg-opacity-30 text-white py-3">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Container>
  </div>
)

export default Hiring;