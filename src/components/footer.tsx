import Link from "next/link";
import Image from "next/image";

const Logo = require("/public/assets/logos/parasol-logo-inverted-rgb.svg");

const Footer = () => (
  <footer className="bg-[#231f38]-bg-opacity-40-pt-10 mt-12">
    <div className={"mx-auto grid max-w-7xl grid-cols-3 px-5 py-5 lg:py-10"}>
      <div className="col-span-12 flex flex-col items-center justify-center space-y-8 lg:col-span-1 lg:items-start">
        <Link href={"/"}>
          <a className="flex flex-shrink-0 items-center">
            <Image src={Logo} className="h-5" alt={"logo"} />
          </a>
        </Link>
        <p className="text-center text-base sm:text-left">
          Parasol Finance is the first-ever community governed IDO platform
          built on Solana with the needs of both projects and investors alike.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/parasol-finance"
            target="_blank"
            className="hover:text-gray-100"
            rel="noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com/parasol_finance"
            target="_blank"
            className="hover:text-gray-100"
            rel="noreferrer"
          >
            <span className="sr-only">Twitter</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="https://t.me/parasolfinance"
            target="_blank"
            className="hover:text-gray-100"
            rel="noreferrer"
          >
            <span className="sr-only">Telegram</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
            </svg>
          </a>
          <a
            href="https://discord.gg/JBzVvUVZPn"
            target="_blank"
            className="hover:text-gray-100"
            rel="noreferrer"
          >
            <span className="sr-only">Discord</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.593 10.971c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055.011-.581-.427-1.055-.968-1.055zm3.468 0c-.542 0-.969.475-.969 1.055 0 .578.437 1.055.969 1.055.541 0 .968-.477.968-1.055-.001-.581-.427-1.055-.968-1.055z" />
              <path d="M17.678 3H4.947A1.952 1.952 0 0 0 3 4.957v12.844c0 1.083.874 1.957 1.947 1.957H15.72l-.505-1.759 1.217 1.131 1.149 1.064L19.625 22V4.957A1.952 1.952 0 0 0 17.678 3zM14.01 15.407s-.342-.408-.626-.771c1.244-.352 1.719-1.13 1.719-1.13-.39.256-.76.438-1.093.562a6.679 6.679 0 0 1-3.838.398 7.944 7.944 0 0 1-1.396-.41 5.402 5.402 0 0 1-.693-.321c-.029-.021-.057-.029-.085-.048a.117.117 0 0 1-.039-.03c-.171-.094-.266-.16-.266-.16s.456.76 1.663 1.121c-.285.36-.637.789-.637.789-2.099-.067-2.896-1.444-2.896-1.444 0-3.059 1.368-5.538 1.368-5.538 1.368-1.027 2.669-.998 2.669-.998l.095.114c-1.71.495-2.499 1.245-2.499 1.245s.21-.114.561-.275c1.016-.446 1.823-.57 2.156-.599.057-.009.105-.019.162-.019a7.756 7.756 0 0 1 4.778.893s-.751-.712-2.366-1.206l.133-.152s1.302-.029 2.669.998c0 0 1.368 2.479 1.368 5.538 0-.001-.807 1.376-2.907 1.443z" />
            </svg>
          </a>
          <a
            href="https://parasol-finance.medium.com/"
            target="_blank"
            className="hover:text-gray-100"
            rel="noreferrer"
          >
            <span className="sr-only">Medium</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M4.285 7.269a.733.733 0 0 0-.24-.619l-1.77-2.133v-.32h5.498l4.25 9.32 3.736-9.32H21v.319l-1.515 1.451a.45.45 0 0 0-.168.425v10.666a.448.448 0 0 0 .168.425l1.479 1.451v.319h-7.436v-.319l1.529-1.487c.152-.15.152-.195.152-.424V8.401L10.95 19.218h-.575L5.417 8.401v7.249c-.041.305.06.612.275.833L7.684 18.9v.319H2.036V18.9l1.992-2.417a.971.971 0 0 0 .257-.833V7.269z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mt-12 hidden grid-cols-2 gap-8 text-right lg:col-span-2 lg:grid xl:col-span-2 xl:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm font-bold  uppercase tracking-wider">
              Parasol Finance
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link href={"/about"}>
                  <a className="text-base">About Parasol</a>
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.parasol.finance"
                  target="_blank"
                  className="text-base"
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/parasol-finance"
                  target="_blank"
                  className="text-base"
                  rel="noreferrer"
                >
                  Github Organization
                </a>
              </li>
              <li>
                <a
                  href="https://explorer.solana.com/address/PFo38bhqnYn9ntEs6GHN5LAi26QX1tBxMabmqu5LtX9"
                  target="_blank"
                  className="text-base"
                  rel="noreferrer"
                >
                  Token Address
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-bold  uppercase tracking-wider">
              Useful Links
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link href={"/projects/submit"}>
                  <a className="text-base" rel="noreferrer">
                    Apply for IDO
                  </a>
                </Link>
              </li>
              <li>
                <a href="/whitepaper.pdf" className="text-base">
                  WhitePaper
                </a>
              </li>
              <li>
                <Link href={"/presskit"}>
                  <a className="text-base">Press Kit</a>
                </Link>
              </li>
              <li>
                <Link href={"/tiers"}>
                  <a className="text-base">Tiers System</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-sm font-bold  uppercase tracking-wider">
              Social Links
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <a
                  href="https://twitter.com/parasol_finance"
                  className="text-base"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/parasolfinance"
                  className="hover: text-base"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://discord.gg/JBzVvUVZPn" className="text-base">
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://parasol-finance.medium.com/"
                  className="text-base"
                >
                  Medium
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-sm font-bold  uppercase tracking-wider">
              Legal
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link href={"/contact"}>
                  <a className="text-base">Contact Us</a>
                </Link>
              </li>
              {/*<li>*/}
              {/*  <Link href={"/terms-of-service"}>*/}
              {/*    <a className="text-base">Terms of Service</a>*/}
              {/*  </Link>*/}
              {/*</li>*/}
              <li>
                <Link href={"/privacy-policy"}>
                  <a className="text-base">Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 text-sm lg:grid-cols-2 lg:gap-0 lg:text-base">
        <p className="text-center lg:text-left">
          Copyright &copy; {new Date().getFullYear()} Parasol Finance. All
          rights reserved.
        </p>
        <p className="flex flex-1 items-center justify-end gap-x-3 text-center lg:text-right">
          <span>
            Build with
            <svg
              className="mx-2 mb-1 inline h-5 w-5 text-purple-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            in Europe
          </span>
          <span>|</span>
          <a
            className={"inline-flex items-center justify-center gap-x-1"}
            href={"https://github.com/parasol-finance/application"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Official GitHub
          </a>
          <span>|</span>
          <span>
            Crafted by{" "}
            <a
              href={"https://twitter.com/thisisclint21"}
              className={"font-medium"}
              target={"_blank"}
              rel={"noreferrer"}
            >
              Clint ⚡️
            </a>
          </span>
        </p>
      </div>
    </div>
  </footer>
);
export default Footer;
