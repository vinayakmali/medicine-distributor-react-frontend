import React from 'react';
import { shallow, mount, render,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from '../Login';

configure({adapter: new Adapter()});


import { createRender } from '@material-ui/core/test-utils';

describe('<Login />', () => {
  let render;

  before(() => {
    render = createRender();
  });

  it('should work', () => {
    const wrapper = render(<Login />);
  });
});



describe('Login Form Component', () => {
    const wrapper = shallow(<Login />);

    // make our assertion and what we expect to happen 
    it('Login Form Is Rendering', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    })

   })


   describe('Email and Password Field Component', () => {
    const wrapper = shallow(<Login />);
        // make our assertion and what we expect to happen 
        it('renders a email and password input', () => {
            expect(wrapper.find('InputText').exists()).toBeTruthy();
           })
    });


    describe('Submit Field Component', () => {
        const wrapper = shallow(<Login />);
            // make our assertion and what we expect to happen 
            it('renders a Submit Button', () => {
                expect(wrapper.find('InputButton').exists()).toBeTruthy();
               })
        });
