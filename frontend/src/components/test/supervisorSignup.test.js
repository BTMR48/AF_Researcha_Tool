import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import SupervisorSignup from '../SupervisorManagement/SupervisorSignUp/SupervisorSignUp';


test("name input should be rendered", () => {
  render(<SupervisorSignup />);
  const nameInputEl = screen.getByPlaceholderText(/Full Name/i);
  expect(nameInputEl).toBeInTheDocument();
});

test("email input should be rendered", () => {
  render(<SupervisorSignup />);
  const emailInputEl = screen.getByPlaceholderText(/E-mail/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("phone input should be rendered", () => {
  render(<SupervisorSignup />);
  const phoneInputEl = screen.getByPlaceholderText(/Phone Number/i);
  expect(phoneInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<SupervisorSignup />);
  const passwordInputEl = screen.getByPlaceholderText('Password');
  expect(passwordInputEl).toBeInTheDocument();
});

test("confirm password input should be rendered", () => {
  render(<SupervisorSignup />);
  const confirmpasswordInputEl = screen.getByPlaceholderText('Confirm Password');
  expect(confirmpasswordInputEl).toBeInTheDocument();
});

test("register button should be rendered", () => {
    render(<SupervisorSignup />);
    const registerEl = screen.getByRole('button', { name: 'Register' })
    expect(registerEl).toBeInTheDocument();
});

test("upload img button should be rendered", () => {
  render(<SupervisorSignup />);
  const imgButtonEl = screen.getByRole('button', { name: 'Upload Profile Picture' })
  expect(imgButtonEl).toBeInTheDocument();
});

test(" img  should be rendered", () => {
  render(<SupervisorSignup />);
  const imgEl = screen.getByRole('img', { name: 'profile pic' })
  expect(imgEl).toBeInTheDocument();
});

  test("name input should change", () => {
    render(<SupervisorSignup />);
    const nameInputEl = screen.getByPlaceholderText(/Full Name/i);
    const testValue = "test";

    fireEvent.change(nameInputEl, { target: { value: testValue } });
    expect(nameInputEl.value).toBe(testValue);
  });
  
  test("email input should change", () => {
    render(<SupervisorSignup />);
    const emailInputEl = screen.getByPlaceholderText(/E-mail/i);
    const testValue = "test";

    fireEvent.change(emailInputEl, { target: { value: testValue } });
    expect(emailInputEl.value).toBe(testValue);
  });
  
  test("phone input should change", () => {
    render(<SupervisorSignup />);
    const phoneInputEl = screen.getByPlaceholderText(/Phone Number/i);
    const testValue = "test";

    fireEvent.change(phoneInputEl, { target: { value: testValue } });
    expect(phoneInputEl.value).toBe(testValue);
  });
  
  test("password input should change", () => {
    render(<SupervisorSignup />);
    const passwordInputEl = screen.getByPlaceholderText('Password');
    const testValue = "test";

    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });
  
  test("confirm password input should change", () => {
    render(<SupervisorSignup />);
    const confirmpasswordInputEl = screen.getByPlaceholderText('Confirm Password');
    const testValue = "test";

    fireEvent.change(confirmpasswordInputEl , { target: { value: testValue } });
    expect(confirmpasswordInputEl .value).toBe(testValue);
  });

// test("user should be rendered after fetching", async () => {
//   render(<SupervisorSignup />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const nameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const batchgroupInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(nameInputEl, { target: { value: testValue } });
//   fireEvent.change(batchgroupInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });