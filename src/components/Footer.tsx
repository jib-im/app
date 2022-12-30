import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { useHydrationFailedHack } from "../hooks/useHydrationFailedHack";

const Footer = () => {
  const { mounted } = useHydrationFailedHack();
  if (!mounted) return null;

  return (
    <footer className="border-t border-gray-800">
      <section className="mx-auto flex max-w-screen-lg items-center justify-center gap-x-8 p-4 text-gray-300">
        <Link
          href="https://jib.im/github"
          className="transition-opacity hover:opacity-75"
          target="_blank"
        >
          <FaGithub className="h-6 w-6" />
        </Link>
        <Link
          href="https://jib.im"
          className="relative overflow-hidden rounded-full border border-gray-700/50 transition-opacity hover:opacity-75"
          target="_blank"
        >
          <Image
            src="/images/jib-logo.png"
            alt="jib.im Logo"
            width={32}
            height={32}
          />
        </Link>
        <Link
          href="https://jib.im/twitter"
          className="transition-opacity hover:opacity-75"
          target="_blank"
        >
          <FaTwitter className="h-6 w-6" />
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
