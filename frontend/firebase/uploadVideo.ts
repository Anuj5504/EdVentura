import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadVideo = async (file: File) => {
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", 
        (snapshot) => {
            console.log(`Upload Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
        }, 
        (error) => console.error("Upload failed", error), 
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at:", downloadURL);
            return downloadURL; 
        }
    );
};
