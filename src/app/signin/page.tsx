import { redirect } from "next/navigation";
import Buttons from "../../components/Buttons";
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
        <h1 className="text-4xl font-bold">Sign in</h1>

        <div>
          <Buttons providers={providers} />
        </div>
      </main>
    </>
  );
}
