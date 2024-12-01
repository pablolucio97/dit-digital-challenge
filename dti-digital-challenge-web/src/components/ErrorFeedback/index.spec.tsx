import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorFeedback from './'; 

describe('ErrorFeedback', () => {
  it('renders the default error message if no message is provided', () => {
    render(<ErrorFeedback />);
    const defaultMessage = screen.getByText(/something went wrong\. please, try again later\./i);
    expect(defaultMessage).toBeDefined()
  });

  it('renders the provided error message', () => {
    const testMessage = "Custom error message";
    render(<ErrorFeedback message={testMessage} />);
    const customMessage = screen.getByText(testMessage);
    expect(customMessage).toBeDefined();
  });
});