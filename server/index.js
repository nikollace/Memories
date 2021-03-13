import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//We are adding prefix posts to all router from routes/posts.js
app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://nikollace:nana123456@memoriesapp.lgd20.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);