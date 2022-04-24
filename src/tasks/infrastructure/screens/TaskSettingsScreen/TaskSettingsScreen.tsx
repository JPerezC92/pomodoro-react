import { Layout } from "@/shared/infrastructure/components/Layout";
import { SpinnerFullScreen } from "@/shared/infrastructure/components/SpinnerFullScreen";
import { usePullQueryString } from "@/shared/infrastructure/hooks/usePullQueryString";
import {
  Box,
  Button,
  chakra,
  Divider,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { TaskSettingsIsDoneToggle } from "../../components/TaskSettingsIsDoneToggle";
import { useTaskFindById } from "../../hooks/useFindTaskById";
import { TaskRoutes } from "../../task.routes";

type TaskSettingsScreenProps = {};

export const TaskSettingsScreen: FC<TaskSettingsScreenProps> = (props) => {
  const router = useRouter();
  const {
    isParsing,
    queryParams: { taskId },
  } = usePullQueryString({ taskId: "taskId" });

  const { task, taskFindByIdRun, isLoading } = useTaskFindById();
  const [sliderValue, setSliderValue] = useState(50);
  const isLoadingTaskSettingsScreen =
    isParsing || !taskId || isLoading || !task;

  useEffect(() => {
    if (taskId) {
      taskFindByIdRun({ taskId });
    }
  }, [taskFindByIdRun, taskId]);

  if (isLoadingTaskSettingsScreen) return <SpinnerFullScreen />;

  return (
    <>
      <Layout title="Settings">
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
        </VStack>
      </Layout>
    </>
  );
};
