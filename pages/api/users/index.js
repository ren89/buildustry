import asyncHandler from '@/middlewares/asyncHandler';
import encryptPassword from '@/utils/encryptPassword';
import { prisma } from '@/lib/db';

//  @desc   Get all users
//  @route  GET /api/users
//  @access Private
const getUsers = async (req, res) => {
	const { role } = req.query;
	const users = await prisma.user.findMany();

	let filteredUsers = users;

	if (role) {
		filteredUsers = users.filter((user) => user.role === role);
	}
	res.status(200).json(filteredUsers);
};

//  @desc   Create user
//  @route  POST /api/users
//  @access Public
const createUsers = async (req, res) => {
	const { firstName, lastName, username, password, email, contactNumber } =
		req.body;

	// Find the user by username or email
	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ username }, { email }],
		},
	});

	if (existingUser) {
		res
			.status(404)
			.json({ message: 'User already exists with this credentials' });
	}

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
