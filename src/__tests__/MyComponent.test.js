import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import "@testing-library/jest-dom";
expect.extend(toHaveNoViolations);
import MyComponent from "../MyComponent";

// 1. Snapshot Test
it("matches snapshot", () => {
  const { asFragment } = render(<MyComponent />);
  expect(asFragment()).toMatchSnapshot();
});

// 2. Rendering Test
it("renders without errors", () => {
  render(<MyComponent />);
});

// 3. Conditional Rendering Test
it("renders count conditionally", () => {
  const { getByText } = render(<MyComponent initialCount={5} />);
  expect(getByText("Count: 5")).toBeInTheDocument();
});

// 4. Event Handling Test
it("handles click event", () => {
  const { getByText } = render(<MyComponent />);
  fireEvent.click(getByText("Increment"));
  expect(getByText("Count: 1")).toBeInTheDocument();
});

// 5. Callback Function Test
it("calls the onButtonClick callback with the new count value", () => {
  const onButtonClick = jest.fn();
  const { getByText } = render(<MyComponent onButtonClick={onButtonClick} />);
  fireEvent.click(getByText("Increment"));
  expect(onButtonClick).toHaveBeenCalledWith(1);
});

// 6. Lifecycle Method Test 
it("simulates the effect of lifecycle methods", () => {
  const { unmount, getByText, rerender } = render(
    <MyComponent initialCount={5} />
  );
  expect(getByText("Count: 5")).toBeInTheDocument();
  rerender(<MyComponent initialCount={10} />);
  unmount();
});

// 7. Asynchronous Behavior Test 
it("handles asynchronous operations", async () => {
  
});

// 8. Error Handling Test
it("displays errors", () => {
  const { getByText } = render(<MyComponent initialCount={-1} />);
  expect(getByText("Error: Count cannot be negative")).toBeInTheDocument(); 
});

// 9. CSS Styling Test
it("has correct style", () => {
  const { getByText } = render(<MyComponent />);
  const incrementButton = getByText("Increment");
  expect(incrementButton).toHaveClass("increment-button");
});

// 10. Accessibility Test
it("is accessible", async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// 11. Props Test
it("renders with different props", async () => {
  const { getByText, rerender, findByText } = render(
    <MyComponent initialCount={5} />
  );
  expect(getByText("Count: 5")).toBeInTheDocument();
  rerender(<MyComponent initialCount={10} />);

 
  const count10Element = await findByText("Count: 10");
  expect(count10Element).toBeInTheDocument();
});



it("updates state correctly", () => {
  const { getByText } = render(<MyComponent initialCount={0} />);
  const incrementButton = getByText("Increment");

 
  expect(getByText("Count: 0")).toBeInTheDocument();

  
  fireEvent.click(incrementButton);
  expect(getByText("Count: 1")).toBeInTheDocument();
});

it("handles edge case of null initial count", () => {
  const { getByText } = render(<MyComponent initialCount={null} />);


  expect(getByText("Count: 0")).toBeInTheDocument();
});
