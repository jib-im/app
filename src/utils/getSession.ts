import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const getSession = async () => {
  return await unstable_getServerSession(authOptions);
};
