import { redirect } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import RootLayout from "../../components/RootLayout";
import { getSession } from "../../utils/getSession";
import { ClientProvider } from "../../utils/trpc";

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
      <ClientProvider>
        <Header session={session} />
        <PageTitle />
        <main className="mx-auto min-h-[38rem] max-w-screen-lg p-4">
          {children}
        </main>
        <Footer />
      </ClientProvider>
    </RootLayout>
  );
}
