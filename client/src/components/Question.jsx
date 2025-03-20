import { useSelector } from "react-redux";
import { FaListUl, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Quiz";
import {
  FormRow,
  FormRowRedux,
  FormRowRadiobuttonSet,
  FormRowCheckboxSet,
} from "./index.js";

const Question = ({ text, type, options, _id, formik, isTestCompleted }) => {
  const answers = useSelector((state) => state.answers.answers);
  const userAnswer = answers.find((answer) => answer.questionId === _id);

  const correctOption = options.find((option) => option.isCorrect);
  const correctAnswer = correctOption ? correctOption.text : null;

  const isAnswerCorrect = userAnswer?.answerText === correctAnswer;
  const answerClass =
    userAnswer?.answerText !== undefined
      ? isAnswerCorrect
        ? "correct"
        : "incorrect"
      : "";

  return (
    <Wrapper>
      {type === "text" && <FormRowRedux questionId={_id} labelText={text} />}
      {type === "single" && (
        <FormRowRadiobuttonSet
          questionId={_id}
          labelText={text}
          options={options}
          questionType={type}
          isTestCompleted={isTestCompleted}
          answerClass={answerClass}
        />
      )}
      {type === "multiple" && (
        <FormRowCheckboxSet
          questionId={_id}
          labelText={text}
          options={options}
          questionType={type}
          isTestCompleted={isTestCompleted}
          answerClass={answerClass}
        />
      )}
    </Wrapper>
  );
};

export default Question;
