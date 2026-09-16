import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

// Create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(404).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        age: age ? Number(age) : null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

// Get/Fetch all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched all the Users",
      data: users,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: true,
      message: "Failed to fetch users",
    });
  }
};
