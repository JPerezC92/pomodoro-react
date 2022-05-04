import { createContext, FC, ReactElement, useContext } from "react";
import {
  useChronometer,
  UseChronometerResult,
} from "@/pomodoro/infrastructure/hooks/useChronometer";

const ChronometerContext = createContext(
  undefined as unknown as UseChronometerResult
);

export const useChronometerContext = () => {
  const context = useContext(ChronometerContext);

  if (!context) {
    throw new Error(
      "useChronometerContext must be used within a ChronometerProvider"
    );
  }

  return context;
};

export const ChronometerProvider: FC<{
  chronometer: UseChronometerResult;
}> = ({ children, chronometer }) => {
  return (
    <ChronometerContext.Provider value={chronometer}>
      {children}
    </ChronometerContext.Provider>
  );
};

type ChronometerProps = {
  chronometer: UseChronometerResult;
  children: (chronometer: UseChronometerResult) => ReactElement;
};

export const Chronometer: FC<ChronometerProps> = ({
  children,
  chronometer,
}) => {
  const chronometerDefault = useChronometer();
  const currentChronometer = chronometer || chronometerDefault;

  return (
    <ChronometerProvider chronometer={currentChronometer}>
      {children(currentChronometer)}
    </ChronometerProvider>
  );
};
