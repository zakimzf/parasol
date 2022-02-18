import Heading from "../components/slices/heading";

export default () =>
    <>
        <Heading tagline={"Get in Touch"} title={"Contact Parasol Finance"}
                 description="Something to tell us, please use please the form below."/>
        <section>
            <div className={"max-w-2xl mx-auto"}>
                <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium">
                            First name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="py-3 px-4 block w-full text-gray-800 shadow-sm focus:ring-purple-2 focus:border-purple-2 border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium">
                            Last name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="py-3 px-4 block w-full text-gray-800 shadow-sm focus:ring-purple-2 focus:border-purple-2 border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-medium">
                            Company
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="company"
                                id="company"
                                autoComplete="organization"
                                className="py-3 px-4 block w-full text-gray-800 shadow-sm focus:ring-purple-2 focus:border-purple-2 border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="py-3 px-4 block w-full text-gray-800 shadow-sm focus:ring-purple-2 focus:border-purple-2 border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium">
                            Message
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="py-3 px-4 block w-full shadow-sm focus:ring-purple-2 focus:border-purple-2 border border-gray-300 rounded-md"
                                defaultValue={''}/>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>
