import { useSelector, useDispatch } from "react-redux";
import { setAnswer } from "../features/answersSlice";
import styled from "styled-components";

const StyledInput = styled.input`
  border: 2px solid transparent;
  padding: 8px;
  transition: all 0.3s ease;

  &.correct {
    border-color: green;
  }

  &.incorrect {
    border-color: red;
  }
`;

const FormRowRedux = ({ questionId, labelText, isTestCompleted }) => {
  const dispatch = useDispatch();
  const answer = useSelector((state) =>
    state.answers.answers.find((a) => a.questionId === questionId),
  );

  const handleChange = (e) => {
    dispatch(
      setAnswer({
        questionId,
        answerText: e.target.value,
        selectedOptions: [],
      }),
    );
  };

  const isCorrect = answer?.answerText === "correct_answer";
  const inputClass = isTestCompleted
    ? isCorrect
      ? "correct"
      : "incorrect"
    : "";

  return (
    <div className="form-row">
      <label htmlFor="input" className="form-label">
        {labelText}
      </label>
      <StyledInput
        id="input"
        className={inputClass}
        type="text"
        value={answer?.answerText || ""}
        onChange={handleChange}
        disabled={isTestCompleted}
      />
    </div>
  );
};

export default FormRowRedux;
