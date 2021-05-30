import React from "react";
import { mount, shallow,configure } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-17-updated";
import { BrowserRouter } from "react-router-dom";
import Topheader from "../components/header";
import Report from "../pages/Report/report";

import Dashboard from "../pages/Dashboard";

configure({ adapter: new Adapter() });

const initialState = {};
const createMockStore = configureMockStore(initialState);
describe("Dashboard Component", () => {
  it("Dashboard Top header Rendering", () => {
    const mockStore = createMockStore({});
    const wrapper = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
      );
    //   console.log(wrapper.find("#login").html());
    expect(wrapper.find(Topheader)).toHaveLength(1);
  });
  it("Dashboard type Agent Rendering", () => {
    const mockStore = createMockStore({});
    const wrapper = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Dashboard type="agent"/>
        </BrowserRouter>
      </Provider>
      );
    //   console.log(wrapper.find('h1').text());
    expect(wrapper.find('h1').text()).toEqual('Welcome to Dashboard....');
  });
  it("Dashboard type Admin Rendering", () => {
    const mockStore = createMockStore({});
    const wrapper = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Dashboard type="admin"/>
        </BrowserRouter>
      </Provider>
      );
    //   console.log(wrapper.find('h1').text());
    expect(wrapper.find(Report)).toHaveLength(1);
      
  });
});
