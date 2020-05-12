import React, { useEffect, useRef, useState } from "react";

function Counter() {
  const [count, setCount] = useState(20);

  useInterval(() => {
    // Your custom logic here
    setCount(count - 1);
  }, 1000);

  return count;
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export default Counter;
