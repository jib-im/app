import { trpc } from "./../utils/trpc";

export const useFetchLinks = ({
  sort,
  status,
}: {
  sort?: string;
  status?: string;
}) => {
  const { data, isLoading, refetch } = trpc.link.getLinks.useQuery({
    sort,
    status,
  });

  return { data, isLoading, refetch };
};
