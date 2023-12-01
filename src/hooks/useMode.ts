import { useState } from 'react';

const useMode = () => {
  const [value, setValue] = useState('');

  const handleChange = (e:any) => {
    setValue(e.target.value);
  };

  return { value, handleChange };
};

export default useMode;