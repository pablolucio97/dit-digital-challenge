import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingIndicator from ".";

describe("LoadingIndicator", () => {
  it("should render with default message", () => {
    render(<LoadingIndicator />);
    const loadingIndicator = screen.getByText("Loading data...");
    expect(loadingIndicator).toBeDefined();
  });

  it("should render with a custom message", () => {
    render(<LoadingIndicator message="Wait for a few seconds..." />);
    const loadingIndicator = screen.getByText("Wait for a few seconds...");
    expect(loadingIndicator).toBeDefined();
  });
});
