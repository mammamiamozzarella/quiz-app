import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleOption } from "../features/answersSlice";
import {
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    color: inherit;
  }

  .MuiCheckbox-root {
    border-radius: 4px;
  }

  &.MuiFormControlLabel-root {
    border: 2px solid transparent;
    padding: 8px;
    transition: all 0.3s ease;

    &.correct {
      border-color: green;
    }

    &.incorrect {
      border-color: red;
    }
  }
`;

const FormRowCheckboxSet = ({
  questionId,
  options,
  labelText,
  questionType,
  isTestCompleted,
}) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector(
    (state) =>
      state.answers.answers.find((answer) => answer.questionId === questionId)
        ?.selectedOptions || [],
  );

  const handleChange = (optionId) => {
    dispatch(toggleOption({ questionId, optionId, questionType }));
  };

  return (
    <FormGroup>
      <FormLabel>{labelText}</FormLabel>
      {options.map((option) => {
        const isCorrect = option.isCorrect;
        const optionClass = isTestCompleted
          ? isCorrect
            ? "correct"
            : selectedOptions.includes(option._id)
              ? "incorrect"
              : ""
          : "";

        return (
          <StyledFormControlLabel
            key={option._id}
            control={<Checkbox />}
            checked={selectedOptions.includes(option._id)}
            onChange={() => handleChange(option._id)}
            label={option.text}
            className={optionClass}
            disabled={isTestCompleted}
          />
        );
      })}
    </FormGroup>
  );
};

export default FormRowCheckboxSet;
