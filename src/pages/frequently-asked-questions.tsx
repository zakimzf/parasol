import {Disclosure} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/outline'
import Heading from "../components/utils/heading";

const faqs = [
    {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    // More questions...
]

export default () =>
    <>
        <Heading tagline={"Getting Help"} title={"Frequently Asked Questions"}
                 description={"The most common questions are answered below."}/>
        <section>
            <div className={"max-w-3xl mx-auto"}>
                <dl className="mt-6 space-y-6 divide-y divide-gray-500">
                    {faqs.map((faq) => <Disclosure as="div" key={faq.question} className="pt-6">
                        {({open}) => (
                            <>
                                <dt className="text-lg">
                                    <Disclosure.Button
                                        className="text-left w-full flex justify-between items-start ">
                                        <span className="font-medium text-white">{faq.question}</span>
                                        <span className="ml-6 h-7 flex items-center">
                                            <ChevronDownIcon
                                                className={`h-6 w-6 transform ${open ? '-rotate-180' : 'rotate-0'}`}
                                                aria-hidden="true"/>
                                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                    <p className="text-base ">{faq.answer}</p>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>)}
                </dl>
            </div>
        </section>
    </>
