import Links from "../components/Links";
import HomeStatusBar from "../components/HomeStatusBar";
import { trpc } from "../utils/trpc";

export default function Dashboard() {
  // const linksQuery = trpc.link.getLinks.useQuery();
  // console.log(
  //   "🚀 ~ file: index.tsx:8 ~ Dashboard ~ linksQuery.data",
  //   linksQuery.data
  // );

  return (
    <section className="mx-auto flex min-h-[46.5rem] w-full max-w-screen-lg flex-col items-end gap-y-4 p-4">
      <HomeStatusBar />
      <div className="flex w-full flex-col gap-y-4">
        <Links />
        <Links />
        {/* <Links />
        <Links />
        <Links />
        <Links />
        <Links /> */}
        <Links />
      </div>
    </section>
  );
}
export { default as getServerSideProps } from "../lib/serverProps";
