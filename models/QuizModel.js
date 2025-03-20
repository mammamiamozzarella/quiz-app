import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false }
});

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: {
        type: String,
        enum: ["text", "single", "multiple"],
        required: true
    },
    options: [OptionSchema],
    correctAnswer: { type: String }
});

const QuizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    questions: [QuestionSchema],
    completions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

export default mongoose.model('Quizzes', QuizSchema);