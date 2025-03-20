import { FaListUl, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Quiz";
import QuizInfo from "./QuizInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayArrow";

day.extend(advancedFormat);

const Quiz = ({ _id, name, description, questions, createdAt, createdBy }) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const { user } = useOutletContext();
  const currentUserId = user?._id;
  const canEditDelete = currentUserId === createdBy._id;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{name.charAt(0)}</div>
        <div className="info">
          <h5>{name}</h5>
          <p>{description}</p>
        </div>
        <div>
          <Button variant="contained" endIcon={<PlayIcon />}>
            <Link to={`../run-quiz/${_id}`}>Run</Link>
          </Button>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <QuizInfo
            icon={<FaListUl />}
            text={`Questions: ${questions.length}`}
          />
          <QuizInfo icon={<FaCalendarAlt />} text={date} />
          <QuizInfo
            icon={<FaUserAlt />}
            text={`Created By ${createdBy.name}`}
          />
        </div>

        <footer className="actions">
          {canEditDelete && (
            <>
              <Link to={`../edit-quiz/${_id}`} className="btn edit-btn">
                Edit
              </Link>
              <Form method="post" action={`../delete-quiz/${_id}`}>
                <button type="submit" className="btn delete-btn">
                  Delete
                </button>
              </Form>
            </>
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Quiz;
