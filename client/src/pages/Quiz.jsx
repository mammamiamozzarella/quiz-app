import { useState } from "react";
import { useFormik } from "formik";
import { useParams, redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import {
  SubmitBtn,
  FormRowQuiz,
  FormRowCheckbox,
  FormRowRadiobutton,
  Question,
  Timer,
} from "../components";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/quiz/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard/all-quizzes");
  }
};

function Quiz() {
  const quizData = useLoaderData().quiz;
  const { id } = useParams();
  const answers = useSelector((state) => state.answers.answers);

  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStopped, setIsStopped] = useState(false);

  const calculateScore = () => {
    let score = 0;

    questions.forEach((question) => {
      const userAnswer = answers.find(
        (answer) => answer.questionId === question._id,
      );

      if (question.type === "multiple") {
        const correctOptions = question.options.filter(
          (option) => option.isCorrect,
        );
        const selectedOptions = userAnswer?.selectedOptions || [];

        const isCorrect = selectedOptions.every((selectedOption) =>
          correctOptions.some((option) => option._id === selectedOption),
        );
        score += isCorrect ? 1 : 0;
      } else if (question.type === "single") {
        const correctOption = question.options.find(
          (option) => option.isCorrect,
        );
        const isCorrect = userAnswer?.selectedOptions[0] === correctOption?._id;
        score += isCorrect ? 1 : 0;
      } else if (question.type === "input") {
        const correctAnswer = question.correctAnswer;
        const userInput = userAnswer?.answerText?.trim().toLowerCase();

        const isCorrect =
          correctAnswer && userInput === correctAnswer.toLowerCase();
        score += isCorrect ? 1 : 0;
      }
    });

    return score;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: quizData?.name || "",
      description: quizData?.description || "",
      questions: quizData?.questions || [],
      answers: [
        {
          questionId: "",
          answerText: "",
          selectedOptions: [],
        },
      ],
    },
    onSubmit: async () => {
      try {
        setIsStopped(true);
        const score = calculateScore();

        const requestData = {
          quizId: id,
          answers: answers.map(
            ({ questionId, answerText, selectedOptions }) => ({
              questionId,
              answerText:
                typeof answerText === "string" ? answerText : undefined,
              selectedOptions: Array.isArray(selectedOptions)
                ? selectedOptions
                : undefined,
            }),
          ),
          completionTime: elapsedTime,
        };

        await customFetch.post("/result", requestData);

        toast.success("Result submitted successfully");
        return null;
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  if (!quizData) return <p>No quizzes with that id</p>;

  const { questions, name, description } = quizData;

  return (
    <Card
      sx={{
        maxWidth: 1200,
        margin: "auto",
        padding: 2,
        backgroundColor: "#d6d6d6",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          {name}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" sx={{ mt: 2 }}>
          {description}
        </Typography>

        {!isStarted ? (
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ marginTop: "30px" }}
              variant="contained"
              color="success"
              onClick={() => setIsStarted(true)}
            >
              Start
            </Button>
          </Stack>
        ) : (
          <div>
            <Timer
              isStarted={isStarted}
              onElapsedTimeChange={setElapsedTime}
              isStopped={isStopped}
            />
            <form
              onSubmit={formik.handleSubmit}
              className="form"
              style={{ background: "transparent" }}
            >
              <Stack spacing={3} sx={{ mt: 3 }}>
                {questions.map((question) => (
                  <Question
                    key={question._id}
                    {...question}
                    isTestCompleted={isStopped}
                  />
                ))}

                <SubmitBtn />
              </Stack>
            </form>
            {isStopped && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Score: {calculateScore()} / {questions.length}
              </Typography>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Quiz;
