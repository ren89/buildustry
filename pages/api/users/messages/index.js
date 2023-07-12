import { PrismaClient } from '@prisma/client';
import asyncHandler from '@/middlewares/asyncHandler';
import authMiddleware from '@/middlewares/authMiddleware';
import { initSocket, getSocket } from '@/pages/api/chat';
import http from 'http';

const prisma = new PrismaClient();

const server = http.createServer();
initSocket(server);

const getMessages = authMiddleware(async (req, res) => {
	// Id of current user
	const { id: receiverId } = req.user;
	// Id of user who message current user
	const { senderId } = req.query;

	// Fetch all messages where the receiverId and senderId match
	const messages = await prisma.message.findMany({
		where: {
			OR: [
				{ receiverId: receiverId, senderId: senderId },
				{ receiverId: senderId, senderId: receiverId },
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

	const io = getSocket();
	io.emit('messageUpdate', messages);

	res.status(200).json(messages);
});

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

	const io = getSocket();
	io.emit('newMessage', message);

	res.status(201).json(message);
});

export default asyncHandler(async (req, res) => {
	switch (req.method) {
		case 'GET':
			await getMessages(req, res);
			break;
		case 'POST':
			await sendMessage(req, res);
			break;
		default:
			res.status(405).json({ message: 'Method not allowed' });
			break;
	}
});
