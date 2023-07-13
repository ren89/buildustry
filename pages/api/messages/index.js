// pages/api/message/index.js

import { Server } from 'socket.io';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '@/middlewares/asyncHandler';
import authMiddleware from '@/middlewares/authMiddleware';

let io;
const prisma = new PrismaClient();

export const config = {
	api: {
		bodyParser: true,
	},
};

const sendMessage = authMiddleware(async (req, res) => {
	// Id of current user
	const { id: senderId } = req.user;
	// Id of user who message current user
	const { receiverId } = req.query;
	const { content } = req.body;

	const message = await prisma.message.create({
		data: {
			content,
			senderId,
			receiverId,
		},
		include: {
			sender: {
				select: {
					firstName: true,
					lastName: true,
					id: true,
				},
			},
			receiver: {
				select: {
					firstName: true,
					lastName: true,
					id: true,
				},
			},
		},
	});

	io.emit('newMessage', message);
	console.log(message);
	res.status(201).json(message);
});

const getMessages = authMiddleware(async (req, res) => {
	// Id of current user
	const { id: receiverId } = req.user;
	// Id of user who message current user
	const { senderId } = req.query;
	// Fetch all messages where the receiverId and senderId match
	const messages = await prisma.message.findMany({
		where: {
			OR: [
				{
					AND: [{ senderId: senderId }, { receiverId: receiverId }],
				},
				{
					AND: [{ receiverId: senderId }, { senderId: receiverId }],
				},
			],
		},
		include: {
			sender: {
				select: {
					firstName: true,
					lastName: true,
					id: true,
				},
			},
			receiver: {
				select: {
					firstName: true,
					lastName: true,
					id: true,
				},
			},
		},
		orderBy: { createdAt: 'asc' },
	});
	io.emit('messageUpdate', messages);
	res.status(200).json(messages);
});

const handler = asyncHandler(async (req, res) => {
	if (!res.socket.server.io) {
		console.log('New Io server connected');
		const httpServer = createServer(req.socket.server.app);
		io = new Server(httpServer);

		io.on('connection', (socket) => {
			console.log(`New client connected: ${socket.id}`);
			socket.on('disconnect', () => {
				console.log(`Client disconnected: ${socket.id}`);
			});
		});

		res.socket.server.io = io;
	} else {
		io = res.socket.server.io;
	}
	switch (req.method) {
		case 'POST':
			await sendMessage(req, res);
			break;
		case 'GET':
			await getMessages(req, res);
			break;
		default:
			res.status(405).json({ message: 'Method not allowed' });
			break;
	}
});

export default handler;
