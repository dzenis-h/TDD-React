import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

const wrapper = setup(); // init our pre-configured wrapper

test("renders without error", () => {
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  expect(incrementButton.length).toBe(1);
});

test("renders decrement button", () => {
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  expect(decrementButton.length).toBe(1);
});

test("renders counter display", () => {
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const initialCounterState = wrapper.state("count");
  expect(initialCounterState).toBe(0);
});

test("counter never goes below 0", () => {
  const isBiggerThanZero = wrapper.state("count");
  expect(isBiggerThanZero).toBeGreaterThanOrEqual(0);
});

test("clicking button increments counter display", () => {
  const count = 7;
  const wrapper = setup(null, { count });

  // find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(count + 1);
});

test("clicking button decrements counter display", () => {
  const count = 7;
  const wrapper = setup(null, { count });

  // find button and click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(count - 1);
});
