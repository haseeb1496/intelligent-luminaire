import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import LuminaireSettings from "../LuminaireSettings/LuminaireSettings";

const mockSettingsEmitter = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  render(<LuminaireSettings settingsEmitter={mockSettingsEmitter} />);
});

describe("luminaire settings", () => {
  test("renders app heading", () => {
    const heading = screen.getByText("Set Levels");
    expect(heading).toBeInTheDocument();
  });
  test("renders slider headings", () => {
    const heading1 = screen.getByText("Occupied");
    const heading2 = screen.getByText("Power Save");
    const heading3 = screen.getByText("Minimum");
    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(heading3).toBeInTheDocument();
  });
  test("renders buttons", () => {
    const button1 = screen.getByText("Cancel");
    const button2 = screen.getByText("Apply");
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
  test("renders correct initial values", () => {
    const occupiedValueEl = screen.getByTestId("occupied-value");
    const powerSaveValueEl = screen.getByTestId("power-save-value");
    const minimumValueEl = screen.getByTestId("minimum-value");
    expect(occupiedValueEl.innerHTML).toBe("80%");
    expect(powerSaveValueEl.innerHTML).toBe("20%");
    expect(minimumValueEl.innerHTML).toBe("0%");
  });
  test("intially renders disabled buttons", () => {
    const cancelButton = screen.getByText("Cancel");
    const applyButton = screen.getByText("Apply");
    expect(cancelButton).toBeDisabled();
    expect(applyButton).toBeDisabled();
  });
  test("enables buttons after slider changes value", () => {
    const slider = screen.getByTestId("minimum-slider");
    fireEvent.change(slider, { target: { value: 20 } });
    const cancelButton = screen.getByText("Cancel");
    const applyButton = screen.getByText("Apply");
    expect(cancelButton).toBeEnabled();
    expect(applyButton).toBeEnabled();
  });
  test("shows cancellation toast when 'Cancel' button is clicked and disappears after 3 seconds", async () => {
    const slider = screen.getByTestId("minimum-slider");
    fireEvent.change(slider, { target: { value: 20 } });
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    const cancelToast = await screen.findByText("Settings Canceled");
    expect(cancelToast).toBeInTheDocument();
    await act(() => jest.advanceTimersByTime(3000));
    expect(screen.queryByText("Settings Canceled")).not.toBeInTheDocument();
  });
  test("shows apply toast when 'Apply' button is clicked and disappears after 3 seconds", async () => {
    const slider = screen.getByTestId("minimum-slider");
    fireEvent.change(slider, { target: { value: 20 } });
    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);
    const applyToast = await screen.findByText("Settings Applied");
    expect(applyToast).toBeInTheDocument();
    await act(() => jest.advanceTimersByTime(3000));
    expect(screen.queryByText("Settings Applied")).not.toBeInTheDocument();
  });
  test("reverts values when 'Cancel' is clicked", () => {
    const slider = screen.getByTestId("minimum-slider");
    fireEvent.change(slider, { target: { value: 20 } });
    const minimumValueEl = screen.getByTestId("minimum-value");
    expect(minimumValueEl.innerHTML).toBe("20%");
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(minimumValueEl.innerHTML).toBe("0%");
    expect(mockSettingsEmitter).toBeCalled();
  });
  test("applies values when 'Apply' is clicked", () => {
    const slider = screen.getByTestId("minimum-slider");
    fireEvent.change(slider, { target: { value: 20 } });
    const minimumValueEl = screen.getByTestId("minimum-value");
    expect(minimumValueEl.innerHTML).toBe("20%");
    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);
    expect(minimumValueEl.innerHTML).toBe("20%");
    expect(mockSettingsEmitter).toBeCalled();
  });
  test("'Minimum' level must always be equal or lesser than 'Power Save' level", () => {
    const minimumSlider = screen.getByTestId("minimum-slider");
    fireEvent.change(minimumSlider, { target: { value: 10 } });
    const powerSaveEl = screen.getByTestId("power-save-value");
    expect(powerSaveEl.innerHTML).toBe("20%");
    fireEvent.change(minimumSlider, { target: { value: 30 } });
    expect(powerSaveEl.innerHTML).toBe("30%");
  });
  test("'Minimum' level must always be equal or lesser than 'Occupied' level", () => {
    const minimumSlider = screen.getByTestId("minimum-slider");
    fireEvent.change(minimumSlider, { target: { value: 50 } });
    const occupiedValueEl = screen.getByTestId("occupied-value");
    expect(occupiedValueEl.innerHTML).toBe("80%");
    fireEvent.change(minimumSlider, { target: { value: 90 } });
    expect(occupiedValueEl.innerHTML).toBe("90%");
  });
  test("'Power save' level must always be equal or greater than 'Minimum' level", () => {
    const minimumSlider = screen.getByTestId("minimum-slider");
    const powerSaveSlider = screen.getByTestId("power-save-slider");
    fireEvent.change(minimumSlider, { target: { value: 60 } });
    const minimumValueEl = screen.getByTestId("minimum-value");
    fireEvent.change(powerSaveSlider, { target: { value: 65 } });
    expect(minimumValueEl.innerHTML).toBe("60%");
    fireEvent.change(powerSaveSlider, { target: { value: 40 } });
    expect(minimumValueEl.innerHTML).toBe("40%");
  });
  test("'Power save' level must be always equal or less than 'Occupied' level", () => {
    const powerSaveSlider = screen.getByTestId("power-save-slider");
    fireEvent.change(powerSaveSlider, { target: { value: 60 } });
    const occupiedValueEl = screen.getByTestId("occupied-value");
    expect(occupiedValueEl.innerHTML).toBe("80%");
    fireEvent.change(powerSaveSlider, { target: { value: 90 } });
    expect(occupiedValueEl.innerHTML).toBe("90%");
  });
  test("'Occupied' level must always be greater than or equal to 'Power Save' level", () => {
    const occupiedSlider = screen.getByTestId("occupied-slider");
    fireEvent.change(occupiedSlider, { target: { value: 50 } });
    const powerSaveValueEl = screen.getByTestId("power-save-value");
    expect(powerSaveValueEl.innerHTML).toBe("20%");
    fireEvent.change(occupiedSlider, { target: { value: 10 } });
    expect(powerSaveValueEl.innerHTML).toBe("10%");
  });
  test("'Occupied' level must always be greater than or equal to 'Minimum' level", () => {
    const minimumSlider = screen.getByTestId("minimum-slider");
    const occupiedSlider = screen.getByTestId("occupied-slider");
    fireEvent.change(minimumSlider, { target: { value: 60 } });
    const minimumValueEl = screen.getByTestId("minimum-value");
    fireEvent.change(occupiedSlider, { target: { value: 65 } });
    expect(minimumValueEl.innerHTML).toBe("60%");
    fireEvent.change(occupiedSlider, { target: { value: 40 } });
    expect(minimumValueEl.innerHTML).toBe("40%");
  });
});

afterEach(() => {
  jest.clearAllTimers();
  cleanup();
});
