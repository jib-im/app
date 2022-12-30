import Links from "../components/Links";
import HomeStatusBar from "../components/HomeStatusBar";
import { trpc } from "../utils/trpc";

export default function Dashboard() {
  const linksQuery = trpc.link.getLinks.useQuery();

  return (
    <section className="mx-auto flex min-h-[38.75rem] w-full max-w-screen-lg flex-col items-end gap-y-4 p-4">
      <HomeStatusBar />
      <div className="flex w-full flex-col gap-y-4">
        {!linksQuery.data ? (
          <div className="flex h-20 w-full items-center justify-center rounded-md bg-gray-100">
            <p className="text-gray-500">No links yet</p>
          </div>
        ) : (
          linksQuery.data.map((link) => (
            <Links key={link.shortUrl} link={link} />
          ))
        )}
      </div>
    </section>
  );
}
export { default as getServerSideProps } from "../lib/serverProps";
