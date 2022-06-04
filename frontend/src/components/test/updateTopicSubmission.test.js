import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import UpdateTopicSubmission from '../TopicEvaluation/UpdateTopicSubmission';


test("groupname input should be rendered", () => {
  render(<UpdateTopicSubmission />);
  const groupnameInputEl = screen.getByPlaceholderText(/Group Name/i);
  expect(groupnameInputEl).toBeInTheDocument();
});

test("topic input should be rendered", () => {
  render(<UpdateTopicSubmission />);
  const topicInputEl = screen.getByPlaceholderText(/Topic/i);
  expect(topicInputEl).toBeInTheDocument();
});

test("supervisor input should be rendered", () => {
  render(<UpdateTopicSubmission />);
  const supervisorInputEl = screen.getByPlaceholderText("Supervisor");
  expect(supervisorInputEl).toBeInTheDocument();
});

test("cosupervisor input should be rendered", () => {
  render(<UpdateTopicSubmission />);
  const cosupervisorInputEl = screen.getByPlaceholderText("Co-Supervisor");
  expect(cosupervisorInputEl).toBeInTheDocument();
});

test("feedback input should be rendered", () => {
  render(<UpdateTopicSubmission />);
  const feedbackInputEl = screen.getByPlaceholderText("Feedback");
  expect(feedbackInputEl).toBeInTheDocument();
});

test("dropdown menu should be rendered", () => {
    render(<UpdateTopicSubmission />);
    const dropdownbuttonEl = screen.getByRole('combobox', { name: '' })
    expect(dropdownbuttonEl).toBeInTheDocument();
});

test("update button should be rendered", () => {
    render(<UpdateTopicSubmission />);
    const buttonEl = screen.getByRole('button', { name: 'Update' })
    expect(buttonEl).toBeInTheDocument();
});

test("view pdf button should be rendered", () => {
  render(<UpdateTopicSubmission />);
  const pdfButtonEl = screen.getByRole('button', { name: '' })
  expect(pdfButtonEl).toBeInTheDocument();
});

test("feedback input should change", () => {
    render(<UpdateTopicSubmission />);
    const feedbakcInputEl = screen.getByPlaceholderText(/Feedback/i);
    const testValue = "test";

    fireEvent.change(feedbakcInputEl, { target: { value: testValue } });
    expect(feedbakcInputEl.value).toBe(testValue);
  });

// test("user should be rendered after fetching", async () => {
//   render(<UpdateTopicSubmission />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const groupnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const batchgroupInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(groupnameInputEl, { target: { value: testValue } });
//   fireEvent.change(batchgroupInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });