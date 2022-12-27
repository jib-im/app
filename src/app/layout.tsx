import "../styles/globals.css";
import { getSession } from "../utils/getSession";
import { TRPCProvider } from "../utils/trpc";
import Providers from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <TRPCProvider>
          <Providers session={session}>{children}</Providers>
        </TRPCProvider>
      </body>
    </html>
  );
}
