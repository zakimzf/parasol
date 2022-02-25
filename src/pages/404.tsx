import Link from 'next/link';
import { ArrowLeftIcon } from "@heroicons/react/outline";

export default () =>
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
              <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-2 hover:bg-white hover:text-purple-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <ArrowLeftIcon className="h-5 mr-2" />
                Back Home
              </a>
            </Link>
            {/*<a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-2 bg-white hover:bg-purple-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Contact*/}
            {/*	support*/}
            {/*</a>*/}
          </div>
        </div>
      </main>
    </div>
  </div>
