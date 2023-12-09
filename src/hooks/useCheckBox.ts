import { useState } from 'react';

const useCheckBox = () => {
    const [checkbox, setCheckbox] = useState<boolean>(false);

  const handleChange = (e:any) => {
    setCheckbox(e.target.value);
  };

  return { checkbox, setCheckbox };
};

export default useCheckBox;