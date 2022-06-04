import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import UpdateProgress from '../ProgressManagement/UpdateProgress/UpdateProgress';


test("progress name input should be rendered", () => {
  render(<UpdateProgress/>);
  const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
  expect(nameInputEl).toBeInTheDocument();
});

test("date input should be rendered", () => {
  render(<UpdateProgress />);
  const dateInputEl = screen.getByPlaceholderText(/Progress Date/i);
  expect(dateInputEl).toBeInTheDocument();
});

test("description input should be rendered", () => {
  render(<UpdateProgress />);
  const descriptionInputEl = screen.getByPlaceholderText(/Progress Description/i);
  expect(descriptionInputEl).toBeInTheDocument();
});

test("type input should be rendered", () => {
  render(<UpdateProgress />);
  const typeInputEl = screen.getByRole('combobox', { name: '' });
  expect(typeInputEl).toBeInTheDocument();
});

test("update progress button should be rendered", () => {
    render(<UpdateProgress />);
    const buttonEl = screen.getByRole('button', { name: 'Update Progress' })
    expect(buttonEl).toBeInTheDocument();
});

test("upload pdf button should be rendered", () => {
  render(<UpdateProgress />);
  const pdfButtonEl = screen.getByRole('button', { name: 'Update Image' })
  expect(pdfButtonEl).toBeInTheDocument();
});

test("name input should change", () => {
  render(<UpdateProgress />);
  const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
  const testValue = "test";

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  expect(nameInputEl.value).toBe(testValue);
});

test("date input should change", () => {
  render(<UpdateProgress />);
  const dateInputEl = screen.getByPlaceholderText(/Progress Date/i);
  const testValue = "2022-06-18";

  fireEvent.change(dateInputEl, { target: { value: testValue } });
  expect(dateInputEl.value).toBe(testValue);
});

test("description input should change", () => {
  render(<UpdateProgress />);
  const descriptionInputEl = screen.getByPlaceholderText(/Progress Description/i);
  const testValue = "test";

  fireEvent.change(descriptionInputEl, { target: { value: testValue } });
  expect(descriptionInputEl.value).toBe(testValue);
});

// test("user should be rendered after fetching", async () => {
//   render(<UpdateProgress />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const descriptionInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(nameInputEl, { target: { value: testValue } });
//   fireEvent.change(descriptionInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });