
import { storage } from "../../firebaseConfig";
import {  getDownloadURL, list, ref } from "firebase/storage";


const usePullFiles = () => {
  
    const getUrlFile = async (path: string) => {
      try {
  
        const storageRef = ref(storage, path);
        const item = await list(storageRef)
  
        // Use async/await to handle promises
        const url = await getDownloadURL(item.items[0]);
        console.log(url);
        return url;
      } catch (error) {
        // Handle errors gracefully
        console.error(error);
        return null;
      }
    };
  
    return { getUrlFile };
  };

export default usePullFiles;
