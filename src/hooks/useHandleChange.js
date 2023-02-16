import { useState } from "react";
function useHandleChange(initialValue) {
  const [state, setState] = useState(initialValue);
  const handleChange = (e) => setState(e.target.value);
  const handleReset = () => setState("");
  return [state, handleChange, handleReset];
}

export default useHandleChange;
