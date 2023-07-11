import { PrismaClient } from '@prisma/client';
import asyncHandler from '@/middlewares/asyncHandler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

//  @desc   Login user
//  @route  GET /api/auth/login
//  @access Public
const loginUser = async (req, res) => {
	const { identifier, password } = req.body;

	// Find the user by username or email
	const user = await prisma.user.findFirst({
		where: {
			OR: [{ username: identifier }, { email: identifier }],
		},
	});

	if (!user) {
		res.status(401).json({ message: 'Invalid username or password' });
		return;
	}

	// Compare the provided password with the hashed password
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		res.status(401).json({ message: 'Invalid username or password' });
		return;
	}

	const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
		expiresIn: '30d',
	});

	res.status(200).json({ token, user });
};

export default asyncHandler(async (req, res) => {
	switch (req.method) {
		case 'POST':
			await loginUser(req, res);
			break;
		default:
			res.status(405).json({ message: 'Method not allowed' });
			break;
	}
});
