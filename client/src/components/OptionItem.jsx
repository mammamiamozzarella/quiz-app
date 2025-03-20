import { FaTrash } from "react-icons/fa";
import {
  FormRowQuiz,
  FormRowCheckbox,
  FormRowRadiobutton,
} from "../components";
import Wrapper from "../assets/wrappers/OptionItem";

const OptionItem = ({
  question,
  questionIndex,
  option,
  optionIndex,
  handleOptionChange,
  handleRemoveOption,
  handleCorrectAnswerChange,
  formik,
  handleInputChange,
}) => {
  return (
    <Wrapper>
      <div className="option-row">
        {question.type === "single" ? (
          <FormRowRadiobutton
            name={`questions[${questionIndex}].options[${optionIndex}].isCorrect`}
            value={
              !!formik.values.questions[questionIndex].options[optionIndex]
                .isCorrect
            }
            onChange={() =>
              handleCorrectAnswerChange(questionIndex, optionIndex)
            }
          />
        ) : (
          <FormRowCheckbox
            name={`questions[${questionIndex}].options[${optionIndex}].isCorrect`}
            value={
              !!formik.values.questions[questionIndex].options[optionIndex]
                .isCorrect
            }
            onChange={() =>
              handleCorrectAnswerChange(questionIndex, optionIndex)
            }
          />
        )}
        <FormRowQuiz
          type="text"
          name={`questions[${questionIndex}].options[${optionIndex}].text`}
          value={
            formik.values.questions[questionIndex].options[optionIndex].text
          }
          onChange={formik.handleChange}
        />
        <button
          type="button"
          className="btn-icon btn-remove"
          onClick={() => handleRemoveOption(questionIndex, optionIndex)}
        >
          <FaTrash />
        </button>
      </div>
    </Wrapper>
  );
};

export default OptionItem;
