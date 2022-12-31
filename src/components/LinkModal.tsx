import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import { FaRandom, FaTimes } from "react-icons/fa";
import generator from "generate-password";
import Balancer from "react-wrap-balancer";
import { trpc } from "../utils/trpc";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "../server/trpc/router/_app";

export type ModalType =
  | { type: "add" }
  | {
      type: "delete";
      link: inferRouterOutputs<AppRouter>["link"]["getLinks"][0];
    }
  | { type: "edit"; link: inferRouterOutputs<AppRouter>["link"]["getLinks"][0] }
  | {
      type: "archive";
      link: inferRouterOutputs<AppRouter>["link"]["getLinks"][0];
    };

const LinkModal = ({
  isOpen,
  closeModal,
  modalType,
}: {
  isOpen: boolean;
  closeModal: () => void;
  modalType: ModalType;
}) => {
  const [link, setLink] = useState<
    inferRouterOutputs<AppRouter>["link"]["getLinks"][0] | undefined
  >();
  const [createLink, setCreateLink] = useState({
    destinationLink: "",
    shortLink: "",
  });

  useEffect(() => {
    if (isOpen)
      setCreateLink({
        destinationLink: "",
        shortLink: "",
      });
  }, [isOpen]);

  useEffect(() => {
    if (modalType.type !== "add") setLink(modalType.link);
  }, [modalType.type]);

  const createLinkMutation = trpc.link.createLink.useMutation();
  const verifyShortUrlQuery = trpc.link.verifyShortUrl.useQuery({
    shortUrl: createLink.shortLink,
  });
  const deleteLinkMutation = trpc.link.deleteLink.useMutation();

  const generateRandomLink = () => {
    const randomLink = generator.generate({
      length: 6,
      numbers: true,
      lowercase: true,
      uppercase: true,
    });

    if (verifyShortUrlQuery.data) {
      generateRandomLink();
    }

    setCreateLink({
      ...createLink,
      shortLink: randomLink,
    });
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
                <Dialog.Title className="flex flex-col items-center gap-y-2 py-6 px-4 text-center sm:px-8">
                  <Image
                    src="/images/jib-logo.png"
                    alt="Jib.im logo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover object-center"
                  />
                  <span className="font-semibold">
                    {(() => {
                      switch (modalType.type) {
                        case "add":
                          return "Add new link";
                        case "edit":
                          return `Edit jib.im/${modalType.link.shortUrl}`;
                        case "archive":
                          return `Archive jib.im/${modalType.link.shortUrl}`;
                        case "delete":
                          return `Delete jib.im/${modalType.link.shortUrl}`;
                      }
                    })()}
                  </span>
                  {(() => {
                    switch (modalType.type) {
                      case "archive":
                        return (
                          <Balancer ratio={0.5}>
                            <p className="text-sm font-light text-gray-300">
                              Archived links will still work - they just
                              won&apos;t show up on your main dashboard.
                            </p>
                          </Balancer>
                        );
                      case "delete":
                        return (
                          <Balancer>
                            <p className="text-sm font-light text-gray-300">
                              Warning: Deleting this link will remove all of its
                              stats. This action cannot be undone.
                            </p>
                          </Balancer>
                        );
                    }
                  })()}
                </Dialog.Title>
                <hr className="border-gray-700 bg-gray-700 text-gray-700" />
                {(() => {
                  switch (modalType.type) {
                    case "add":
                      return (
                        <form
                          className="flex flex-col gap-y-4 px-4 py-6 sm:px-8"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            await createLinkMutation.mutateAsync({
                              shortUrl: createLink.shortLink,
                              url: createLink.destinationLink,
                            });
                            closeModal();
                          }}
                        >
                          <label htmlFor="destination-link" className="text-sm">
                            <span className="text-gray-400">
                              Destination Link
                            </span>
                            <input
                              value={createLink.destinationLink}
                              onChange={(e) =>
                                setCreateLink({
                                  ...createLink,
                                  destinationLink: e.target.value,
                                })
                              }
                              disabled={createLinkMutation.isLoading}
                              required
                              type="url"
                              name="destination-link"
                              id="destination-link"
                              placeholder="https://github.com/jib-im"
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
                                  generateRandomLink();
                                }}
                                disabled={verifyShortUrlQuery.isLoading}
                              >
                                <FaRandom />
                                {verifyShortUrlQuery.isLoading
                                  ? "Loading..."
                                  : "Randomize"}
                              </button>
                            </div>
                            <div className="flex">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-300">
                                jib.im
                              </span>
                              <input
                                value={createLink.shortLink}
                                onChange={(e) =>
                                  setCreateLink({
                                    ...createLink,
                                    shortLink: e.target.value,
                                  })
                                }
                                disabled={createLinkMutation.isLoading}
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
                            disabled={createLinkMutation.isLoading}
                            type="submit"
                            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-black transition-colors hover:bg-transparent hover:text-gray-300"
                          >
                            {createLinkMutation.isLoading
                              ? "Loading..."
                              : "Add link"}
                          </button>
                        </form>
                      );
                    case "edit":
                      return (
                        <form
                          className="flex flex-col gap-y-4 px-4 py-6 sm:px-8"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <label htmlFor="destination-link" className="text-sm">
                            <span className="text-gray-400">
                              Destination Link
                            </span>
                            <input
                              value={createLink.destinationLink}
                              onChange={(e) =>
                                setCreateLink({
                                  ...createLink,
                                  destinationLink: e.target.value,
                                })
                              }
                              required
                              type="url"
                              name="destination-link"
                              id="destination-link"
                              placeholder="https://github.com/jib-im"
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
                                  generateRandomLink();
                                }}
                                // disabled={
                                //   createLink.loadingShortUrlVerification
                                // }
                              >
                                <FaRandom />
                                {/* {createLink.loadingShortUrlVerification
                                  ? "Loading..."
                                  : */}
                                Randomize
                                {/* } */}
                              </button>
                            </div>
                            <div className="flex">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-300">
                                jib.im
                              </span>
                              <input
                                value={createLink.shortLink}
                                onChange={(e) =>
                                  setCreateLink({
                                    ...createLink,
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
                            Save changes
                          </button>
                        </form>
                      );
                    case "archive":
                      return (
                        <form
                          className="flex flex-col gap-y-4 px-4 py-6 sm:px-8"
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-black transition-colors hover:bg-transparent hover:text-gray-300"
                          >
                            Confirm archive
                          </button>
                        </form>
                      );
                    case "delete":
                      return (
                        <form
                          className="flex flex-col gap-y-4 px-4 py-6 sm:px-8"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            await deleteLinkMutation.mutateAsync({
                              id: modalType.link.id,
                            });
                            closeModal();
                          }}
                        >
                          <label
                            htmlFor="delete-confirmation"
                            className="text-sm"
                          >
                            <p className="mb-1 text-gray-400">
                              To verify, type{" "}
                              <span className="font-medium text-gray-100">
                                jib.im/{modalType.link.shortUrl}
                              </span>{" "}
                              below
                            </p>
                            <input
                              type="text"
                              required
                              pattern={`jib.im/${modalType.link.shortUrl}`}
                              id="delete-confirmation"
                              className="block w-full rounded-md border border-gray-500 bg-transparent px-4 py-2 text-white outline-none focus:border-gray-50"
                            />
                          </label>
                          <button
                            disabled={deleteLinkMutation.isLoading}
                            type="submit"
                            className="rounded-md border border-transparent bg-red-900 px-4 py-2 text-sm text-white transition-colors hover:border-red-900 hover:bg-transparent hover:text-red-500"
                          >
                            {deleteLinkMutation.isLoading
                              ? "Loading..."
                              : "Confirm delete"}
                          </button>
                        </form>
                      );
                  }
                })()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LinkModal;
