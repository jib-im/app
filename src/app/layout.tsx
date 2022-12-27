import "../styles/globals.css";
import { getSession } from "../utils/getSession";
import { TRPCProvider } from "../utils/trpc";
import Providers from "../components/providers";
import { Poppins } from "@next/font/google";
import { AnalyticsWrapper } from "../components/AnalyticsWrapper";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-gray-900 font-sans text-white">
        <TRPCProvider>
          <Providers session={session}>{children}</Providers>
          <AnalyticsWrapper />
        </TRPCProvider>
      </body>
    </html>
  );
}
