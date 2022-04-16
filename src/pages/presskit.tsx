import Container from "../components/container";
import Heading from "../components/heading";

const assets = [
  {
    title: "Logo Mark Full Color",
    filename: "parasol-logo-mark-full-color-rgb.svg",
    source: "/assets/logos/parasol-logo-mark-full-color-rgb.svg",
  },
  {
    title: "Logo Mark Reverse",
    filename: "parasol-logo-mark-reverse-rgb.svg",
    source: "/assets/logos/parasol-logo-mark-reverse-rgb.svg",
  },
  {
    title: "Logo Inverted RGB",
    filename: "parasol-logo-inverted-rgb.svg",
    source: "/assets/logos/parasol-logo-inverted-rgb.svg",
  },
  {
    title: "Logo Reverse RGB",
    filename: "parasol-logo-reverse-rgb.svg",
    source: "/assets/logos/parasol-logo-reverse-rgb.svg",
  },
]

const otherAssets = [
  {
    title: "White Paper",
    filename: "whitepaper.pdf",
    preview: "https://i.imgur.com/0MDfXcW.jpg",
    source: "/whitepaper.pdf",
  },
  {
    title: "Parasol Finance Guidelines",
    filename: "parasol-finance-guidelines.pdf",
    preview: "https://i.imgur.com/TCoBN6O.jpg",
    source: "/assets/parasol-finance-guidelines.pdf",
  }
]

const PressKit = () => {
  return (
    <>
      <Heading tagline={"Parasol Finance"} title={"Official Branding Kit"} description={"The assets you need to talk about us."} />
      <section>
        <Container>
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {assets.map((asset) => (
              <li key={asset.source} className="relative">
                <a href={asset.source} target={"_blank"} rel="noreferrer">
                  <div className="group flex items-center justify-center w-full aspect-square rounded-lg bg-white bg-opacity-10 p-6 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                    <img src={asset.source} alt="" className="m-3 pointer-events-none group-hover:opacity-75" />
                    <button type="button" className="absolute inset-0 focus:outline-none">
                      <span className="sr-only">View details for {asset.title}</span>
                    </button>
                  </div>
                  <p className="mt-2 block text-sm font-medium truncate pointer-events-none">{asset.title}</p>
                  <p className="block text-sm font-medium text-gray-400 pointer-events-none">{asset.filename}</p>
                </a>
              </li>
            ))}
          </ul>
          <div className={"flex-row pt-12 pb-16"}>
            <h1 className={"mb-3"}>&#x2E3B;</h1>
            <a className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">Other Resources</a>
          </div>
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {otherAssets.map((asset) => (
              <li key={asset.source} className="relative">
                <a href={asset.source} target={"_blank"} rel="noreferrer">
                  <div className="group flex items-center justify-center w-full aspect-square rounded-lg bg-white bg-opacity-10 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                    <img src={asset.preview} alt="" className="object-fill pointer-events-none group-hover:opacity-75" />
                    <button type="button" className="absolute inset-0 focus:outline-none">
                      <span className="sr-only">View details for {asset.title}</span>
                    </button>
                  </div>
                  <p className="mt-2 block text-sm font-medium truncate pointer-events-none">{asset.title}</p>
                  <p className="block text-sm font-medium text-gray-400 pointer-events-none">{asset.filename}</p>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}

export default PressKit;