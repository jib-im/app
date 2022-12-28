import AuthForm from "../../../components/AuthForm";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthForm error={searchParams?.error as string} />
    </main>
  );
}
