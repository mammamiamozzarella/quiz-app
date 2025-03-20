import { useFormik } from "formik";
import { FaTrash } from "react-icons/fa";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRowQuiz, FormRowSelect, QuestionItem } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const AddQuiz = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      questions: [
        {
          text: "",
          type: "text",
          options: [],
          correctAnswer: "",
        },
      ],
    },
    onSubmit: async (values) => {
      try {
        const requestData = {
          name: values.name,
          description: values.description,
          questions: values.questions,
        };

        await customFetch.post("/quiz", requestData);
        toast.success("Quizzes added successfully");
      } catch (error) {
        toast.error(error?.response?.data?.msg || "Something went wrong");
      }
    },
  });

  const { values, handleChange, setFieldValue } = formik;
  const { questions } = values;
  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;

    setFieldValue("questions", updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[questionIndex];

    if (currentQuestion.type === "single") {
      currentQuestion.correctAnswer = value;
    } else if (currentQuestion.type === "multiple") {
      if (currentQuestion.correctAnswer.includes(value)) {
        currentQuestion.correctAnswer = currentQuestion.correctAnswer.filter(
          (option) => option !== value,
        );
      } else {
        currentQuestion.correctAnswer.push(value);
      }
    }

    setFieldValue("questions", updatedQuestions);
  };

  const handleAddQuestion = () => {
    setFieldValue("questions", [
      ...questions,
      { text: "", type: "text", options: [], correctAnswer: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setFieldValue("questions", updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[
      questionIndex
    ].options.filter((_, i) => i !== optionIndex);
    setFieldValue("questions", updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setFieldValue("questions", updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];

    if (question.type === "single") {
      question.options = question.options.map((option, index) => {
        if (index === optionIndex) {
          return { ...option, isCorrect: true };
        }
        return { ...option, isCorrect: false };
      });
    } else if (question.type === "multiple") {
      question.options = question.options.map((option, index) => {
        if (index === optionIndex) {
          return { ...option, isCorrect: !option.isCorrect };
        }
        return option;
      });
    } else if (question.type === "text") {
      question.correctAnswer = optionIndex;
    }

    setFieldValue(`questions[${questionIndex}].options`, question.options);
  };

  return (
    <Wrapper>
      <form onSubmit={formik.handleSubmit} className="form">
        <h4 className="form-title">Add Quizzes</h4>
        <div className="form-center">
          <FormRowQuiz
            type="text"
            name="name"
            labelText="Quizzes Name"
            value={values.name}
            onChange={handleChange}
          />
          <FormRowQuiz
            type="textarea"
            name="description"
            labelText="Description"
            value={values.description}
            onChange={handleChange}
          />

          {questions.map((question, index) => (
            <QuestionItem
              key={index}
              question={question}
              index={index}
              handleInputChange={handleInputChange}
              handleOptionChange={handleOptionChange}
              handleCorrectAnswerChange={handleCorrectAnswerChange}
              handleRemoveOption={handleRemoveOption}
              handleRemoveQuestion={handleRemoveQuestion}
              handleAddOption={handleAddOption}
              formik={formik}
            />
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="btn form-btn"
          >
            Add Question
          </button>

          <button type="submit" className="btn form-btn">
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddQuiz;
