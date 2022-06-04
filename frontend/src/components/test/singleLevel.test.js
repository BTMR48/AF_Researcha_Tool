import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SingleLevel from '../ProgressManagement/SingleLevel/SingleLevel';



test("table should be rendered", () => {
  render(<SingleLevel />);
  const tableEl = screen.getByRole('table', { name: '' })
  expect(tableEl).toBeInTheDocument();
});

test("submit project button should be rendered", () => {
  render(<SingleLevel />);
  const buttonEl = screen.getByRole('button', { name: 'Submit Project' })
  expect(buttonEl).toBeInTheDocument();
});

test("view pdf button should be rendered", () => {
  render(<SingleLevel />);
  const pdfbuttonEl = screen.getByRole('button', { name: '' })
  expect(pdfbuttonEl).toBeInTheDocument();
});

// test("user should be rendered after fetching", async () => {
//   render(<SingleLevel />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const groupnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const batchgroupInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(groupnameInputEl, { target: { value: testValue } });
//   fireEvent.change(batchgroupInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });