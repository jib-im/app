import { redirect } from "next/navigation";
import AuthForm from "../../components/AuthForm";
import { getSession } from "../../utils/getSession";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <AuthForm error={searchParams?.error as string} />
    </main>
  );
}
