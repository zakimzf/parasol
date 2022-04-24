import React, { FC, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useReminderModal } from "./useReminderModal";
import { BellIcon } from "@heroicons/react/outline";
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";

export const ReminderModal: FC = () => {
  const { reminder, setReminder, projectKey, setProjectKey } = useReminderModal();
  const [saved, setSaved] = useState(false)
  const [email, setEmail] = useState("")
  const remindersCollectionRef = collection(db, "reminders");
  const emailRef = useRef<any>(null);

  const activatedReminder = async (e: any) => {
    e.preventDefault();
    await addDoc(remindersCollectionRef, { email, projectKey });
    setSaved(true);
    setEmail("")
  }

  const close = () => {
    setSaved(false)
    setEmail("")
    setProjectKey("");
    setReminder(false)
  };

  return (
    <Transition.Root show={reminder} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={close}>
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay
              className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 transition-opacity" />
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
              className="inline-block align-bottom rounded-xl text-left overflow-hidden shadow-strong transform transition-all sm:align-middle sm:max-w-sm sm:w-full">

              <form role="form" ref={emailRef} onSubmit={activatedReminder}>
                <div className="bg-[#231f38] text-gray-100 p-5 sm:py-7">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-2 bg-opacity-20 sm:mx-0 sm:h-10 sm:w-10">
                      <BellIcon className="h-6 w-6 text-purple-2" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium">
                        Define Reminder
                      </Dialog.Title>
                      <Dialog.Description className={"space-y-3"}>
                        <p className="text-sm text-gray-300">
                          You don&apos;t want to miss an IDO so set up an email reminder.
                        </p>
                        <label htmlFor="email-address" className="block text-sm font-medium text-blue-gray-900">
                          Enter Email Address
                        </label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="emailAddress"
                          id="email-address"
                          placeholder={"Enter your email address"}
                          className={"mt-1 block w-full bg-black bg-opacity-10 shadow-xl shadow-half-strong border border-gray-600 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"}
                          required
                        />

                      </Dialog.Description>

                      {/*When the user subscribed*/}
                      {saved && (
                        <Dialog.Description as={"p"} className={"mt-3 text-xs text-gray-300"}>
                          🥳 Congrats! You will receive a notification.
                        </Dialog.Description>
                      )}

                    </div>
                  </div>
                  <div className="flex gap-x-2 mt-5 sm:mt-4 flex-row-reverse">
                    <button
                      type="submit"
                      className="button text-sm gap-x-1 py-3">
                      <BellIcon className={"w-4"} />
                      Subscribe
                    </button>
                    <button
                      type="submit"
                      className="button text-sm py-3"
                      onClick={() => setReminder(false)}>
                      Close
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
