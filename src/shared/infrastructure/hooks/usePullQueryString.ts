import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export const usePullQueryString = <Queryparams = Record<string, string>>(
  initialQueryParams: Queryparams
) => {
  type PulledQueryParams = Record<keyof Queryparams, string | undefined>;
  const initialQueryParamsRef = useRef(initialQueryParams);
  const { query, isReady } = useRouter();

  const [queryParams, setQueryParams] = useState({} as PulledQueryParams);
  const [isParsing, setIsParsing] = useState(true);

  useEffect(() => {
    let isAliveComponent = true;

    if (isReady) {
      if (isAliveComponent) setIsParsing(true);
      const newQueryParams: PulledQueryParams = Object.entries(
        initialQueryParamsRef.current
      ).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: query[value],
        }),
        {} as PulledQueryParams
      );

      if (isAliveComponent) setQueryParams(() => newQueryParams);
      if (isAliveComponent) setIsParsing(false);
    }

    return () => {
      isAliveComponent = false;
    };
  }, [query, isReady]);

  return { queryParams, isParsing };
};
