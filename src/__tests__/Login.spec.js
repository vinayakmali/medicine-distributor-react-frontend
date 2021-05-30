import React from "react";
import { mount,configure } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-17-updated";

import Login from "../pages/Login/Login";

configure({ adapter: new Adapter() });

const initialState = {};
const createMockStore = configureMockStore(initialState);
describe("Login Form fComponent", () => {
  test("Login Form Is Rendering", () => {
    const mockStore = createMockStore({});
    const wrapper = mount(
      <Provider store={mockStore}>
        <Login />
      </Provider>
    );
    expect(wrapper.find("#login")).toHaveLength(1);
  });
});
