import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import UpdateRequest from '../RequestManagement/UpdateRequest/UpdateRequest';


test("groupname should be rendered", () => {
  render(<UpdateRequest/>);
  const groupnameInputEl = screen.getByPlaceholderText(/Group Name/i);
  expect(groupnameInputEl).toBeInTheDocument();
});

test("Topic should be rendered", () => {
  render(<UpdateRequest />);
  const topicInputEl = screen.getByPlaceholderText(/Topic/i);
  expect(topicInputEl).toBeInTheDocument();
});

test("dropdown should be rendered", () => {
  render(<UpdateRequest />);
  const typeInputEl = screen.getByRole('combobox', { name: '' });
  expect(typeInputEl).toBeInTheDocument();
});

test("update button should be rendered", () => {
    render(<UpdateRequest />);
    const buttonEl = screen.getByRole('button', { name: 'Update' })
    expect(buttonEl).toBeInTheDocument();
});

test("dropdown input should be change", () => {
    render(<UpdateRequest />);
    const typeEl = screen.getByRole('combobox', { name: '' })
    const testValue = "Approve";

    fireEvent.change(typeEl, { target: { value: testValue } });
    expect(typeEl.value).toBe(testValue);
});

// test("name input should be empty", () => {
//   render(<UpdateRequest />);
//   const groupnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   expect(groupnameInputEl.value).toBe("");
// });

// test("date input should change", () => {
//   render(<UpdateRequest />);
//   const nameInputEl = screen.getByPlaceholderText(/Progress Date/i);
//   const testValue = "2022-06-18";

//   fireEvent.change(nameInputEl, { target: { value: testValue } });
//   expect(nameInputEl.value).toBe(testValue);
// });

// test("description input should change", () => {
//   render(<UpdateRequest />);
//   const batchgroupInputEl = screen.getByPlaceholderText(/Progress Description/i);
//   const testValue = "test";

//   fireEvent.change(batchgroupInputEl, { target: { value: testValue } });
//   expect(batchgroupInputEl.value).toBe(testValue);
// });

// test("user should be rendered after fetching", async () => {
//   render(<UpdateRequest />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const groupnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const batchgroupInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(groupnameInputEl, { target: { value: testValue } });
//   fireEvent.change(batchgroupInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });