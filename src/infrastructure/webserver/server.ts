import cors from "cors";
import express from 'express';
import Groq from "groq-sdk";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import * as chat from '../../chat';
import { GroqServiceImpl } from "../services/GroqServiceImpl";
import { TelegramServiceImpl } from '../services/TelegramServiceImpl';
import errorHandler from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

// Allow requests from http://127.0.0.1:5500
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const server = http.createServer(app);
const socketServer = new SocketIOServer(server,{
  cors: {
    origin: 'http://127.0.0.1:5500', // Allow requests from this origin
    methods: ['GET', 'POST'] // Allow only specified methods
  }
});
const groqInstance = new Groq({
  apiKey: process.env.GROQ_API,
})

const telegramService = new TelegramServiceImpl(process.env.TELEGRAM_BOT_TOKEN!); // Replace with your bot token
const groqService = new GroqServiceImpl(groqInstance)

chat.initChat(socketServer,telegramService,groqService);
app.use(errorHandler);

export default server;
