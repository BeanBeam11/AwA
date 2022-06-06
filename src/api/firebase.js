import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGE_SENDER_ID, APP_ID } from '@env';
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
};

const app_length = getApps().length > 0;

// Initialize Firebase
const app = app_length ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const uploadImage = async (file) => {
    if (!file) return;
    const blob = await getPictureBlob(file.uri);
    const storage = getStorage();
    const storageRef = ref(storage, 'profileImage/' + Date.now());
    const metadata = {
        contentType: 'image/jpeg',
    };
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
            alert(error);
        }
    );
    await uploadTask;
    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    return downloadURL;
};

export const getPictureBlob = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.onerror = (e) => {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
};
