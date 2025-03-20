import { FaTrash } from "react-icons/fa";
import { FormRowQuiz, FormRowSelect } from "../components";
import OptionItem from "./OptionItem";
import Wrapper from "../assets/wrappers/QuestionItem";

const QuestionItem = ({
  question,
  index,
  handleInputChange,
  handleOptionChange,
  handleCorrectAnswerChange,
  handleRemoveOption,
  handleRemoveQuestion,
  handleAddOption,
  formik,
}) => {
  return (
    <Wrapper>
      <div className="question-item">
        <div className="question-type-wrapper">
          <FormRowQuiz
            type="text"
            name={`questions[${index}].text`}
            labelText={`Question ${index + 1}`}
            value={question.text}
            onChange={(e) => handleInputChange(index, "text", e.target.value)}
          />
          <FormRowSelect
            labelText={`Question ${index + 1} Type`}
            name={`questions[${index}].type`}
            value={question.type}
            list={["text", "single", "multiple"]}
            onChange={(e) => handleInputChange(index, "type", e.target.value)}
          />
          <button
            type="button"
            className="btn-icon btn-remove"
            onClick={() => handleRemoveQuestion(index)}
          >
            <FaTrash />
          </button>
        </div>

        {["single", "multiple"].includes(question.type) && (
          <div className="form-row">
            <label>Options</label>
            {question.options.map((option, optionIndex) => (
              <OptionItem
                key={optionIndex}
                question={question}
                questionIndex={index}
                option={option}
                optionIndex={optionIndex}
                handleOptionChange={handleOptionChange}
                handleRemoveOption={handleRemoveOption}
                handleCorrectAnswerChange={handleCorrectAnswerChange}
                formik={formik}
                handleInputChange={handleInputChange}
              />
            ))}
            <button
              className="btn form-btn"
              type="button"
              onClick={() => handleAddOption(index)}
            >
              Add Option
            </button>
          </div>
        )}

        {question.type === "text" && (
          <FormRowQuiz
            type="text"
            name={`questions[${index}].correctAnswer`}
            labelText={`Correct Answer for Question ${index + 1}`}
            value={question.correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default QuestionItem;
