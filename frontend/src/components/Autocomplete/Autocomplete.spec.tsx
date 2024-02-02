import { render, fireEvent, screen } from "@testing-library/react";
import Autocomplete from "./Autocomplete";
import { describe, expect, it, vi } from "vitest";
import {
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  EMPTY_SEARCH_MESSAGE,
  ENTER_KEY,
  ESC_KEY,
  NOT_FOUND_MESSAGE,
} from "../../consts";

// Mock the useDebounce hook
vi.mock("../../hooks/useDebounce", () => ({
  default: (value: string) => [value],
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = () => null;

const sampleValues = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

describe("Autocomplete Component", () => {
  it("renders", () => {
    render(<Autocomplete onChange={() => {}} onSelect={() => {}} />);
  });

  it("handles input change and triggers onChange", () => {
    const onChangeMock = vi.fn();
    render(<Autocomplete onChange={onChangeMock} onSelect={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Search" } });

    expect(onChangeMock).toHaveBeenCalledWith("Search");
  });

  it("displays autocomplete list when input is focused with empty state", () => {
    render(<Autocomplete onChange={() => {}} onSelect={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);

    const autocompleteListEmpty = screen.getByText(EMPTY_SEARCH_MESSAGE);
    expect(autocompleteListEmpty).toBeInTheDocument();
  });

  it("should trigger onBlur when input lose focus", () => {
    const onBlurMock = vi.fn();
    render(
      <Autocomplete
        onChange={() => {}}
        onSelect={() => {}}
        onBlur={onBlurMock}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    expect(onBlurMock).toBeCalled();
  });

  it("displays autocomplete list with not found state", () => {
    render(<Autocomplete onChange={() => {}} onSelect={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Search" } });

    const autocompleteListEmpty = screen.getByText(NOT_FOUND_MESSAGE);
    expect(autocompleteListEmpty).toBeInTheDocument();
  });

  it("selects an item when clicked and triggers onSelect", () => {
    const onSelectMock = vi.fn();
    render(
      <Autocomplete
        values={sampleValues}
        onChange={() => {}}
        onSelect={onSelectMock}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Search" } });

    const optionElement = screen.getByText("Option 1");
    fireEvent.mouseDown(optionElement);

    expect(onSelectMock).toHaveBeenCalledWith(sampleValues[0]);
  });

  it("selects an item when press enter and triggers onSelect", () => {
    const onSelectMock = vi.fn();
    render(
      <Autocomplete
        values={sampleValues}
        onChange={() => {}}
        onSelect={onSelectMock}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Search" } });
    fireEvent.keyDown(inputElement, { key: ENTER_KEY });

    expect(onSelectMock).toHaveBeenCalledWith(sampleValues[0]);
  });

  it("handles keyboard navigation", () => {
    const onSelectMock = vi.fn();
    render(
      <Autocomplete
        values={sampleValues}
        onChange={() => {}}
        onSelect={onSelectMock}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Search" } });

    fireEvent.keyDown(inputElement, { key: ARROW_DOWN_KEY });
    expect(screen.getByText("Option 2").closest("li")).toHaveClass(
      "autocomplete__listitem--highlight"
    );

    fireEvent.keyDown(inputElement, { key: ARROW_DOWN_KEY });
    expect(screen.getByText("Option 3").closest("li")).toHaveClass(
      "autocomplete__listitem--highlight"
    );

    fireEvent.keyDown(inputElement, { key: ARROW_UP_KEY });
    expect(screen.getByText("Option 2").closest("li")).toHaveClass(
      "autocomplete__listitem--highlight"
    );

    fireEvent.keyDown(inputElement, { key: ARROW_UP_KEY });
    expect(screen.getByText("Option 1").closest("li")).toHaveClass(
      "autocomplete__listitem--highlight"
    );

    fireEvent.keyDown(inputElement, { key: ENTER_KEY });
    expect(onSelectMock).toHaveBeenCalledWith(sampleValues[0]);
  });

  it("shows the previous selected value when press esc", () => {
    const onSelectMock = vi.fn();
    render(
      <Autocomplete
        values={sampleValues}
        onChange={() => {}}
        onSelect={onSelectMock}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Search" } });

    const optionElement = screen.getByText("Option 1");
    fireEvent.mouseDown(optionElement);

    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: "Test" } });

    fireEvent.keyDown(inputElement, { key: ARROW_DOWN_KEY });
    expect(screen.getByText("Option 2").closest("li")).toHaveClass(
      "autocomplete__listitem--highlight"
    );

    fireEvent.keyDown(inputElement, { key: ESC_KEY });

    expect(
      screen.queryByPlaceholderText(sampleValues[0].label)
    ).toBeInTheDocument();

    expect(onSelectMock).toHaveBeenCalledWith(sampleValues[0]);
  });
});
