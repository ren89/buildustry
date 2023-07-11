import { PrismaClient } from '@prisma/client';
import asyncHandler from '@/middlewares/asyncHandler';
import encryptPassword from '@/middlewares/encryptPassword';

const prisma = new PrismaClient();

//  @desc   Get all users
//  @route  GET /api/users
//  @access Private/Admin
const getUsers = async (req, res) => {
	const users = await prisma.user.findMany();
	res.status(200).json(users);
};

//  @desc   Create user
//  @route  POST /api/users
//  @access Public
const createUsers = async (req, res) => {
	const { firstName, lastName, username, password, email, contactNumber } =
		req.body;

	const hashedPassword = await encryptPassword(password);
	const user = await prisma.user.create({
		data: {
			firstName,
			lastName,
			username,
			password: hashedPassword,
			email,
			contactNumber,
		},
	});
	res.status(201).json(user);
};

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1mb',
		},
	},
};

export default asyncHandler(async (req, res) => {
	switch (req.method) {
		case 'GET':
			await getUsers(req, res);
			break;
		case 'POST':
			await createUsers(req, res);
			break;
		default:
			res.status(405).json({ message: 'Method not allowed' });
			break;
	}
});
