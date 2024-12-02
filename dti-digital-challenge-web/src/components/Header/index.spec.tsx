import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from ".";

const mockGoBack = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(mockGoBack),
  useLocation: () => ({ pathName: "/albums" }),
}));

describe("Header", () => {
  it("should display the Header component", () => {
    render(<Header pageTitle="Albums" />);
    const header = screen.getByTestId("header-component");
    expect(header).toBeDefined();
  });

  it("should call goBack function at pressing back button", () => {
    render(<Header pageTitle="Albums" />);
    const goBackButton = screen.getByTestId("header-component-go-back-button");
    fireEvent.click(goBackButton);
    expect(mockGoBack).toHaveBeenCalledWith(-1);
  });
});
