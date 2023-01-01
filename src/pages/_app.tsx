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

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <main className={`${poppins.variable} font-sans`}>
        {pathname !== "/login" && <Header session={session} />}
        <Component {...pageProps} />
        <Analytics />
        {pathname !== "/login" && <Footer />}
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
