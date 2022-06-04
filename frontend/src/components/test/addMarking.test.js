import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AddMarking from '../MarkingSchemeManagement/AddMarking';


test("marking name input should be rendered", () => {
  render(<AddMarking/>);
  const markingnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
  expect(markingnameInputEl).toBeInTheDocument();
});

test("add marking button should be rendered", () => {
    render(<AddMarking />);
    const buttonEl = screen.getByRole('button', { name: 'Add Progress' })
    expect(buttonEl).toBeInTheDocument();
});

test("upload pdf button should be rendered", () => {
  render(<AddMarking />);
  const pdfButtonEl = screen.getByRole('button', { name: 'Upload Pdf' })
  expect(pdfButtonEl).toBeInTheDocument();
});


test("description input should change", () => {
  render(<AddMarking />);
  const markingnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
  const testValue = "test";

  fireEvent.change(markingnameInputEl, { target: { value: testValue } });
  expect(markingnameInputEl.value).toBe(testValue);
});

// test("user should be rendered after fetching", async () => {
//   render(<AddMarking />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const groupnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const batchgroupInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(groupnameInputEl, { target: { value: testValue } });
//   fireEvent.change(batchgroupInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });