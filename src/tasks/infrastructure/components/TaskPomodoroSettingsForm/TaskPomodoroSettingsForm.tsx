import { FC, useRef } from "react";
import {
  chakra,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

import { PomodoroConfigurationViewDto } from "@/pomodoro/infrastructure/dto/pomodoro-configuration-view.dto";
import { useAutoSaveFields } from "@/shared/infrastructure/hooks/useAutoSaveFields";
import { useTaskChangePomodoroConfiguration } from "@/tasks/infrastructure/hooks/useTaskChangePomodoroConfiguration";

type TaskPomodoroSettingsFormProps = {
  pomodoroConfiguration: PomodoroConfigurationViewDto;
  taskId: string;
};

export const TaskPomodoroSettingsForm: FC<TaskPomodoroSettingsFormProps> = ({
  pomodoroConfiguration,
  taskId,
}) => {
  const { isLoading, taskChangePomodoroConfigurationRun } =
    useTaskChangePomodoroConfiguration();
  const { values, names, handleChangeExplicit } = useAutoSaveFields(
    { ...pomodoroConfiguration },
    (v) =>
      taskChangePomodoroConfigurationRun({ taskId, pomodoroConfiguration: v })
  );

  const focusSliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const breakSliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const longBreakSliderRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const maxBreakValue = values.longBreakTimeMinutes - 5;
  const minLongBreakValue = values.breakTimeMinutes + 5;
  return (
    <>
      <chakra.div backgroundColor="primary.50" p={2} rounded="md" width="full">
        <Heading as="h2" size="md">
          Pomodoro Settings
        </Heading>

        <Divider marginBlock={2} borderColor="primary.100" />

        <FormControl isDisabled={isLoading}>
          <FormLabel htmlFor={names.focusTimeMinutes}>
            Focus <b>{values.focusTimeMinutes}</b> minutes:
          </FormLabel>

          <Slider
            ref={focusSliderRef}
            isDisabled={isLoading}
            min={5}
            max={60}
            step={5}
            value={values.focusTimeMinutes}
            name={names.focusTimeMinutes}
            onChange={(val) =>
              handleChangeExplicit({
                name: focusSliderRef.current.name,
                value: val,
              })
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>

        <FormControl isDisabled={isLoading}>
          <FormLabel htmlFor={names.breakTimeMinutes}>
            Break <b>{values.breakTimeMinutes}</b> minutes:
          </FormLabel>

          <Slider
            ref={breakSliderRef}
            isDisabled={isLoading}
            min={5}
            max={maxBreakValue}
            step={5}
            value={values.breakTimeMinutes}
            name={names.breakTimeMinutes}
            onChange={(val) =>
              handleChangeExplicit({
                name: breakSliderRef.current.name,
                value: val,
              })
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>

        <FormControl isDisabled={isLoading}>
          <FormLabel htmlFor={names.longBreakTimeMinutes}>
            Long break <b>{values.longBreakTimeMinutes}</b> minutes:
          </FormLabel>

          <Slider
            ref={longBreakSliderRef}
            isDisabled={isLoading}
            min={minLongBreakValue}
            max={60}
            step={5}
            value={values.longBreakTimeMinutes}
            name={names.longBreakTimeMinutes}
            onChange={(val) =>
              handleChangeExplicit({
                name: longBreakSliderRef.current.name,
                value: val,
              })
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
      </chakra.div>
    </>
  );
};
