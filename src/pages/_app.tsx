import "../styles/globals.css";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { Poppins } from "@next/font/google";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <main className={`${poppins.variable} font-sans`}>
      <SessionProvider session={session}>
        {router.pathname !== "/login" && <Header session={session} />}
        <Component {...pageProps} />
        <Analytics />
        {router.pathname !== "/login" && <Footer />}
      </SessionProvider>
    </main>
  );
};

export default trpc.withTRPC(MyApp);
