import Links from "../components/Links";
import HomeStatusBar from "../components/HomeStatusBar";
import { trpc } from "../utils/trpc";
import Image from "next/image";

export default function Dashboard() {
  const { data, isLoading } = trpc.link.getLinks.useQuery();

  return (
    <section className="mx-auto min-h-[38rem] max-w-screen-lg p-4">
      <div className="flex w-full flex-col gap-y-4">
        {isLoading ? (
          <>
            <HomeStatusBar loading />
            {[...Array(3)].map((index) => (
              <Links key={index} isLoading={isLoading} />
            ))}
          </>
        ) : !data || !data.length ? (
          <>
            <Image
              src="/images/no-link.svg"
              alt="No link image"
              width={412}
              height={400}
              className="pointer-events-none mx-auto select-none"
            />
            <h1 className="text-center text-gray-300">No links yet</h1>
          </>
        ) : (
          <>
            <HomeStatusBar />
            {data.map((link) => (
              <Links key={link.shortUrl} link={link} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
export { default as getServerSideProps } from "../lib/serverProps";
