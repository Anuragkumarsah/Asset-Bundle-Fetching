const { initializeApp } =  require("firebase/app");

const { getStorage, ref, getDownloadURL } = require("firebase/storage");



const firebaseConfig = {
    apiKey: "AIzaSyDZo-Ub8fKVuOfYstxVoYhT236iH_3pRbk",
    authDomain: "modeluploads-1e0a4.firebaseapp.com",
    projectId: "modeluploads-1e0a4",
    storageBucket: "modeluploads-1e0a4.appspot.com",
    messagingSenderId: "940124087195",
    appId: "1:940124087195:web:c873a74fee6179f1a6373e",
    measurementId: "G-JJYKQE8WHL"
};

const firebase = initializeApp(firebaseConfig);
const storage  = getStorage(firebase);

const cors = require('cors');


const express = require('express');
const app = express();

const port = 3000;

app.use(cors());

app.get('/data', async (req, res) => {
    const id = req.query.id;

    if(!id) {
        return res.status(400).send('ID is required');
    }
    const fileRef = ref(storage, `models/${id}`);

    const downloadURL = await getDownloadURL(fileRef);
    res.send(downloadURL)
    console.log(downloadURL);
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});