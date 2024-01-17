import { useState } from "react";
import { Help } from "../../types/type";

const useHelp = () => {
  const [help, setHelp] = useState<Help>({
    userId: "",
    head: "",
    content: "",
    role: "",
    level: 0,
    category: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHelp((prevSheet) => ({
      ...prevSheet,
      [name]: name === "level" ? parseInt(value) : value,
    }));
  };

  return {
    help,
    handleInputChange,
  };
};
export default useHelp;
