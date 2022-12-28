import { redirect } from "next/navigation";
import Header from "../../components/Header";
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
      <div className="border-b border-gray-800">
        <Header session={session} />
      </div>
      <main className="mx-auto max-w-screen-lg">{children}</main>
    </RootLayout>
  );
}
