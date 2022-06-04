import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import TopicSubmission from '../TopicEvaluation/TopicSubmission';


test("groupname input should be rendered", () => {
  render(<TopicSubmission />);
  const groupnameInputEl = screen.getByPlaceholderText(/Group Name/i);
  expect(groupnameInputEl).toBeInTheDocument();
});

test("topic input should be rendered", () => {
  render(<TopicSubmission />);
  const topicInputEl = screen.getByPlaceholderText(/Topic/i);
  expect(topicInputEl).toBeInTheDocument();
});

test("supervisor input should be rendered", () => {
  render(<TopicSubmission />);
  const supervisorInputEl = screen.getByPlaceholderText("Supervisor");
  expect(supervisorInputEl).toBeInTheDocument();
});

test("cosupervisor input should be rendered", () => {
  render(<TopicSubmission />);
  const cosupervisorInputEl = screen.getByPlaceholderText("Co-Supervisor");
  expect(cosupervisorInputEl).toBeInTheDocument();
});

test("submit button should be rendered", () => {
    render(<TopicSubmission />);
    const buttonEl = screen.getByRole('button', { name: 'Submit' })
    expect(buttonEl).toBeInTheDocument();
});

test("upload pdf button should be rendered", () => {
  render(<TopicSubmission />);
  const pdfButtonEl = screen.getByRole('button', { name: 'Upload Pdf' })
  expect(pdfButtonEl).toBeInTheDocument();
});

test("groupname input should change", () => {
    render(<TopicSubmission />);
    const groupnameInputEl = screen.getByPlaceholderText(/Group Name/i);
    const testValue = "test";

    fireEvent.change(groupnameInputEl, { target: { value: testValue } });
    expect(groupnameInputEl.value).toBe(testValue);
  });
  
  test("topic input should change", () => {
    render(<TopicSubmission />);
    const topicInputEl = screen.getByPlaceholderText(/Topic/i);
    const testValue = "test";

    fireEvent.change(topicInputEl, { target: { value: testValue } });
    expect(topicInputEl.value).toBe(testValue)
  });
  
  test("supervisor input should change", () => {
    render(<TopicSubmission />);
    const supervisorInputEl = screen.getByPlaceholderText("Supervisor");
    const testValue = "test";
    
    fireEvent.change(supervisorInputEl, { target: { value: testValue } });
    expect(supervisorInputEl.value).toBe(testValue)
  });
  
  test("cosupervisor input should change", () => {
    render(<TopicSubmission />);
    const cosupervisorInputEl = screen.getByPlaceholderText("Co-Supervisor");
    const testValue = "test";

    fireEvent.change(cosupervisorInputEl, { target: { value: testValue } });
    expect(cosupervisorInputEl.value).toBe(testValue)
  });

// test("user should be rendered after fetching", async () => {
//   render(<TopicSubmission />);
//   const buttonEl = screen.getByRole('button', { name: 'Sign In' });
//   const groupnameInputEl = screen.getByPlaceholderText(/Progress Name/i);
//   const batchgroupInputEl = screen.getByPlaceholderText(/Progress Description/i);

//   const testValue = "test";

//   fireEvent.change(groupnameInputEl, { target: { value: testValue } });
//   fireEvent.change(batchgroupInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("Admin");

// });