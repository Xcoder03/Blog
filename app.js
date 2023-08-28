import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoute.js';
import postRoutes from './routes/PostRoute.js';
import { database } from './config/DbConnect.js';

dotenv.config();
database();

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 8080;

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts",postRoutes);


app.listen(PORT, console.log(`Omor everywhere stew at port ${PORT} server don set.`))
