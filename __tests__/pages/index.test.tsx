import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";

import Home from "@/pages/index";

describe("Home ", () => {
  test("renders homepage unchanged", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  test("should render a form", () => {
    render(<Home />);

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });

  test("should add a new task", () => {
    render(<Home />);

    const form = screen.getByRole("form");
    const taskList = screen.getByRole("list");
    const input = screen.getByPlaceholderText("Add a new task");

    expect(taskList.childElementCount).toBe(0);
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "New task" } });

    const button = screen.getByRole("button", { name: "Add task" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Add");

    fireEvent.click(button);

    expect(input).toHaveValue("");
    expect(taskList.childElementCount).toBe(1);
  });
});
