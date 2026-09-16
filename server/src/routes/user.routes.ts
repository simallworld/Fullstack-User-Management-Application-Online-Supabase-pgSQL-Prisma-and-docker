import express from "express";

const router = express.Router();

const userRoutes = (req, res) => {
  res.send("Hey");
};

export default userRoutes;
