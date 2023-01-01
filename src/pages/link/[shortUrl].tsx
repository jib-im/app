import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const LinkPage = () => {
  const router = useRouter();
  if (!router.query.shortUrl || typeof router.query.shortUrl !== "string")
    return null;

  const getUrlQuery = trpc.link.getLink.useQuery({
    shortUrl: router.query.shortUrl,
  });
  return <div>{getUrlQuery.data?.clicks}</div>;
};

export default LinkPage;
