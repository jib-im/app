import { redirect } from "next/navigation";
import AuthForm from "../../components/AuthForm";
import { getProviders } from "next-auth/react";
import { getSession } from "../../utils/getSession";

export default async function Page() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }
  const providers = await getProviders();
  if (!providers) {
    return <h1>No providers</h1>;
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <AuthForm />
      </main>
    </>
  );
}
