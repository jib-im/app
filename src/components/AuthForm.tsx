"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

type Props = {};

const AuthForm = ({}: Props) => {
  const [email, setEmail] = useState("");

  return (
    <>
      <h1 className="text-4xl font-bold">Sign in</h1>
      <div className="flex flex-col gap-4">
        <form
          onSubmit={() =>
            signIn("email", {
              email,
            })
          }
        >
          <input
            type="email"
            placeholder="brice@slash.ly"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black"
            required
            minLength={3}
          />
          <button type="submit">Send magic link</button>
        </form>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
        <button onClick={() => signIn("github")}>Sign in with Github</button>
      </div>
    </>
  );
};

export default AuthForm;
