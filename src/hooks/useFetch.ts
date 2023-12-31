import React, { useEffect, useState } from "react";
// import { useAuth } from "../context";

export default function useFetch <T>(getFunction: () => Promise<T>) {

  // const { dispatch } = useAuth();

  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] =  useState<string | null>(null);

  useEffect(() => {
    setStatus("pending");
    setData(null);
    setError(null);

    getFunction()
      .then((res) => {
        setData(res);
        setStatus("success");
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          console.log("Error....");
          // dispatch({ type: "LOGOUT" });
        }
        setError(err);
        setStatus("error");
      });
  }, [getFunction]);

  return {
    data,
    error,
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
