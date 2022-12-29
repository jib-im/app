"use client";

import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import generator from "generate-password";
const LinkModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const [state, setState] = useState({ destinationLink: "", shortLink: "" });
  useEffect(() => {
    if (isOpen) clearState();
  }, [isOpen]);

  const clearState = () => {
    setState({ destinationLink: "", shortLink: "" });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-96 max-w-xl transform overflow-hidden rounded-2xl bg-gray-800 text-white shadow-xl transition-all">
                <button
                  className="absolute right-2 top-2 rounded-md p-2 transition-colors hover:bg-gray-700"
                  onClick={closeModal}
                >
                  <FaTimes />
                </button>
                <Dialog.Title className="flex flex-col items-center gap-y-2 py-6 px-4">
                  <Image
                    src="/images/slash-logo.png"
                    alt="Slash.ly logo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover object-center"
                  />
                  <h3 className="font-semibold">Add new link</h3>
                </Dialog.Title>
                <hr className="border-gray-700 bg-gray-700 text-gray-700" />
                <form
                  className="flex flex-col gap-y-4 px-4 py-6 sm:px-8"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <label htmlFor="destination-link" className="text-sm">
                    <span className="text-gray-400">Destination Link</span>
                    <input
                      value={state.destinationLink}
                      onChange={(e) =>
                        setState({ ...state, destinationLink: e.target.value })
                      }
                      required
                      type="url"
                      name="destination-link"
                      id="destination-link"
                      placeholder="https://github.com/slash-ly/app"
                      className="block w-full rounded-md border border-gray-500 bg-transparent px-4 py-2 text-white outline-none focus:border-gray-50"
                    />
                  </label>
                  <label htmlFor="short-link" className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Short Link</span>
                      <button
                        className="flex items-center gap-x-2 p-1 text-gray-500 hover:text-gray-400"
                        type="button"
                        onClick={() => {
                          // TODO: Query to DB to check if the random link is already taken
                          setState({
                            ...state,
                            shortLink: generator.generate({
                              length: 6,
                              numbers: true,
                              lowercase: true,
                              uppercase: true,
                            }),
                          });
                        }}
                      >
                        <FaRandom />
                        Randomize
                      </button>
                    </div>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-300">
                        slash.ly
                      </span>
                      <input
                        value={state.shortLink}
                        onChange={(e) =>
                          setState({
                            ...state,
                            shortLink: e.target.value,
                          })
                        }
                        required
                        type="text"
                        id="short-link"
                        name="short-link"
                        placeholder="github"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-500 bg-transparent px-4 py-2 text-white outline-none focus:border-gray-50"
                      />
                    </div>
                  </label>
                  <button
                    type="submit"
                    className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-black transition-colors hover:bg-transparent hover:text-gray-300"
                  >
                    Add link
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LinkModal;
