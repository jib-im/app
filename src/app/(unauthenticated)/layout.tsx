import { redirect } from "next/navigation";
import RootLayout from "../../components/RootLayout";
import { getSession } from "../../utils/getSession";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return <RootLayout session={null}>{children}</RootLayout>;
}
