import { trpc } from "./../utils/trpc";

export const useFetchLinks = () => {
  const { data, isLoading, refetch } = trpc.link.getLinks.useQuery();

  return { data, isLoading, refetch };
};
