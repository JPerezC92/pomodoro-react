import { NextPage } from "next";

import { PomodoroScreen } from "@/pomodoro/infrastructure/screens/PomodoroScreen";

const PomodoroPage: NextPage = () => {
  return (
    <>
      <PomodoroScreen />
    </>
  );
};

export default PomodoroPage;
