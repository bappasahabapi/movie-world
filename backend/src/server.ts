
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import { setupSwagger } from './config/swagger';
import { notFound, errorHandler } from './middleware/error';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.send('API running'));
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

setupSwagger(app);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI as string).then(() => {
  app.listen(PORT, () => console.log(`Server on :${PORT}`));
});
