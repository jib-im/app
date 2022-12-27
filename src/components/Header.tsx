import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type Props = { session: Session | null };

const Header = ({ session }: Props) => {
  return (
    <header className="flex justify-between p-6">
      <Link href="/">
        <h1 className="text-xl font-bold">slash app</h1>
      </Link>
      <div className="flex space-x-2">
        {session && session.user ? (
          <>
            {session.user.image && (
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={session.user.image}
                  alt={`${session.user.name}'s profile picture`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            )}
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">Sign In</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
