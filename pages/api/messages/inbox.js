// pages/api/message/index.js

import { Server } from "socket.io";
import { createServer } from "http";
import asyncHandler from "@/middlewares/asyncHandler";
import authMiddleware from "@/middlewares/authMiddleware";
import { prisma } from "@/lib/db";
import { userHelper } from "@/lib/helper";

let io;

export const config = {
  api: {
    bodyParser: true,
  },
};

const getMessages = authMiddleware(async (req, res) => {
  // Id of current user
  const { id: receiverId } = req.user;
  // Fetch all messages where the receiverId and senderId match
  const messages = await prisma.message.findMany({
    where: {
      receiverId,
    },
    include: {
      sender: {
        select: userHelper,
      },
      receiver: {
        select: userHelper,
      },
    },
    orderBy: { createdAt: "desc" },
    distinct: ["senderId"],
  });
  io.emit("messageUpdate", messages);
  res.status(200).json(messages);
});

const handler = asyncHandler(async (req, res) => {
  if (!res.socket.server.io) {
    console.log("New Io server connected");
    const httpServer = createServer(req.socket.server.app);
    io = new Server(httpServer);

    io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    res.socket.server.io = io;
  } else {
    io = res.socket.server.io;
  }
  switch (req.method) {
    case "GET":
      await getMessages(req, res);
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
});

export default handler;
