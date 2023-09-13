import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import BlogRoutes from './routes/Blog.routes';
import bodyParser from 'body-parser';

require('dotenv').config();
const mongoURI = process.env.MONGO_URI as string;
mongoose
  .connect(mongoURI)
  .then(async () => {
    try {
    } catch (error) {}
    console.log('DB Connected.');
  })
  .catch((err) => console.log(err));
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/blog', BlogRoutes);
export default app;
