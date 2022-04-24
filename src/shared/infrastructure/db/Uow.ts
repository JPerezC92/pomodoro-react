import { useCallback, useEffect, useState } from "react";
import { Table } from "dexie";
import { db } from "./connection";

// export const Uow = () => {
//   const database = db;
//   return {
//     db: database,
//     transaction: <Return>(tables: Table[], Callback: () => Return) =>
//       database.transaction("rw", [...tables], () => Callback()),
//   };
// };

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
