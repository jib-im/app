"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Balancer from "react-wrap-balancer";
import { useHydrationFailedHack } from "../hooks/useHydrationFailedHack";
import { NextAuthErrorMessage } from "../utils/NextAuthErrorMessage";

const AuthForm = ({ error }: { error?: string }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<{
    email: { loading: boolean; error: string | null; status: string };
    google: { loading: boolean; error: string | null; status: string };
    github: { loading: boolean; error: string | null; status: string };
  }>({
    email: { loading: false, error: null, status: "Send magic link" },
    google: { loading: false, error: null, status: "Sign in with Google" },
    github: { loading: false, error: null, status: "Sign in with Github" },
  });

  const { mounted } = useHydrationFailedHack();
  if (!mounted) return null;

  return (
    <div className="w-96 max-w-[24rem] rounded-xl bg-gray-800 text-sm shadow-lg">
      <div className="flex flex-col items-center gap-y-2 py-6 px-4 text-center sm:px-12">
        <Link href="https://slash.ly/" className="overflow-hidden rounded-full">
          <Image
            src="/images/slash-logo.png"
            alt="Slash.ly Logo"
            width={64}
            height={64}
            className="object-cover object-center"
          />
        </Link>
        <h3 className="text-lg font-bold">Sign In</h3>
        <Balancer>
          <p className="text-gray-300">Use your email address to sign in.</p>
        </Balancer>
      </div>
      <hr className="border-gray-700 bg-gray-700 text-gray-700" />
      <div className="flex flex-col items-center gap-y-4 py-6 px-4 sm:px-12">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setState((state) => ({
              ...state,
              email: { ...state.email, loading: true },
            }));
            await signIn("email", {
              email,
              redirect: false,
            })
              .catch((error) => {
                setState((state) => ({
                  ...state,
                  email: {
                    ...state.email,
                    error,
                  },
                }));
              })
              .finally(() => {
                setEmail("");
                setState((state) => ({
                  ...state,
                  email: {
                    ...state.email,
                    status: "Email sent - check your inbox!",
                  },
                }));
              });
            setState((state) => ({
              ...state,
              email: { ...state.email, loading: false },
            }));

            setTimeout(() => {
              setState((state) => ({
                ...state,
                email: {
                  ...state.email,
                  status: "Send magic link",
                  error: null,
                },
              }));
            }, 5000);
          }}
          className="flex w-full flex-col items-center gap-y-3"
        >
          <div className="flex w-full flex-col gap-y-1">
            <label
              htmlFor="email"
              className="w-full text-left text-sm text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="brice@slash.ly"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-500 bg-transparent px-4 py-2 text-white outline-none focus:border-gray-50"
              required={true}
              minLength={3}
              disabled={state.email.loading}
            />
          </div>
          <button
            type="submit"
            disabled={state.email.loading}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-black transition-colors hover:bg-transparent hover:text-gray-300"
          >
            {!state.email.loading ? state.email.status : "Loading..."}
          </button>
        </form>
        <p className="text-gray-500">or</p>
        <div className="flex w-full flex-col items-center gap-y-2">
          <button
            onClick={async () => {
              setState((state) => ({
                ...state,
                google: {
                  ...state.google,
                  loading: true,
                },
              }));
              await signIn("google", { callbackUrl: "/" }).catch((error) => {
                setState((state) => ({
                  ...state,
                  google: {
                    ...state.google,
                    error,
                  },
                }));
              });
              setState((state) => ({
                ...state,
                google: {
                  ...state.google,
                  loading: false,
                },
              }));
            }}
            disabled={state.google.loading}
            className="flex w-full items-center justify-center gap-x-2 rounded-md border border-gray-500 px-4 py-2 transition-colors hover:bg-gray-50 hover:text-black"
          >
            <FaGoogle className="text-lg" />
            {!state.google.loading ? "Sign in with Google" : "Loading..."}
          </button>
          <button
            onClick={async () => {
              setState((state) => ({
                ...state,
                github: {
                  ...state.github,
                  loading: true,
                },
              }));
              await signIn("github", { callbackUrl: "/" }).catch((error) => {
                setState((state) => ({
                  ...state,
                  github: {
                    ...state.github,
                    error,
                  },
                }));
              });
              setState((state) => ({
                ...state,
                github: {
                  ...state.github,
                  loading: false,
                },
              }));
            }}
            disabled={state.github.loading}
            className="flex w-full items-center justify-center gap-x-2 rounded-md border border-gray-500 px-4 py-2 transition-colors hover:bg-gray-50 hover:text-black"
          >
            <FaGithub className="text-lg" />
            {!state.github.loading ? "Sign in with Github" : "Loading..."}
          </button>
        </div>
        {error && (
          <Balancer>
            <p className="text-center text-xs text-red-500">
              {NextAuthErrorMessage(error)}
            </p>
          </Balancer>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
