import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AdminSignIn from '../AdminManagement/AdminLogin';

// jest.mock("axios", () => ({

//   default: {
//     get: () => ({
//       data: { id: 1, name: "Admin" },
//     }),
//   },
// }));

test("email input should be rendered", () => {
  render(<AdminSignIn/>);
  const emailInputEl = screen.getByPlaceholderText(/E-mail/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<AdminSignIn />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("password visibility button should be rendered", () => {
  render(<AdminSignIn />);
  const visibilityButtonEl = screen.getByRole('button', { name: '' })
  expect(visibilityButtonEl).toBeInTheDocument();
});

test("signin button should be rendered", () => {
  render(<AdminSignIn />);
  const buttonEl = screen.getByRole('button', { name: 'Sign In' })
  expect(buttonEl).toBeInTheDocument();
});

test("email input should be empty", () => {
  render(<AdminSignIn />);
  const emailInputEl = screen.getByPlaceholderText(/E-mail/i);
  expect(emailInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<AdminSignIn />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

// test("Password visibility button should be disabled", () => {
//   render(<AdminSignIn />);
//   const visibilityButtonEl = screen.getByRole('button', { name: '' });
//   expect(visibilityButtonEl).toBeDisabled();
// });


test("email input should change", () => {
  render(<AdminSignIn />);
  const emailInputEl = screen.getByPlaceholderText(/E-mail/i);
  const testValue = "test";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<AdminSignIn />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

// test("admin should be fetched", async () => {
//   render(<AdminSignIn />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const emailInputEl = screen.getByPlaceholderText(/E-mail/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(emailInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });