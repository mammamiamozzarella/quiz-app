import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionId, answerText, selectedOptions } = action.payload;
      const existingAnswer = state.answers.find(
        (a) => a.questionId === questionId,
      );
      if (existingAnswer) {
        existingAnswer.answerText = answerText;
        existingAnswer.selectedOptions = selectedOptions;
      } else {
        state.answers.push({ questionId, answerText, selectedOptions });
      }
    },
    toggleOption: (state, action) => {
      const { questionId, optionId, questionType } = action.payload;

      const existingAnswer = state.answers.find(
        (a) => a.questionId === questionId,
      );

      if (existingAnswer) {
        if (questionType === "single") {
          existingAnswer.selectedOptions = [optionId];
        } else {
          if (existingAnswer.selectedOptions.includes(optionId)) {
            existingAnswer.selectedOptions =
              existingAnswer.selectedOptions.filter((id) => id !== optionId);
          } else {
            existingAnswer.selectedOptions.push(optionId);
          }
        }
      } else {
        const newAnswer = {
          questionId,
          selectedOptions: [optionId],
        };

        if (questionType === "single") {
          newAnswer.selectedOptions = [optionId];
        }

        state.answers.push(newAnswer);
      }
    },

    resetAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const { setAnswer, toggleOption, resetAnswers } = answersSlice.actions;
export default answersSlice.reducer;
