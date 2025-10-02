import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import Tasks from "../src/Tasks/Tasks";

// Renders task list
async function rendersTasks() {
  const mockTasks = [
    { id: 0, text: "Task Test", completed: false },
    { id: 1, text: "Another Task", completed: true },
  ];
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTasks),
    })
  );
  await act(() => render(<Tasks />));
}

describe("Tasks", () => {
  it("renders title", () => {
    render(<Tasks />);
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Tasks");
  });

  it("renders loading when no tasks yet", () => {
    render(<Tasks />);
    expect(screen.getByRole("heading", { level: 3 }).textContent).toBe(
      "Loading..."
    );
  });

  it("renders tasks", async () => {
    await rendersTasks();

    expect(screen.getByText("Task Test")).toBeInTheDocument();
    expect(screen.getByText("Another Task")).toBeInTheDocument();
  });

  it("clicks task to complete", async () => {
    await rendersTasks();

    // Gets first task and clicks it
    const task = screen.getByText("Task Test");
    expect(task.classList).toContainEqual("false");
    const user = userEvent.setup();
    await user.click(task);

    expect(task.classList).not.toContainEqual("false");
  })

  it("clicks edit task", async () => {
    await rendersTasks();

    // Gets edit button and clicks it
    const edit = screen.getAllByRole("button")[0];
    const user = userEvent.setup();
    await user.click(edit);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("cancels edit", async () => {
    await rendersTasks();

    const edit = screen.getAllByRole("button")[0];
    const user = userEvent.setup();
    await user.click(edit);

    const cancel = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancel);
    
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("saves edit", async () => {
    await rendersTasks();

    const edit = screen.getAllByRole("button")[0];
    const user = userEvent.setup();
    await user.click(edit);

    const input = screen.getByRole("textbox");
    await user.type(input, " - changed");
    
    const save = screen.getByRole("button", { name: "Save" });
    await user.click(save);

    expect(screen.getByText("Task Test - changed")).toBeInTheDocument();
  });

  it("deletes task", async () => {
    await rendersTasks();

    const dltButton = screen.getAllByRole("button", { name: "Delete" })[0];
    const user = userEvent.setup();
    await user.click(dltButton);

    expect(screen.queryByText("Task Test")).not.toBeInTheDocument();
  });
});
