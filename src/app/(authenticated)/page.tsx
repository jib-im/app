import Links from "../../components/Links";
import HomeStatusBar from "../../components/HomeStatusBar";
import { trpc } from "../../utils/trpc";

export default function Page() {
  // request to trpc to get the links for the user
  // const linksQuery = trpc.link.getLinks.useQuery();
  // console.log(linksQuery);

  return (
    <section className="flex w-full flex-col items-end gap-y-4">
      <HomeStatusBar />
      <div className="flex w-full flex-col gap-y-4">
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
        <Links />
      </div>
    </section>
  );
}
