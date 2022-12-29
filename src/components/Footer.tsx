import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800">
      <section className="mx-auto flex max-w-screen-lg items-center justify-center gap-x-8 p-4 text-gray-300">
        <Link
          href="https://slash.ly/twitter"
          className="transition-opacity hover:opacity-75"
        >
          <FaTwitter className="h-6 w-6" />
        </Link>
        <Link
          href="https://slash.ly"
          className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-700/50 transition-opacity hover:opacity-75"
        >
          <Image src="/images/slash-logo.png" alt="Slash.ly Logo" fill />
        </Link>
        <Link
          href="https://slash.ly/github"
          className="transition-opacity hover:opacity-75"
        >
          <FaGithub className="h-6 w-6" />
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
