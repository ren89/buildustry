import asyncHandler from "@/middlewares/asyncHandler";
import encryptPassword from "@/utils/encryptPassword";
import { prisma } from "@/lib/db";

//  @desc   Get single user by id
//  @route  GET /api/users/:id
//  @access Public
const getUserById = async (req, res) => {
  const { id } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
};

//  @desc   Update user
//  @route  PUT /api/users/:id
//  @access Private
const updateUserById = async (req, res) => {
  const { id } = req.query;

  const {
    firstName,
    lastName,
    username,
    password,
    email,
    contactNumber,
    rating,
  } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  let newRating;
  let newRatingCount;

  if (rating) {
    newRating = user.rating + rating;
    newRatingCount = user.ratingCount + 1;
  }

  let updatedUserData = {
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    username: username || user.username,
    email: email || user.email,
    contactNumber: contactNumber || user.contactNumber,
    rating: newRating || user.rating,
    ratingCount: newRatingCount || user.ratingCount,
  };

  if (password) {
    const hashedPassword = await encryptPassword(password);
    updatedUserData = {
      ...updatedUserData,
      password: hashedPassword,
    };
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: updatedUserData,
  });

  res.status(200).json(updatedUser);
};

//  @desc   Delete user
//  @route  DELETE /api/users/:id
//  @access Private
const deleteUserById = async (req, res) => {
  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ message: "User deleted successfully" });
};

export default asyncHandler(async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUserById(req, res);
      break;
    case "PUT":
      await updateUserById(req, res);
      break;
    case "DELETE":
      await deleteUserById(req, res);
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
});
