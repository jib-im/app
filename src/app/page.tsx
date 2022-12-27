import { redirect } from "next/navigation";
import Header from "../components/Header";
import { getSession } from "../utils/getSession";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <Header session={session} />
      <p>Session: {session?.user?.email}</p>
    </main>
  );
}
