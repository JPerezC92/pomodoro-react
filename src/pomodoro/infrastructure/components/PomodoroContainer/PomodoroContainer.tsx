import { FC, useCallback, useEffect } from "react";
import { Box, Button, ButtonGroup, Icon, VStack } from "@chakra-ui/react";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { BsStopCircle } from "react-icons/bs";
import { ImNext } from "react-icons/im";

import { useChronometer } from "@/pomodoro/infrastructure/hooks/useChronometer";
import { useInitializePomodoro } from "@/pomodoro/infrastructure/hooks/useInitializePomodoro";
import { usePomodoroLocalStore } from "@/pomodoro/infrastructure/hooks/usePomodoroLocalStore";
import { PomodoroContainerHeader } from "@/pomodoro/infrastructure/components/PomodoroContainerHeader";
import { usePomodoroNextStep } from "@/pomodoro/infrastructure/hooks/usePomodoroNextStep";
import { TaskDto } from "@/tasks/infrastructure/dto/task.dto";
import { useRecordElapsedTime } from "@/tasks/infrastructure/hooks/useRecordElapsedTime";
import { useRegisterFirstPomodoroStart } from "@/tasks/infrastructure/hooks/useRegisterFirstPomodoroStart";
import { useRegisterLastPomodoroEnded } from "@/tasks/infrastructure/hooks/useRegisterLastPomodoroEnded";

type PomodoroContainerProps = {
  task: TaskDto;
};

export const PomodoroContainer: FC<PomodoroContainerProps> = ({ task }) => {
  const { time, isRunning, ...actions } = useChronometer();
  const { pomodoro, pomodoroStore } = usePomodoroLocalStore();
  const { initializePomodoroRun } = useInitializePomodoro({ pomodoroStore });
  const { registerFirstPomodoroStartRun } = useRegisterFirstPomodoroStart();
  const { registerLastPomodoroEndedRun } = useRegisterLastPomodoroEnded();
  const { recordElapsedTimeRun } = useRecordElapsedTime();
  const { pomodoroNextStepRun, isLoading: nextStepIsLoading } =
    usePomodoroNextStep({ pomodoroStore });

  const isStepFinished = pomodoro?.step.seconds === time.totalSeconds;
  const canInitializePomodoro = !!task.id;
  const canPassToNextStep =
    !!task.id && !!pomodoro && isStepFinished && !nextStepIsLoading;

  const canRegisterFirstPomodoro =
    !!task.id && !pomodoro?.task.isFirstPomodoroStarted;

  useEffect(() => {
    if (canInitializePomodoro) {
      initializePomodoroRun({ taskId: task.id });
    }
  }, [canInitializePomodoro, initializePomodoroRun, task.id]);

  useEffect(() => {
    if (canPassToNextStep) {
      pomodoroNextStepRun({ pomodoroDto: pomodoro, taskId: task.id }).then(
        actions.reset
      );
    }
  }, [
    actions.reset,
    canPassToNextStep,
    pomodoro,
    pomodoroNextStepRun,
    task.id,
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

  useEffect(() => {
    if (isStepFinished) {
      recordElapsedTimeRun({ taskId: task.id, seconds: time.totalSeconds });
    }
  }, [isStepFinished, recordElapsedTimeRun, task.id, time.totalSeconds]);

  return (
    <>
      <VStack rowGap={10} placeContent="center" height="100%">
        <PomodoroContainerHeader name={task.title} />

        <Box
          as="div"
          textAlign="center"
          borderColor="primary.300"
          borderWidth={5}
          borderStyle="solid"
          width="50vw"
          height="50vw"
          marginInline="auto"
          marginBlock="auto"
          padding={3}
          borderRadius="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box as="p" fontSize="2rem" fontWeight="bold">
            {time.minutes}:
            {time.seconds > 10 ? time.seconds : "0" + time.seconds}
          </Box>

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
            onClick={actions.pause}
            disabled={!isRunning}
            variant="outline"
          >
            <Icon as={AiOutlinePauseCircle} w={8} h={8} />
          </Button>

          <Button
            type="button"
            onClick={() => actions.start({ afterStart })}
            disabled={isRunning}
            variant="solid"
          >
            <Icon as={AiOutlinePlayCircle} w={8} h={8} />
          </Button>
          <Button
            type="button"
            onClick={() => actions.stop({ afterStop })}
            disabled={!isRunning}
            variant="outline"
          >
            <Icon as={BsStopCircle} w={8} h={8} />
          </Button>
          {/* <Button type="button" onClick={actions.reset} disabled={isRunning}>
            Reset
          </Button> */}
          <Button type="button">
            <Icon as={ImNext} w={8} h={8} />
          </Button>
        </ButtonGroup>
      </VStack>
    </>
  );
};
