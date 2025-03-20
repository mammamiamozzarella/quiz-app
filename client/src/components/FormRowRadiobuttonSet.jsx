import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toggleOption } from "../features/answersSlice";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    color: inherit;
  }

  .MuiRadio-root {
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

const FormRowRadiobuttonSet = ({
  questionId,
  options,
  labelText,
  questionType,
  isTestCompleted,
}) => {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) =>
      state.answers.answers.find((answer) => answer.questionId === questionId)
        ?.selectedOptions[0] || "",
  );

  const handleChange = (optionId) => {
    dispatch(toggleOption({ questionId, optionId, questionType }));
  };

  return (
    <FormControl component="fieldset" sx={{ mt: 2 }}>
      <FormLabel sx={{ fontWeight: "bold" }}>{labelText}</FormLabel>
      <RadioGroup
        name={`radio-buttons-group-${questionId}`}
        value={selectedOption}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((option) => {
          const isCorrect = option.isCorrect;
          const optionClass = isTestCompleted
            ? isCorrect
              ? "correct"
              : selectedOption === option._id
                ? "incorrect"
                : ""
            : "";

          return (
            <StyledFormControlLabel
              key={option._id}
              value={option._id}
              control={<Radio />}
              label={option.text}
              disabled={isTestCompleted}
              className={optionClass}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default FormRowRadiobuttonSet;
