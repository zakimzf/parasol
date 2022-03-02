import Link from "next/link"

import Container from "../container";

const EyeCatcher = () =>
  <section>
    <Container>
      <div
        className="relative rounded-2xl px-6 py-10 bg-gradient-to-r from-purple-1 to-purple-2 overflow-hidden shadow-xl sm:px-12 sm:py-14">
        <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
            <path className="text-white text-opacity-10" fill="currentColor"
              d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
            <path className="text-purple-500 text-opacity-20" fill="currentColor"
              d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
          </svg>
        </div>
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold mb-5 tracking-tight">
              About Our NFT Access Keys
            </h2>
            <div className="mx-auto max-w-5xl text-lg">
              <p>
                Parasol Finance adopting a unique and never before seen mechanism for our
                upcoming IDO launchpad, we provide tiers system as NFT that
                will represent a user&apos;s share of upcoming IDO sales and will be directly
                used to purchase IDO tokens based on the user&apos;s NFT.
                <Link href="/" passHref>
                  <a className="font-bold ml-3">
                    <span className="underline">Get NFT Access Key Now</span>
                    &rarr;
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>

export default EyeCatcher;