import { PageBtnContainer, Quiz } from "../components";
import Wrapper from "../assets/wrappers/QuizContainer";

import { useAllQuizzesContext } from "../pages/AllQuizzes";

const QuizzesContainer = () => {
  const { data } = useAllQuizzesContext();
  const { quizzes, totalQuizzes, numOfPages } = data;
  if (quizzes.length === 0) {
    return (
      <Wrapper>
        <h2>No quizzes to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalQuizzes} quiz{quizzes.length > 1 && "zzes"} found
      </h5>
      <div className="quizzes">
        {quizzes.map((quiz) => {
          return <Quiz key={quiz._id} {...quiz} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default QuizzesContainer;
