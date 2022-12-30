import { useRouter } from "next/router";
import { TABS } from "../contants/contants";
import { useModal } from "../hooks/useModal";
import LinkModal from "./LinkModal";

const PageTitle = () => {
  const router = useRouter();
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <>
      <LinkModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalType={{ type: "add" }}
      />
      <section className="border-b border-gray-800 bg-gray-900 text-white">
        <div className="mx-auto flex h-32 max-w-screen-lg items-center justify-between px-4">
          <h1 className="text-2xl">
            {/* {TABS.find((tab) => tab.href === pathname)?.title} */}
          </h1>
          {/* {TABS.find((tab) => tab.href === pathname)?.href === "/" && (
            <button
              onClick={openModal}
              className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-black transition-colors hover:bg-transparent hover:text-gray-300"
            >
              Add
            </button>
          )} */}
        </div>
      </section>
    </>
  );
};

export default PageTitle;
