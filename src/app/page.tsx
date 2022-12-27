import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { getSession } from "../utils/getSession";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">slash app</h1>
      <Link
        href="https://slash.ly/"
        className="rounded-full border px-4 py-2 hover:bg-white/5"
      >
        Go to slash.ly
      </Link>

      <p>Session: {session?.user?.email}</p>
      <LogoutButton />
    </main>
  );
}
