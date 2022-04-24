import { useRouter } from "next/router";
import { FC, useEffect } from "react";

type RedirectProps = {
  pathname: string;
  queryParams?: { [key: string]: string };
};

export const Redirect: FC<RedirectProps> = ({ pathname, queryParams }) => {
  const router = useRouter();
  useEffect(() => {
    router.push({ pathname: pathname, query: queryParams });
  }, [pathname, queryParams, router]);

  return null;
};
