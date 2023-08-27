// const [progressUpload, setProgressUpload] = useState<number[]>([]);

// const handleUploadFile = async () => {
//   setIsUploading(true);

//   const uploadPromises = imageFileList.map((file_list) => {
//     const name = file_list.name;
//     const storageRef = ref(storage, `image/${name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file_list);

//     return new Promise<void>((resolve, reject) => {
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//           setProgressUpload((progressUpload) => {
//             const newProgressUpload = [...progressUpload];
//             newProgressUpload[index] = progress;
//             return newProgressUpload;
//           }); // to show progress upload

//           if (progress === 100) {
//             resolve(); // Resolve the promise when progress reaches 100
//           }

//           switch (snapshot.state) {
//             case 'paused':
//               console.log('Upload is paused');
//               break;
//             case 'running':
//               console.log('Upload is running');
//               break;
//           }
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
//   });

//   try {
//     await Promise.all(uploadPromises); // Wait for all uploads to complete
//     console.log('All uploads completed');
//     // Proceed with further actions
//   } catch (error) {
//     message.error(error.message);
//   } finally {
//     setIsUploading(false);
//   }
// };
