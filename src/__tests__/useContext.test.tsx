import React, { createContext, useContext, FC } from "react";
import { useTestProxy } from "../useTestProxy";

const TestContext = createContext(0);

const Wrapper: FC<{ val: number }> = ({ val, children }) => (
  <TestContext.Provider value={val}>{children}</TestContext.Provider>
);

it("will get the default value", () => {
  const [prxContext] = useTestProxy(useContext);
  const res = prxContext(TestContext);
  expect(res).toBe(0);
});

it("will get the value from the above context", () => {
  const [prxContext, control] = useTestProxy(useContext, {
    wrapper: Wrapper,
    props: { val: 2 }
  });
  {
    const res = prxContext(TestContext);
    expect(res).toBe(2);
  }
  {
    control.props = { val: 3 };
    const res = prxContext(TestContext);
    expect(res).toBe(3);
  }
});
