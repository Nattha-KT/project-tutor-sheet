import { storage } from "../../firebaseConfig";
import {
  getBlob,
  getBytes,
  getDownloadURL,
  getStream,
  list,
  ref,
} from "firebase/storage";

const useFile = () => {
  const getUrlFile = async (path: string) => {
    try {
      const storageRef = ref(storage, path);
      const item = await list(storageRef);

      // Use async/await to handle promises
      const url = await getDownloadURL(item.items[0]);
      return url;
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      return null;
    }
  };

  const DownloadFileSDK = async (path: string,sheetName:string) => {
    try {
      const storageRef = ref(storage, path);
      const item = await list(storageRef);

      const blob = await getBlob(item.items[0], 40 * 1024 * 1024);
      const pdfOptions = { type: "application/pdf" };
      // Convert Blob to File
      const file = new File([blob], `${sheetName}_Tutor-Sheet.pdf`, pdfOptions);

      // Create a download link and trigger click
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      return null;
    }
  };

  return { getUrlFile, DownloadFileSDK };
};

export default useFile;
