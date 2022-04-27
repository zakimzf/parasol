import Heading from "../components/heading";
import Head from "next/head";
import React, { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ChatAltIcon } from "@heroicons/react/solid";
import { errClasses } from "../utils/functions";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Contact = () => {
  const contactCollectionRef = collection(db, "contacts");
  const sitekey:any = process.env.HCAPTCHA_SITE_KEY;

  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    created: Timestamp.now(),
  });

  const [errors, setErrors] = useState<any>([]);

  const [sendStatus, setSendStatus] = useState(0);

  const handleChange = (e: any) => {
    e.preventDefault();
    let { name, value, classList } = e.target;

    if (classList.contains("required_") && !value.trim()) {
      classList.add(...errClasses);
      errors[name] = "This field is required";
    }
    else {
      classList.remove(...errClasses);
      errors[name] = "";
    }

    setValues({ ...values, [name]: value });
  };

  const [token, setToken] = useState<any>(null);
  const captchaRef: any = useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSendStatus(1);

    const _errors: any = [];

    let elements: any = document.getElementsByClassName("required_");
    for (let el of elements) {
      const { name, value } = el;
      if (!value.trim()) {
        _errors[name] = "This field is required";
        el.classList.add(...errClasses);
      }
      else el.classList.remove(...errClasses);
    }
    setErrors(_errors);

    if (Object.keys(_errors).length == 0) {
      if (token) {
        await addDoc(contactCollectionRef, values);
        setSendStatus(2);
      }
      else {
        captchaRef.current.execute();
        setSendStatus(0);
      }
    }
    else {
      setSendStatus(0);
    }
  };

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | Contact Us</title>
        <meta name="title" content="Parasol Finance ($PSOL) | Contact Us" />
        <meta property="og:image" content="/assets/preview/contact.png" />
        <meta property="twitter:image" content="/assets/preview/contact.png" />
      </Head>
      <Heading
        tagline={"Get in Touch"}
        title={"Contact Parasol Finance"}
        description="You want to write to us then use the form below."
      />
      <section>
        <div className={"max-w-3xl mx-auto"}>
          {sendStatus == 2 ? (
            <div className="p-3 text-center relative bg-purple-2 -bg-gradient-to-r from-purple-1 to-purple-2 rounded-full">
              Thank you for contacting us. Our team will reply as soon as
              possible.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 px-6 sm:grid-cols-2 sm:gap-x-6 sm:px-5"
            >
              <div className="relative">
                <label
                  htmlFor="complete-name"
                  className="block text-sm font-medium"
                >
                  Complete Name <span className="text-purple-2">*</span>
                </label>
                <div className="mt-1 mb-5">
                  <input
                    onChange={handleChange}
                    value={values.name}
                    type="text"
                    name="name"
                    id="complete-name"
                    autoComplete="given-name"
                    className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md required_"
                  />

                  {errors.name && (
                    <>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                        {errors.name}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium"
                >
                  Email Address <span className="text-purple-2">*</span>
                </label>
                <div className="mt-1 mb-5">
                  <input
                    onChange={handleChange}
                    value={values.email}
                    type="email"
                    name="email"
                    id="email-address"
                    autoComplete="family-name"
                    className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md required_"
                  />

                  {errors.email && (
                    <>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                        {errors.email}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-2 relative">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject <span className="text-purple-2">*</span>
                </label>
                <div className="mt-1 mb-5">
                  <input
                    onChange={handleChange}
                    value={values.subject}
                    id="subject"
                    name="subject"
                    type="text"
                    autoComplete="email"
                    className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md required_"
                  />

                  {errors.subject && (
                    <>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                        {errors.subject}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-span-2 relative">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message <span className="text-purple-2">*</span>
                </label>
                <div className="mt-1 mb-5">
                  <TextareaAutosize
                    onChange={handleChange}
                    value={values.message}
                    id="message"
                    name="message"
                    minRows={5}
                    className="py-3 px-4 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-md required_"
                  />

                  {errors.message && (
                    <>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-2 text-sm text-red-600 sm:col-span-6">
                        {errors.message}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className={"col-span-2 flex justify-center gap-x-3 mt-5"}>
                <HCaptcha
                  sitekey={sitekey}
                  onVerify={setToken}
                  theme={"dark"}
                  ref={captchaRef}
                />
              </div>

              <div className={"col-span-2 flex justify-center gap-x-3 mt-3"}>
                <button
                  type={"submit"}
                  className={"button"}
                  disabled={sendStatus == 1}>
                  {sendStatus == 1 ? (
                    "Sending..."
                  ) : (
                    <>
                      <ChatAltIcon className={"w-5"} /> Submit Message
                    </>
                  )}
                </button>
                <button
                  type={"reset"}
                  className={"button"}
                >
                  Clear
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
