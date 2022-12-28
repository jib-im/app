import { redirect } from "next/navigation";
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import RootLayout from "../../components/RootLayout";
import { getSession } from "../../utils/getSession";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <RootLayout session={session}>
      <Header session={session} />

      <PageTitle />

      <main className="mx-auto flex max-w-screen-lg  p-4">{children}</main>
    </RootLayout>
  );
}