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

// Get one user or user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid user Id",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(404).json({
        success: true,
        message: "User not found!!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched user",
      data: user,
    });
  } catch (err) {
    console.error(err);

    res.status(404).json({
      success: false,
      message: "Failed to fetch User",
    });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid user Id",
      });
    }

    const { name, email, age } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        age: age !== undefined ? Number(age) : null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Updated user successfully!!",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);

    return res.status(404).json({
      success: true,
      message: "Failed to update user",
    });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid user Id",
      });
    }

    const existedUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(404).json({
      success: false,
      message: "Failed to delete the user",
    });
  }
};
