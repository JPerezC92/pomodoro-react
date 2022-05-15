import { useCallback, useEffect, useState } from "react";
import { Table } from "dexie";
import { db } from "./connection";

const database = db;
export const useUow = () => {
  const [isLoading, setIsLoading] = useState(false);

  const transaction = useCallback(
    async <Return>(tables: Table[], Callback: () => Return) => {
      setIsLoading(true);
      const result = await database.transaction("rw", [...tables], () =>
        Callback()
      );
      setIsLoading(false);
      return result;
    },
    []
  );

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return {
    isLoading,
    db: database,
    transaction,
  };
};
