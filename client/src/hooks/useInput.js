import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  //   const reset = () => {
  //     setValue(initialValue);
  //   };

  const onChange = (e) => {
    return setValue(e.target.value);
  };

  const bind = { value, onChange };

  return [value, setValue, bind];
};

export default useInput;
