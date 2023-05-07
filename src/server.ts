import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";

// import routes
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';

// import middlewares
import { auth } from "./middleware/auth";

dotenv.config();

const port = process.env.SERVER_PORT || 3000;
const app = express();

/** CONNECT TO DATABASE */
if (process.env.MONGO_URI) {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to database');
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
} else {
    console.error('MONGO_URI environment variable is not set.');
    process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/** ROUTES */
app.use('/auth', authRoutes);
app.use('/user', auth, userRoutes);

/** HEALTHCHECK */
app.get('/healthcheck', (req, res, next) => {
    res.status(200).json({ message: "OK" });
})

http.createServer(app).listen(port, () => {
    console.log(`Server is running on port ${port}`)
})