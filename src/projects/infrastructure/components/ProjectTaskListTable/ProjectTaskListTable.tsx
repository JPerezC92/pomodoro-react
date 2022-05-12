import { FC } from "react";
import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { TaskViewDto } from "@/tasks/infrastructure/dto/task-view.dto";
import {
  Button,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { TaskRoutes } from "@/tasks/infrastructure/task.routes";

type ProjectTaskListTableProps = {
  taskList: TaskViewDto[];
};

export const ProjectTaskListTable: FC<ProjectTaskListTableProps> = ({
  taskList,
}) => {
  return (
    <>
      <TableContainer borderWidth="1px">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Task</Th>
              <Th textAlign="center">Done</Th>
            </Tr>
          </Thead>

          <Tbody>
            {taskList.map((task) => (
              <Tr key={task.id}>
                <Td>
                  <Link href={TaskRoutes.taskDetail(task.id)} passHref>
                    <Button as="a" variant="unstyled">
                      {task.name}
                    </Button>
                  </Link>
                </Td>
                <Td textAlign="center">
                  {task.isDone ? (
                    <Icon as={MdCheckCircle} color="green.500" />
                  ) : (
                    <Icon
                      as={MdOutlineRadioButtonUnchecked}
                      color="green.500"
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
