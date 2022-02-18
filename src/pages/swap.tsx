import {ChevronDownIcon} from "@heroicons/react/outline";
import {useState} from 'react'
import {RadioGroup} from '@headlessui/react'

const routes = [
    {
        name: 'Raydium (95%) + Cropper (5%)',
        amount: 87.6359447,
        route: {
            from: 'USDC',
            to: 'PSOL'
        }
    },
    {
        name: 'Raydium',
        amount: 87.4460887,
        route: {
            from: 'USDC',
            to: 'PSOL'
        }
    }
]

const Swap = function () {
    const [selected, setSelected] = useState(routes[0])
    return <>
        <section className="pt-10 pb-20">
            <div className="flex flex-col gap-y-6 max-w-md mx-auto mt-6">
                <div
                    className="bg-[#231f38] bg-opacity-80 shadow-xl rounded-xl shadow-half-strong border border-gray-800 p-8">
                    <div className={"flex justify-between items-end mb-4"}>
                        <label className="text-sm font-medium">Exchange From:</label>
                        <div className="flex gap-x-2 items-center text-xs font-medium">
                            <label>Balance: 0</label>
                            <button
                                className={"bg-gray-500 text-[9px] bg-opacity-50 uppercase font-bold text-gray-400 px-2 py-[2px] rounded-full hover:bg-opacity-30"}>Half
                            </button>
                            <button
                                className={"bg-gray-500 text-[9px] bg-opacity-50 uppercase font-bold text-gray-400 px-2 py-[2px] rounded-full hover:bg-opacity-30"}>Max
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-stretch bg-white bg-opacity-5 rounded-xl px-4 py-3">
                        <button type="button"
                                className="flex gap-x-2 py-2 px-2 rounded-lg flex items-center hover:bg-gray-500 hover:bg-opacity-10">
                            <img className="w-5 h-5 rounded-full" alt="USDC"
                                 src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"/>
                            <div className="font-semibold" translate={"no"}>USDC</div>
                            <ChevronDownIcon className={"h-5"}/>
                        </button>
                        <input type={"number"} inputMode="decimal" placeholder="0.00"
                               className={"bg-transparent outline-0 ring-0 pr-2 border-transparent font-semibold text-right text-gray-300 text-lg"}/>
                    </div>
                    <svg className={"mx-auto h-4 mt-5 mb-2 text-gray-300"} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M19.3,13.1a.7.7,0,0,1,.5,1.192l-5.427,5.5a.7.7,0,1,1-1-.983L17.626,14.5H.7a.7.7,0,0,1,0-1.4ZM6.62.2a.7.7,0,0,1,.007.99L2.374,5.5H19.3a.7.7,0,0,1,0,1.4H.7A.7.7,0,0,1,.2,5.711L5.63.208A.7.7,0,0,1,6.62.2Z"
                            fill="currentColor"/>
                    </svg>
                    <div className={"flex justify-between items-end mb-4"}>
                        <label className="text-sm font-medium">And Receive:</label>
                        <div className="flex gap-x-2 items-center text-xs font-medium">
                            <label>Balance: 500,000 PSOL</label>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                        <button type="button"
                                className="flex gap-x-2 px-4 py-3 rounded-lg flex items-center bg-gray-500 bg-opacity-10 hover:bg-opacity-20">
                            <img className="w-5 h-5 rounded-full" alt="USDC"
                                 src="https://raw.githubusercontent.com/parasol-finance/white-paper/main/logo.png"/>
                            <div className="font-semibold" translate={"no"}>PSOL</div>
                            <ChevronDownIcon className={"h-5"}/>
                        </button>
                        <div className="font-semibold mr-3 text-gray-300 text-lg">
                            87.6359447
                        </div>
                        {/*<input type={"number"} inputMode="decimal" placeholder="0.00" className={"bg-transparent outline-0 ring-0 pr-2 border-transparent font-semibold text-right text-gray-300 text-lg"} />*/}
                    </div>
                    <div className={"text-center text-gray-500 text-xs my-4"}>
                        5 routes found!
                    </div>
                    <RadioGroup className={"mt-6"} value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                        <div className="space-y-4">
                            {routes.map((route) => (
                                <RadioGroup.Option
                                    key={route.name}
                                    value={route}
                                    className={({active, checked}) =>
                                        `${active ? 'ring-2 ring-offset-2 ring-offset-purple-1 ring-purple-1 ring-opacity-60' : ''}
										 ${checked ? 'border-2 border-purple-2 bg-white bg-opacity-5' : 'border-2 border-transparent bg-white bg-opacity-5'} relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`}>
                                    {({active, checked}) => (
                                        <>
                                            <div className="flex justify-between items-center justify-between w-full">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium ${checked ? 'text-white' : ''}`}>
                                                        {route.name}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={"inline text-gray-400"}>
                                                        <span>
                                                            {route.route.from}
                                                            <span className={"px-2"}>&rarr;</span>
                                                            {route.route.to}
                                                        </span>
                                                    </RadioGroup.Description>
                                                </div>
                                                <div>
                                                    {route.amount}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
                <button
                    className={"bg-gradient-to-r from-purple-1 to-purple-2 shadow-lg px-5 py-4 text-lg font-medium rounded-lg"}>
                    Swap USD to PSOL
                </button>
                <div>
                    <div className="space-y-2 md:space-y-4">
                        <div className="flex items-center justify-between text-xs">
                            <div className="text-black-50 dark:text-white-50">Rate</div>
                            <div className="flex cursor-pointer text-black-50 dark:text-white-50 text-xs align-center">
                                <span
                                    className="min-w-[9.5rem] max-w-full whitespace-nowrap">1 USDC ≈ 8.763594 PSOL</span>
                            </div>
                        </div>
                        <div className="flex text-xs text-black-50 dark:text-white-50 justify-end">
                            <span className="text-[#24AE8F]">Within 0.3%</span>
                            <span className="ml-1" translate="no">CoinGecko</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="text-black-50 dark:text-white-50">Price Impact</div>
                            <div className="text-black-50 dark:text-white-50">&lt; 0.1%</div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="text-black-50 dark:text-white-50">Minimum Received</div>
                            <div className="text-black-50 dark:text-white-50">87.197765 PSOL</div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="text-black-50 dark:text-white-50">
                                <span>Fees paid to <span translate="no">Raydium</span> LP</span>
                            </div>
                            <div className="text-black-50 dark:text-white-50">0.025 USDC (0.25%)</div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="text-black-50 dark:text-white-50">Transaction Fee
                                <span id="popover-trigger-7" aria-haspopup="dialog" aria-expanded="false"
                                      aria-controls="popover-content-7">[?]</span>
                            </div>
                            <div className="text-black-50 dark:text-white-50">0.000005 SOL</div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="text-black-50 dark:text-white-50">Deposit <span id="popover-trigger-141"
                                                                                            aria-haspopup="dialog"
                                                                                            aria-expanded="false"
                                                                                            aria-controls="popover-content-141">[?]</span>
                            </div>
                            <div className="text-black-50 dark:text-white-50 text-xs text-right">
                                <p>0.00203928 SOL for 1 ATA account</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>;
}

export default Swap;
