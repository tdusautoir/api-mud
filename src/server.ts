import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";

// import routes
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import confirmationRoutes from './routes/confirmation.route'

// import middlewares
import { auth } from "./middleware/auth";
import { requestLogger } from './middleware/requestLogger';

// import libraries
import Logging from './library/Logging';

dotenv.config();

const port = process.env.SERVER_PORT || 3000;
const app = express();

/** CONNECT TO DATABASE */
if (process.env.MONGO_URI) {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            Logging.info('Connected to database');
        })
        .catch((error) => {
            Logging.error('Unable to connect to database :', error);
            process.exit(1);
        });
} else {
    Logging.error('MONGO_URI environment variable is not set.');
    process.exit(1);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(requestLogger);

/** ROUTES */
app.use('/auth', authRoutes);
app.use('/user', auth, userRoutes);
app.use('/mail', confirmationRoutes)

/** HEALTHCHECK */
app.get('/healthcheck', (req, res, next) => {
    res.status(200).json({ message: 'OK' });
});

http.createServer(app).listen(port, () => {
    Logging.info(`Server is running on port ${port}`);
});