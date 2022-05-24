import React from "react";
import Link from "next/link";
import Head from "next/head";

import { ArrowLeftIcon } from "@heroicons/react/outline";

const Page404 = () => (
  <>
    <Head>
      <title>Parasol Finance ($PSOL) | 404 Page Not Found</title>
      <meta name="title" content="Parasol Finance ($PSOL) | 404 Page Not Found" />
      <meta property="og:image" content="/assets/preview/404.png" />
      <meta property="twitter:image" content="/assets/preview/404.png" />
    </Head>
    <div className="relative pt-48 pb-32">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-purple-2 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold mb-3 text-white tracking-tight sm:text-5xl">
                Page Not Found
              </h1>
              <p className="mt-1 text-base">
                Please check if you are not drunk or worst.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link href={"/"}>
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-2 hover:bg-white hover:text-purple-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-2">
                  <ArrowLeftIcon className="h-5 mr-2" />
                  Back Home
                </a>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>
)

export default Page404;