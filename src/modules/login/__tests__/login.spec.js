/* eslint-disable */
import React from 'react';
import {shallow} from 'enzyme';
import LoginScreen from "../LoginView";
import fetchMock from 'fetch-mock';

describe('Test case for testing login', () => {

  let wrapper;

  test('username check', () => {
    wrapper = shallow(<LoginScreen/>);
    wrapper.find('TextInput').at(0).simulate('changeText', 'LojzaPucmidrat');
    expect(wrapper.state('username')).toEqual('LojzaPucmidrat');
  });

  it('password check', () => {
    wrapper = shallow(<LoginScreen/>);
    wrapper.find('TextInput').at(1).simulate('changeText', '1cTUA509KdAsTkCtKOiL');
    expect(wrapper.state('password')).toEqual('1cTUA509KdAsTkCtKOiL');
  });

  it('user is logging in', () => {
    fetchMock.mock('*', 'Hello World!');
    wrapper = shallow(<LoginScreen/>);

    wrapper.find('TextInput').at(0).simulate('changeText', 'LojzaPucmidrat');
    wrapper.find('TextInput').at(1).simulate('changeText', '1cTUA509KdAsTkCtKOiL');
    wrapper.find('Button').simulate('press');
    expect(wrapper.state('isLoggingIn')).toBe(true);
  });

  it('login button not active', () => {
    wrapper = shallow(<LoginScreen/>);

    wrapper.find('TextInput').at(0).simulate('changeText', '');
    wrapper.find('TextInput').at(1).simulate('changeText', '');
    expect(wrapper.find('Button').is('[disabled]')).toBe(true);
  })
});