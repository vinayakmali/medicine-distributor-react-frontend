import React from "react";
import { shallow, configure } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from 'react-redux'
import Adapter from "enzyme-adapter-react-17-updated";

import Login from "../pages/Login/Login";

configure({ adapter: new Adapter() });

const initialState = {};
const createMockStore = configureMockStore(initialState);
describe("Login Form Component", () => {


  it("Login Form Is Rendering", () => {
    const mockStore = createMockStore({});
    const wrapper = shallow(<Provider store={mockStore}><Login /></Provider>);
    expect(wrapper.find("#login")).toBeTruthy();
  });
});

// describe("Email and Password Field Component", () => {
//   const wrapper = shallow(<Login />);
//   // make our assertion and what we expect to happen
//   it("renders a email and password input", () => {
//     expect(wrapper.find("InputText").exists()).toBeTruthy();
//   });
// });

// describe("Submit Field Component", () => {
//   const wrapper = shallow(<Login />);
//   // make our assertion and what we expect to happen
//   it("renders a Submit Button", () => {
//     expect(wrapper.find("InputButton").exists()).toBeTruthy();
//   });
// });
