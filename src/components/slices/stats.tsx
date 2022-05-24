import Container from "components/container";

const Stats = () => (
  <section>
    <Container>
      <div className="max-w-4xl mx-auto">
        <dl className="sm:grid sm:grid-cols-3">
          <div
            className="flex flex-col text-center">
            <dt className="order-2 mt-2 text-2xl leading-6 font-medium text-gray-200">Project Launched</dt>
            <dd className="order-1 text-5xl font-extrabold text-purple-2">270</dd>
          </div>
          <div
            className="flex flex-col border-t border-b border-purple-2 text-center sm:border-0 sm:border-l">
            <dt className="order-2 mt-2 text-2xl leading-6 font-medium text-gray-200">Average ROI</dt>
            <dd className="order-1 text-5xl font-extrabold text-purple-2">210%</dd>
          </div>
          <div
            className="flex flex-col border-t border-purple-2 text-center sm:border-0 sm:border-l">
            <dt className="order-2 mt-2 text-2xl leading-6 font-medium text-gray-200">Upcoming Drug</dt>
            <dd className="order-1 text-5xl font-extrabold text-purple-2">750</dd>
          </div>
        </dl>
      </div>
    </Container>
  </section>
)

export default Stats