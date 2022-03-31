import Image from "next/image";

import Container from "../container";
import { people } from "../../constants";

const Team = () => (
  <section>
    <Container>
      <div className="space-y-12">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Our Team</h2>
          <p className="text-xl text-gray-300">
						Here is our team composed of the most brilliant wankers
          </p>
        </div>
        <ul role="list"
				    className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
          {people.map((person) => (
            <li key={person.name}>
              <div className="space-y-4">
                <Image className="object-cover shadow-lg rounded-xl" src={person.picture} alt={person.name}/>
                <div className="space-y-2">
                  <div className="text-lg leading-6 font-medium space-y-1 mb-3">
                    <h3>{person.name}</h3>
                    <p className="text-purple-2">{person.role}</p>
                  </div>
                  <ul role="list" className="flex space-x-5">
                    {person.twitter && <li>
                      <a href={person.twitter}
                        className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                      </a>
                    </li>}
                    {person.linkedin && <li>
                      <a href={person.linkedin}
                        className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>}
                    {person.github && <li>
                      <a href={person.github}
                        className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">GitHub</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                          viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd"
                            d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                            fill="currentColor"/>
                        </svg>
                      </a>
                    </li>}
                    {person.telegram && <li>
                      <a href={person.telegram}
                        className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Telegram</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={"h-5 w-5"}
                          viewBox="0 0 24 24">
                          <path
                            d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"
                            fill={"currentColor"}/>
                        </svg>
                      </a>
                    </li>}
                    {person.discord && <li>
                      <a href={person.discord}
                        className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Discord</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={"h-5 w-5"}
                          viewBox="0 0 24 24">
                          <path
                            d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
                            fill={"currentColor"}/>
                        </svg>
                      </a>
                    </li>}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
)

export default Team;
