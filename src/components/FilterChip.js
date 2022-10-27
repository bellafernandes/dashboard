import React, { useState, useRef } from "react";
import { useSpring, useChain, animated } from "react-spring";

const springConfig = {
  tension: 425,
  friction: 25,
  clamp: true
};

const FilterChip = ({ children, className, click, active }) => {
  const [focused, setFocused] = useState(false);
  const buttonSpring = useSpring({
    config: springConfig,
    borderWidth: focused ? "2px " : "0px",
    background: active ? "#bdbdbd" : "#eeeeee",
    color: active ? "#212121" : "#616161"
  });
  const shiftRef = useRef();
  const shiftSpring = useSpring({
    config: springConfig,
    ref: shiftRef,
    marginLeft: active ? "16px" : "0px"
  });

  const checkRef = useRef();
  const checkSpring = useSpring({
    config: springConfig,
    ref: checkRef,
    from: { offset: 24 },
    offset: active ? 0 : 24
  });
  useChain(active ? [shiftRef, checkRef] : [checkRef, shiftRef], [0, 0.1]);

  return (
    <>
      <animated.button
        className={className}
        onClick={() => click()}
        style={buttonSpring}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
        }}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "2px"
            }}
          >
            <animated.svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#212121"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={24}
              strokeDashoffset={checkSpring.offset}
              className="feather-check"
            >
              <polyline points="4 12 9 17 20 6" />
            </animated.svg>
          </span>
          <animated.span style={{ ...shiftSpring }}>{children}</animated.span>
        </div>
      </animated.button>
    </>
  );
};

export default FilterChip;
