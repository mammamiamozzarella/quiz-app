import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Questionnaire.questions",
  },
  answerText: { type: String },
  selectedOptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questionnaire.questions.options",
    },
  ],
});

const QuizResultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Quiz",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  answers: [AnswerSchema],
  completionTime: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("QuizResult", QuizResultSchema);
