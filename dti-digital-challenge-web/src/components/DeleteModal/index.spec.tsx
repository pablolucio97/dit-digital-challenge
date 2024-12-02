import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeleteModal from "./";

describe("DeleteModal", () => {
  it("should display the resource name and messages correctly", () => {
    render(
      <DeleteModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirmAction={vi.fn()}
        resourceName="user"
      />
    );

    expect(
      screen.getByText(/Are you sure about deleting this user?./)
    ).toBeDefined();
  });

  it("should call onClose when the Cancel button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        onClose={handleClose}
        onConfirmAction={vi.fn()}
        resourceName="user"
      />
    );

    const cancelButton = screen.getByTestId("modal-delete-cancel-button");
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should call onConfirmAction with the resource name when the Confirm button is clicked", () => {
    const handleConfirm = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        onClose={vi.fn()}
        onConfirmAction={handleConfirm}
        resourceName="user"
      />
    );

    const confirmButton = screen.getByTestId("modal-delete-confirm-button");
    fireEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
