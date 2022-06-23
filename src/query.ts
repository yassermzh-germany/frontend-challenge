/**
 * tried to make it a bit like urql (or react-query).
 */
import { useState, useEffect } from "react";

export const useQuery = <Data>(fn: () => Promise<Data>) => {
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<"idle" | "fetching">("fetching"); // auto fetching!
  const [shouldRefresh, forceRefresh] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    setState("fetching");

    fn().then((data) => {
      if (!ignore) return; // already cancelled
      setState("idle");
      setData(data);
    });

    return () => {
      // https://beta-reactjs-org-git-you-might-not-fbopensource.vercel.app/learn/you-might-not-need-an-effect#fetching-data
      // to avoid race condition!
      ignore = true;
    };
  }, [shouldRefresh]);

  const refetch = () => {
    forceRefresh(!shouldRefresh); // toggle to trigger the effect!
  };

  return { data, refetch, fetching: state === "fetching" };
};

export const useMutation = <Data, R>(fn: (data: Data) => Promise<R>) => {
  const [state, setState] = useState<"idle" | "fetching">("idle");

  const mutate = (data: Data): Promise<R> => {
    setState("fetching");
    return fn(data).then((json) => {
      setState("idle");
      return json;
    });
  };

  return { mutate, fetching: state === "fetching" };
};
