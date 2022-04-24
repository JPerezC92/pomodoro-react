import { Layout } from "@/shared/infrastructure/components/Layout";
import { Redirect } from "@/shared/infrastructure/components/Redirect";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import { NOT_FOUND } from "@/shared/infrastructure/utils/constants";
import {
  Button,
  chakra,
  Divider,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { TaskSettingsIsDoneToggle } from "../../components/TaskSettingsIsDoneToggle";
import { useTaskFindById } from "../../hooks/useFindTaskById";
import { useTaskLocalStore } from "../../hooks/useTaskLocalStore";
import { TaskProvider } from "../../store/TaskContext";
import { TaskRoutes } from "../../task.routes";

type TaskSettingsScreenProps = {};

export const TaskSettingsScreen: FC<TaskSettingsScreenProps> = (props) => {
  const {
    isParsing,
    queryParams: { taskId },
  } = usePullQueryString({ taskId: "taskId" });
  const { task, taskStore } = useTaskLocalStore();
  const { taskFindByIdRun, isLoading } = useTaskFindById(taskStore);

  const [sliderValue, setSliderValue] = useState(50);
  const isLoadingTaskSettingsScreen =
    isParsing || !taskId || isLoading || !task;

  useEffect(() => {
    if (taskId) {
      taskFindByIdRun({ taskId });
    }
  }, [taskFindByIdRun, taskId]);

  if (task === NOT_FOUND) return <Redirect pathname={TaskRoutes.tasks} />;

  if (isLoadingTaskSettingsScreen) return <SpinnerFullScreen />;

  return (
    <>
      <Layout title="Settings">
        <TaskProvider taskStore={taskStore} task={task}>
          <VStack as="main" padding={4} spacing={4}>
            <TaskSettingsIsDoneToggle
              isCompleted={task.isDone}
              taskId={task.id}
            />

            <Divider />

            <chakra.form
              backgroundColor="primary.50"
              p={2}
              rounded="md"
              width="full"
            >
              <p>Form</p>
              <Slider
                aria-label="slider-ex-6"
                onChange={(val) => setSliderValue(val)}
              >
                <SliderMark
                  value={sliderValue}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-10"
                  ml="-5"
                  w="12"
                >
                  {sliderValue}%
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <Button type="submit" variant="outline" colorScheme="primary">
                Save Changes
              </Button>
            </chakra.form>

            <p>{`${task.isDone}`}</p>
            <p>{`${task.id}`}</p>
          </VStack>
        </TaskProvider>
      </Layout>
    </>
  );
};
