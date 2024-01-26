"use server"

import axios from "axios";

const getComplaint = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/complaint");
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  export {
    getComplaint,
  }