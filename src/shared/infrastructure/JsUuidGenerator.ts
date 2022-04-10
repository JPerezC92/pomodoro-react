import { v4 } from "uuid";
import { UuidGenerator } from "../domain/UuidGenerator";

export const JsUuidGenerator: () => UuidGenerator = () => {
  return {
    generate: (): string => {
      return v4();
    },
  };
};
