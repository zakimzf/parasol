import Heading from "../components/heading";
import Head from "next/head";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ChatAltIcon } from "@heroicons/react/solid";

const Contact = () => (
  <>
    <Head>
      <title>Parasol Finance ($PSOL) | Contact Us</title>
      <meta name="title" content="Parasol Finance ($PSOL) | Contact Us"/>
      <meta property="og:image" content="/images/preview/contact.png"/>
      <meta property="twitter:image" content="/images/preview/contact.png"/>
    </Head>
    <Heading tagline={"Get in Touch"} title={"Contact Parasol Finance"}
      description="You want to write to us then use the form below."/>
    <section>
      <div className={"max-w-2xl mx-auto"}>
        <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="complete-name" className="block text-sm font-medium">
              Complete Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="complete-name"
                id="complete-name"
                autoComplete="given-name"
                className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md"/>
            </div>
          </div>
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium">
              Email Address
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="family-name"
                className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md"/>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium">
              Subject
            </label>
            <div className="mt-1">
              <input
                id="subject"
                name="subject"
                type="text"
                autoComplete="email"
                className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md"/>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <div className="mt-1">
              <TextareaAutosize
                id="message"
                name="message"
                minRows={5}
                className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md"
                defaultValue={""}/>
            </div>
          </div>
          <div className={"col-span-2 flex justify-center gap-x-3 mt-6"}>
            <button type={"submit"}
              className={"inline-flex items-center gap-x-2 justify-center bg-purple-2 text-white hover:bg-white hover:text-purple-2 px-5 py-3 text-base font-medium rounded-md"}>
              <ChatAltIcon className={"w-5"}/>
              Submit Message
            </button>
            <button type={"reset"}
              className={"inline-flex items-center gap-x-2 justify-center bg-white text-purple-2 hover:bg-purple-2 hover:text-white px-5 py-3 text-base font-medium rounded-md"}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  </>
)

export default Contact;