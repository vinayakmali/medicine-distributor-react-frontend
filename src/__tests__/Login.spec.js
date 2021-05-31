import React from "react";
import { render, cleanup ,fireEvent ,waitFor,debug} from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect"
import Login from "../pages/Login/Login";
beforeEach(() => {
  jest.resetAllMocks();
});
afterEach(() => {
  cleanup();
});
const initialState = {};
const createMockStore = configureMockStore(initialState);
describe("Login Form fComponent", () => {
  const mockStore = createMockStore({});
  test("Login Form Is Rendering", () => {
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <Login />
      </Provider>
    );
    expect(getByTestId("loginForm")).toBeInTheDocument();
  });
  test("Login Form validation test",async () => {
    const { getByTestId , debug } = render(
      <Provider store={mockStore}>
        <Login />
      </Provider>
    );
    // debug();
    const emailElement = getByTestId("emailText").querySelector('input');
    const passwordElement = getByTestId("passwordText").querySelector('input');
    const formElement = getByTestId("formElement");
    fireEvent.submit(formElement);
    const errorElement = getByTestId("errorText");
    expect(errorElement.textContent).toBe("Please enter Username");
    fireEvent.change(emailElement, {
      target: {
        value:"karan.chauhan@hotmail.com"
      }
    }) 
    fireEvent.submit(formElement);
    expect(errorElement.textContent).toBe("Please enter Password");
  });
});
