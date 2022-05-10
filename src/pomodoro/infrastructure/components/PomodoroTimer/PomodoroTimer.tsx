import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Icon,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { BsStopCircle } from "react-icons/bs";
import { ImNext } from "react-icons/im";

import { isClient } from "@/shared/infrastructure/utils/applicationSide";
import { PomodoroContainerHeader } from "@/pomodoro/infrastructure/components/PomodoroContainerHeader";
import { PomodoroRoutes } from "@/pomodoro/infrastructure/pomodoro.routes";
import { PomodoroTime } from "@/pomodoro/infrastructure/components/PomodoroTime/PomodoroTime";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import { useChronometer } from "@/pomodoro/infrastructure/hooks/useChronometer";
import { useInitializePomodoro } from "@/pomodoro/infrastructure/hooks/useInitializePomodoro";
import { usePomodoroLocalStore } from "@/pomodoro/infrastructure/hooks/usePomodoroLocalStore";
import { usePomodoroNextStep } from "@/pomodoro/infrastructure/hooks/usePomodoroNextStep";
import { useRecordElapsedTime } from "@/tasks/infrastructure/hooks/useRecordElapsedTime";
import { useRegisterFirstPomodoroStart } from "@/tasks/infrastructure/hooks/useRegisterFirstPomodoroStart";
import { useRegisterLastPomodoroEnded } from "@/tasks/infrastructure/hooks/useRegisterLastPomodoroEnded";
import { useTaskFindNext } from "@/tasks/infrastructure/hooks/useTaskFindNext";

type PomodoroTimerProps = {
  task: TaskViewDto;
};

const audio = isClient
  ? new Audio("/alarm-sounds/Twin-bell-alarm-clock.mp3")
  : undefined;

export const PomodoroTimer: FC<PomodoroTimerProps> = ({ task }) => {
  const router = useRouter();
  const chronometer = useChronometer();
  const { time, status, timerActions } = chronometer;
  const { pomodoro, pomodoroStore } = usePomodoroLocalStore();
  const { nextTask, taskFindNextRun } = useTaskFindNext();
  const { initializePomodoroRun } = useInitializePomodoro({ pomodoroStore });
  const { registerFirstPomodoroStartRun } = useRegisterFirstPomodoroStart();
  const { registerLastPomodoroEndedRun } = useRegisterLastPomodoroEnded();
  const { recordElapsedTimeRun } = useRecordElapsedTime();
  const { pomodoroNextStepRun, isLoading: nextStepIsLoading } =
    usePomodoroNextStep({ pomodoroStore });

  const canRegisterFirstPomodoro =
    chronometer.status.isRunning && !task.isFirstPomodoroStarted;
  const isStepFinished = pomodoro && pomodoro.step.seconds < time.totalSeconds;
  const canRegisterLastPomodoro = isStepFinished && !pomodoro.isFocus;
  const canPassToNextStep = isStepFinished && !nextStepIsLoading;
  const isDisabledNextTask = !nextTask || status.isRunning;

  useEffect(() => {
    initializePomodoroRun({ taskId: task.id });
  }, [, initializePomodoroRun, task.id]);

  useEffect(() => {
    taskFindNextRun(task.id);
  }, [task.id, taskFindNextRun]);

  useEffect(() => {
    if (isStepFinished) {
      audio?.play();
      recordElapsedTimeRun({ taskId: task.id, seconds: time.totalSeconds });
    }
  }, [isStepFinished, recordElapsedTimeRun, task.id, time.totalSeconds]);

  useEffect(() => {
    if (canRegisterLastPomodoro) {
      registerLastPomodoroEndedRun({ taskId: task.id });
    }
  }, [canRegisterLastPomodoro, registerLastPomodoroEndedRun, task.id]);

  useEffect(() => {
    if (canPassToNextStep) {
      pomodoroNextStepRun({
        pomodoroCurrentStep: pomodoro.step.type,
        sessionsCount: pomodoro.pomodoroCount,
        taskId: task.id,
      }).then(timerActions.restart);
    }
  }, [
    canPassToNextStep,
    pomodoro,
    pomodoroNextStepRun,
    task.id,
    timerActions.restart,
  ]);

  useEffect(() => {
    if (canRegisterFirstPomodoro) {
      registerFirstPomodoroStartRun({ taskId: task.id });
    }
  }, [canRegisterFirstPomodoro, registerFirstPomodoroStartRun, task.id]);

  useEffect(() => {
    if (chronometer.status.isStopped) {
      registerLastPomodoroEndedRun({ taskId: task.id }).then(() =>
        recordElapsedTimeRun({ taskId: task.id, seconds: time.stoppedAt })
      );
    }
  }, [
    chronometer.status.isStopped,
    recordElapsedTimeRun,
    registerLastPomodoroEndedRun,
    task.id,
    time.stoppedAt,
  ]);

  if (!pomodoro)
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  return (
    <>
      <VStack rowGap={10} placeContent="center" height="100%">
        <PomodoroContainerHeader name={task.name} />

        <Box
          backgroundColor="tertiary.200"
          borderRadius="full"
          boxShadow={`0 0 0.5rem 0.2rem var(--chakra-colors-tertiary-400)`}
          display="flex"
          flexDirection="column"
          height={["50vw", "15rem"]}
          justifyContent="center"
          textAlign="center"
          width={["50vw", "15rem"]}
        >
          <PomodoroTime
            minutes={isStepFinished ? 0 : time.minutes}
            seconds={isStepFinished ? 0 : time.seconds}
          />

          <Box as="p" fontWeight="bold">
            Sessions: {pomodoro?.pomodoroCount}
          </Box>
        </Box>

        <Box as="p" textAlign="center">
          {pomodoro?.isFocus ? (
            <>Stay focus for {pomodoro?.step.minutes} minutes</>
          ) : (
            <>Take a break for {pomodoro?.step.minutes} minutes</>
          )}
        </Box>

        <ButtonGroup isAttached colorScheme="tertiary" variant="outline">
          <Button
            type="button"
            onClick={timerActions.pause}
            disabled={!status.isRunning}
            variant="outline"
          >
            <Icon as={AiOutlinePauseCircle} w={8} h={8} />
          </Button>

          <Button
            type="button"
            onClick={timerActions.start}
            disabled={status.isRunning}
            variant="solid"
          >
            <Icon as={AiOutlinePlayCircle} w={8} h={8} />
          </Button>

          <Button
            type="button"
            onClick={timerActions.stop}
            disabled={!status.isRunning}
            variant="outline"
          >
            <Icon as={BsStopCircle} w={8} h={8} />
          </Button>

          <Button
            type="button"
            isDisabled={isDisabledNextTask}
            onClick={() =>
              router.push({
                pathname: PomodoroRoutes.Pomodoro,
                query: { taskId: nextTask?.id },
              })
            }
          >
            <Icon as={ImNext} w={8} h={8} />
          </Button>
        </ButtonGroup>
      </VStack>
    </>
  );
};
