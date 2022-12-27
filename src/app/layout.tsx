import { Session } from "next-auth";
import "../styles/globals.css";
import { TRPCProvider } from "../utils/trpc";
import Providers from "./providers";
import { headers } from "next/headers";

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch("http://localhost:3000/api/auth/session", {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");
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
