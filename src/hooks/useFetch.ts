import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(getFunction: () => Promise<T>) => {
const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus("pending");
    setData(null);
    setError(null);
    const controller = new AbortController();
    getFunction()
      .then((res) => {
        setData(res);
        setStatus("success");
      })
      .catch((err) => {
        if (controller.signal.aborted) {
          setError(err);
          setStatus("error");
        }
        setError(err?.response?.data?.message);
        setStatus("error");
      });
    return () => controller.abort();
  }, [getFunction]);

  return {
    data,
    error,
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  };
}

export default useFetch;