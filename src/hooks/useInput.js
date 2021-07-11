import { useState } from "react";

function useInput(initValue, schema) {
  const [value, setValue] = useState(initValue);
  const [hasChanged, setHasChanged] = useState(false);
  const reset = () => {
    setValue(initValue);
    setHasChanged(false);
  };
  const validate = schema.validate(value);
  const bind = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
      !hasChanged && setHasChanged(true);
    },
  };
  return [value, bind, reset, validate, hasChanged, hasChanged];
}

export default useInput;
