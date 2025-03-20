import { FormRow, FormRowSelect, SubmitBtn } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { QUIZ_SORT_BY } from "../../../utils/constants";
import { useAllQuizzesContext } from "../pages/AllQuizzes";

const SearchContainer = () => {
  const { searchValues } = useAllQuizzesContext();
  const { search, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(QUIZ_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link to="/dashboard/all-quizzes" className="btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
