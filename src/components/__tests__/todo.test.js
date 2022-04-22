import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import ToDo from "../todo";

//make sure every thing is clean and every test starts from the same start point
afterEach(() => {
  cleanup();
});

test("should render non-completed todo", () => {
  const todo = { id: 1, title: "wash dishes", completed: false };
  render(<ToDo todo={todo} />);
  const todoElement = screen.getByTestId("todo-1"); //retrieve a component from the tree
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("wash dishes");
  expect(todoElement).not.toContainHTML("<strike>");
});

test("should render completed todo", () => {
  const todo = { id: 2, title: "wash car", completed: true };
  render(<ToDo todo={todo} />);
  const todoElement = screen.getByTestId("todo-2"); //retrieve a component from the tree
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("wash car");
  expect(todoElement).toContainHTML("</strike>");
});

test("matches snapshot", () => {
  const todo = { id: 1, title: "wash dishes", completed: false };
  const tree = renderer.create(<ToDo todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
});
