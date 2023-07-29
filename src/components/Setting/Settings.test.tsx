import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Setting from "./Setting";

const mockChangeHandler = jest.fn();

beforeEach(() => {
  render(
    <Setting
      id={"dummy"}
      heading="Dummy Heading"
      value={20}
      handleChange={mockChangeHandler}
    />
  );
});

afterEach(() => {
  cleanup();
});

describe("setting", () => {
  test("renders heading", () => {
    const heading = screen.getByText("Dummy Heading");
    expect(heading).toBeInTheDocument();
  });
  test("renders correct value", () => {
    const value = screen.getByTestId("dummy-value");
    expect(value.innerHTML).toBe("20%");
  });
  test("calls 'handleChange' function if value changes", () => {
    const dummySlider = screen.getByTestId("dummy-slider");
    fireEvent.change(dummySlider, { target: { value: 40 } });
    expect(mockChangeHandler).toHaveBeenCalled();
  });
});
