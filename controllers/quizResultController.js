import QuizResult from "../models/QuizResultModel.js";
import { StatusCodes } from "http-status-codes";

export const createQuizResult = async (req, res) => {
  req.body.userId = req.user.userId;
  const quizResult = await QuizResult.create(req.body);
  res.status(StatusCodes.CREATED).json({ quizResult });
};
