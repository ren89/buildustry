import asyncHandler from '@/middlewares/asyncHandler';
import encryptPassword from '@/utils/encryptPassword';
import { prisma } from '@/lib/db';

//  @desc   Register user
//  @route  GET /api/auth/register
//  @access Public
const registerUser = async (req, res) => {
	const {
		firstName,
		lastName,
		username,
		password,
		email,
		contactNumber,
		role,
	} = req.body;

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
	await prisma.user.create({
		data: {
			firstName,
			lastName,
			username,
			role,
			password: hashedPassword,
			email,
			contactNumber,
		},
	});

	res.status(201).json({ message: 'User successfully created.' });
};

export default asyncHandler(async (req, res) => {
	switch (req.method) {
		case 'POST':
			await registerUser(req, res);
			break;
		default:
			res.status(405).json({ message: 'Method not allowed' });
			break;
	}
});
