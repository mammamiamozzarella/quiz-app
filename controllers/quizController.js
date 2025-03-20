import Quizzes from "../models/QuizModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllQuizzes = async (req, res) => {
  const { search, sort } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "name",
    "z-a": "-name",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const quizzes = await Quizzes.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "name");

  const totalQuizzes = await Quizzes.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalQuizzes / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalQuizzes, numOfPages, currentPage: page, quizzes });
};

export const createQuiz = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const quiz = await Quizzes.create(req.body);
  res.status(StatusCodes.CREATED).json({ quiz });
};

export const getQuiz = async (req, res) => {
  const quiz = await Quizzes.findById(req.params.id);
  res.status(StatusCodes.OK).json({ quiz });
};

export const updateQuiz = async (req, res) => {
  const updatedQuizzes = await Quizzes.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );
  res.status(StatusCodes.OK).json({ quizzes: updatedQuizzes });
};

export const deleteQuiz = async (req, res) => {
  const removedQuiz = await Quizzes.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ quiz: removedQuiz });
};
