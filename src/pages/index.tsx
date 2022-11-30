import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>slash.ly - link shortener</title>
        <meta name="description" content="slash.ly - link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#15162c] text-white">
        <h1 className="text-4xl font-bold">slash app</h1>
        <Link
          href="https://slash.ly/"
          className="rounded-full border px-4 py-2 hover:bg-white/5"
        >
          Go to slash.ly
        </Link>
      </main>
    </>
  );
};

export default Home;
