import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Report from "../pages/Report/report";
import Dashboard from "../pages/Dashboard";
beforeEach(() => {
  jest.resetAllMocks();
  
});
afterEach(() => {
    cleanup()
});
jest.mock('react-chartjs-2', () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null
}));
describe("Dashboard Component", () => {
  it("Dashboard Top header Rendering", () => {
    const { getByTestId } = render(<BrowserRouter> <Dashboard /></BrowserRouter>);
    expect(getByTestId('topheader')).toBeInTheDocument();
  });
  it("Dashboard Report Rendering", () => {
    const { getByTestId } = render(<Report />);
    expect(getByTestId('report')).toBeInTheDocument();
    expect(getByTestId('report-select-field')).toBeInTheDocument();
  });
  
});
