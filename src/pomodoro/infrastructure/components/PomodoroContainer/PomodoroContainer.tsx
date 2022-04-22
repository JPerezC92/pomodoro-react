import { FC, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { BsStopCircle } from "react-icons/bs";
import { ImNext } from "react-icons/im";

import { PomodoroContainerHeader } from "@/pomodoro/infrastructure/components/PomodoroContainerHeader";
import { useChronometer } from "@/pomodoro/infrastructure/hooks/useChronometer";
import { useInitializePomodoro } from "@/pomodoro/infrastructure/hooks/useInitializePomodoro";
import { usePomodoroLocalStore } from "@/pomodoro/infrastructure/hooks/usePomodoroLocalStore";
import { usePomodoroNextStep } from "@/pomodoro/infrastructure/hooks/usePomodoroNextStep";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task.dto";
import { useRecordElapsedTime } from "@/tasks/infrastructure/hooks/useRecordElapsedTime";
import { useRegisterFirstPomodoroStart } from "@/tasks/infrastructure/hooks/useRegisterFirstPomodoroStart";
import { useRegisterLastPomodoroEnded } from "@/tasks/infrastructure/hooks/useRegisterLastPomodoroEnded";

type PomodoroContainerProps = {
  task: TaskViewDto;
};

export const PomodoroContainer: FC<PomodoroContainerProps> = ({ task }) => {
  const { time, isRunning, ...timerActions } = useChronometer();
  const { pomodoro, pomodoroStore } = usePomodoroLocalStore();
  const { initializePomodoroRun } = useInitializePomodoro({ pomodoroStore });
  const { registerFirstPomodoroStartRun } = useRegisterFirstPomodoroStart();
  const { registerLastPomodoroEndedRun } = useRegisterLastPomodoroEnded();
  const { recordElapsedTimeRun } = useRecordElapsedTime();
  const { pomodoroNextStepRun, isLoading: nextStepIsLoading } =
    usePomodoroNextStep({ pomodoroStore });

  const canInitializePomodoro = !!task.id;
  const canRegisterFirstPomodoro = !pomodoro?.task.isFirstPomodoroStarted;
  const isStepFinished = pomodoro?.step.seconds === time.totalSeconds;
  const canPassToNextStep = !!pomodoro && isStepFinished && !nextStepIsLoading;

  useEffect(() => {
    if (canInitializePomodoro) {
      initializePomodoroRun({ taskId: task.id });
    }
  }, [canInitializePomodoro, initializePomodoroRun, task.id]);

  useEffect(() => {
    if (isStepFinished) {
      recordElapsedTimeRun({ taskId: task.id, seconds: time.totalSeconds });
    }
  }, [isStepFinished, recordElapsedTimeRun, task.id, time.totalSeconds]);

  useEffect(() => {
    if (canPassToNextStep) {
      pomodoroNextStepRun({ pomodoroDto: pomodoro, taskId: task.id }).then(
        timerActions.reset
      );
    }
  }, [
    canPassToNextStep,
    pomodoro,
    pomodoroNextStepRun,
    task.id,
    timerActions.reset,
  ]);

  const afterStart = useCallback(() => {
    if (canRegisterFirstPomodoro)
      registerFirstPomodoroStartRun({ taskId: task.id });
  }, [canRegisterFirstPomodoro, registerFirstPomodoroStartRun, task.id]);

  const afterStop = useCallback(() => {
    registerLastPomodoroEndedRun({ taskId: task.id }).then(() =>
      recordElapsedTimeRun({ taskId: task.id, seconds: time.totalSeconds })
    );
  }, [
    recordElapsedTimeRun,
    registerLastPomodoroEndedRun,
    task.id,
    time.totalSeconds,
  ]);

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
          <Heading as="h4" fontSize="2rem" fontWeight="bold">
            {time.minutes}:
            {time.seconds > 10 ? time.seconds : "0" + time.seconds}
          </Heading>

          <Box as="p" fontWeight="bold">
            Sessions: {pomodoro?.pomodoroCount}
          </Box>
        </Box>

        <Box as="p" textAlign="center">
          {pomodoro?.isFocus ? (
            <>Stay focus for {pomodoro?.step.minutes}</>
          ) : (
            <>Take a break for {pomodoro?.step.minutes}</>
          )}
        </Box>

        <ButtonGroup isAttached colorScheme="tertiary" variant="outline">
          <Button
            type="button"
            onClick={timerActions.pause}
            disabled={!isRunning}
            variant="outline"
          >
            <Icon as={AiOutlinePauseCircle} w={8} h={8} />
          </Button>

          <Button
            type="button"
            onClick={() => timerActions.start({ afterStart })}
            disabled={isRunning}
            variant="solid"
          >
            <Icon as={AiOutlinePlayCircle} w={8} h={8} />
          </Button>

          <Button
            type="button"
            onClick={() => timerActions.stop({ afterStop })}
            disabled={!isRunning}
            variant="outline"
          >
            <Icon as={BsStopCircle} w={8} h={8} />
          </Button>

          <Button type="button">
            <Icon as={ImNext} w={8} h={8} />
          </Button>
        </ButtonGroup>
      </VStack>
    </>
  );
};
