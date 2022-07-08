import { useState } from "react";
import numberWithCommas from "./helper";

const useCounter = () => {
  const [count, setCount] = useState(9999);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count - 1);

  return {
    count: numberWithCommas(count),
    increaseCount,
    decreaseCount
  };
};

export default useCounter;