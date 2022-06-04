import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AddProgress from '../ProgressManagement/AddProgress/AddProgress';


test("progress name input should be rendered", () => {
  render(<AddProgress/>);
  const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
  expect(nameInputEl).toBeInTheDocument();
});

test("date input should be rendered", () => {
  render(<AddProgress />);
  const dateInputEl = screen.getByPlaceholderText(/Progress Date/i);
  expect(dateInputEl).toBeInTheDocument();
});

test("description input should be rendered", () => {
  render(<AddProgress />);
  const descriptionInputEl = screen.getByPlaceholderText(/Progress Description/i);
  expect(descriptionInputEl).toBeInTheDocument();
});

test("type input should be rendered", () => {
  render(<AddProgress />);
  const typeInputEl = screen.getByRole('radio', { name: 'PUBLISH' });
  expect(typeInputEl).toBeInTheDocument();
});

test("type input should be rendered", () => {
  render(<AddProgress />);
  const typeInputEl = screen.getByRole('radio', { name: 'UNPUBLISH' });
  expect(typeInputEl).toBeInTheDocument();
});


test("add progress button should be rendered", () => {
    render(<AddProgress />);
    const buttonEl = screen.getByRole('button', { name: 'Add Progress' })
    expect(buttonEl).toBeInTheDocument();
});

test("upload pdf button should be rendered", () => {
  render(<AddProgress />);
  const visibilityButtonEl = screen.getByRole('button', { name: 'Upload Pdf' })
  expect(visibilityButtonEl).toBeInTheDocument();
});

test("name input should be empty", () => {
  render(<AddProgress />);
  const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
  expect(nameInputEl.value).toBe("");
});

test("date input should be empty", () => {
    render(<AddProgress />);
    const dateInputEl = screen.getByPlaceholderText(/Progress Date/i);
    expect(dateInputEl.value).toBe("");
  });

test("description input should be empty", () => {
  render(<AddProgress />);
  const descriptionInputEl = screen.getByPlaceholderText(/Progress Description/i);
  expect(descriptionInputEl.value).toBe("");
});

test("name input should change", () => {
  render(<AddProgress />);
  const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
  const testValue = "test";

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  expect(nameInputEl.value).toBe(testValue);
});

test("date input should change", () => {
  render(<AddProgress />);
  const dateInputEl = screen.getByPlaceholderText(/Progress Date/i);
  const testValue = "2022-06-18";

  fireEvent.change(dateInputEl, { target: { value: testValue } });
  expect(dateInputEl.value).toBe(testValue);
});

test("description input should change", () => {
  render(<AddProgress />);
  const descriptionInputEl = screen.getByPlaceholderText(/Progress Description/i);
  const testValue = "test";

  fireEvent.change(descriptionInputEl, { target: { value: testValue } });
  expect(descriptionInputEl.value).toBe(testValue);
});

// test("user should be rendered after fetching", async () => {
//   render(<AddProgress />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const descriptionInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(nameInputEl, { target: { value: testValue } });
//   fireEvent.change(descriptionInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });