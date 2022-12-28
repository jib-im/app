import "../styles/globals.css";
import { TRPCProvider } from "../utils/trpc";
import Providers from "./providers";
import { Poppins } from "@next/font/google";
import { AnalyticsWrapper } from "./AnalyticsWrapper";
import type { Session } from "next-auth";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <TRPCProvider>
      <Providers session={session}>
        <html lang="en" className={poppins.variable}>
          <body className="bg-gray-900 font-sans text-white">
            {children}
            <AnalyticsWrapper />
          </body>
        </html>
      </Providers>
    </TRPCProvider>
  );
}
