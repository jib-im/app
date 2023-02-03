import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Login from "../components/Login";
import { getServerAuthSession } from "../server/auth";
import { useSession } from "next-auth/react";

import Dashboard from "../components/Dashboard";

const Index = () => {
  const { status } = useSession();

  if (status === "unauthenticated") return <Login />;

  return <Dashboard />;
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  return {
    props: { session },
  };
};
