import Container from "../../../components/container";

const ParticipateIDO = () => {
  return (
    <section className={"py-6"}>
      <Container>
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8">
            <h1 className="text-4xl mb-2 font-extrabold">
              <span
                className="text-transparent bg-clip-text bg-purple-2 leading-normal whitespace-nowrap inline-block">
                Parasol Finance
              </span>
              <span className="text-white">| Presale | Phase 3</span>
            </h1>
            <p className="text-lg font-semibold mb-3">
              The First Community Governed IDO Platform on Solana.
            </p>
            <p className="text-gray-200 mb-5">
              Parasol Finance is the first-ever community governed IDO platform built on Solana with the needs
              of both projects and investors alike.
            </p>
            <p className="text-gray-200 text-sm mb-0 font-medium text-yellow-300">
              <span className="text-yellow-300">⚠️</span>
              This is the last phase of our presale and ends on 1st of January 2022 at 21:00:00 GMT
            </p>
            <div>
              <div className="flex justify-between my-10 mr-5">
                <div className="flex items-center">
                  <div className="mr-4">
                    <img alt="USDC" className="w-10" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"/>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Hard Cap of Phase 3</p>
                    <h4 className="text-xl whitespace-nowrap">308,700 USDC</h4>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img alt="USDC" className="w-10" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"/>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Token Price</p>
                    <h4 className="text-xl whitespace-nowrap">0.35 USDC</h4>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img alt="PSOL" className="w-10" src="https://parasol.finance/icon.png"/>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Available Tokens</p>
                    <h4 className="text-xl whitespace-nowrap">882,000 PSOL</h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-gray-300 text-sm mb-3">
                    {/*{{this.toUsd(this.totalParticipation)}}*/}
                    {/*({{this.getParticipationProgress()}} %)*/}
                    —
                    <a href="https://explorer.solana.com/address/PaRaxU6dFX8ZeMPAvW7mXVhJ2UQokrqJhvY9hqyzRjA" className="text-pink-500" target="_blank" rel="noreferrer">
                      See on Explorer
                    </a>
                  </p>
                  <p className="text-gray-300 text-sm mb-3">Total Hard Cap: $1,142,190</p>
                </div>
                <div className="w-full bg-gray-400 mb-6 rounded-full h-2.5">
                  <div className="bg-purple-2 h-2.5 rounded-full"/>
                </div>
              </div>
              {/*<div v-else>*/}
              {/*  <div className="flex justify-between">*/}
              {/*    <p className="text-gray-300 text-sm mb-3">{{this.toUsd(this.totalParticipation)}}*/}
              {/*      (100 %)*/}
              {/*      —*/}
              {/*      <a href="https://explorer.solana.com/address/PaRaxU6dFX8ZeMPAvW7mXVhJ2UQokrqJhvY9hqyzRjA" className="text-pink-500" target="_blank">*/}
              {/*        See on Explorer*/}
              {/*      </a>*/}
              {/*    </p>*/}
              {/*    <p className="text-gray-300 text-sm mb-3">Total Hard Cap: $1,142,190</p>*/}
              {/*  </div>*/}
              {/*  <div className="w-full bg-gray-400 mb-6 rounded-full h-2.5">*/}
              {/*    <div className="bg-purple-2 h-2.5 rounded-full" style="width: 100%"></div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <p className="text-gray-300 text-sm mb-3">Amount to Buy (in USDC)</p>
              <form className="flex gap-2 w-100 mb-10 items-stretch">
                <div className="relative flex items-stretch flex-1">
                  <input type="number" v-model="amount" required min="10" v-maska="'#######'" value="0" name="quantity" id="quantity" className="bg-gray-900 bg-opacity-40 border-gray-800 block w-full pr-12 rounded"/>
                  <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center rounded px-2 text-sm font-sans font-medium text-gray-400">
                      <img alt="USDC" className="w-4 mr-1" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"/>
                      USDC
                    </kbd>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </div>
                <div className="relative flex items-stretch flex-1">
                  <input type="number" readOnly value="0" className="bg-gray-900 bg-opacity-40 border-gray-800 focus:ring-0 focus:outline-0 focus:border-0 block w-full pr-12 rounded"/>
                  <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center rounded px-2 text-sm font-sans font-medium text-gray-400">
                      <img alt="PSOL" className="w-4 mr-1" src="https://raw.githubusercontent.com/parasol-finance/white-paper/main/logo.png"/>
                      PSOL
                    </kbd>
                  </div>
                </div>
                <button type="submit" className="flex items-center px-7 focus:outline-none focus:ring-2 focus:ring-offset-2 text-xs font-medium rounded shadow-sm bg-purple-2 text-white">
                  Participate in Presale
                </button>
              </form>
            </div>
            <h3 className="text-gray-200 text-xl mb-3">Conditions of Participation:</h3>
            <p className="text-gray-400 text-sm mb-5">You can read all our conditions of participation in our documentation at <a href="https://docs.parasol.finance/parasol-presale/how-to-participate-in-presale" className="text-pink-500" target="_blank" rel="noreferrer">docs.parasol.finance</a>.
            </p>
          </div>
          <div className="col-span-4">
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-opacity-70 bg-purple-2" aria-hidden="true"/>
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-purple-2 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between space-x-4">
                        <div>
                          <h3 className="text-base text-gray-200">Preparation</h3>
                          <p className="text-gray-400 text-sm">
                            This project is in preparation phase. Stay tuned.
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime="2020-09-20">Now</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-500"/>
                    <div className="relative flex space-x-4">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-purple-2 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between space-x-4">
                        <div>
                          <h3 className="text-base text-gray-200">Presale Opening</h3>
                          <p className="text-gray-400 text-sm">
                            Everybody can order some $PSOL in USDC.
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime="2020-09-22">Dec 12</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-500" aria-hidden="true"/>
                    <div className="relative flex space-x-4">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between space-x-4">
                        <div>
                          <h3 className="text-base text-gray-200">Token Listing</h3>
                          <p className="text-gray-400 text-sm">
                            Listing on different websites like coinmarketcap.com
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime="2020-09-30">Jan 7, 2022</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-4">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg className="h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between space-x-4">
                        <div>
                          <h3 className="text-base text-gray-200">Launching Parasol Finance</h3>
                          <p className="text-gray-400 text-sm">
                            Parasol Finance will be available for everyone.
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime="2020-10-04">Mar 1, 2022</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/*<div v-if="presaleTimeOffset < 0" className="ml-4">*/}
            {/*  <h3 className="text-gray-500 text-xl mt-10 mb-3">Tokens Drop / Claim</h3>*/}
            {/*  <p className="text-gray-500 text-sm mb-5">Once the presale is finished we will send the PSOL tokens to all the addresses that participated.</p>*/}
            {/*</div>*/}
          </div>
          {/*</div>*/}
        </div>
      </Container>
    </section>
  );
}

export default ParticipateIDO;