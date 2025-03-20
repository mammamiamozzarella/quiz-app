import styled from "styled-components";

const Wrapper = styled.article`
  .MuiFormControlLabel-root.correct input {
    border: 1px solid green;
  }

  .MuiFormControlLabel-root.incorrect input {
    border: 1px solid red;
  }

  .MuiFormControlLabel-root.correct label {
    border: 1px solid green;
  }

  .MuiFormControlLabel-root.incorrect label {
    border: 1px solid red;
  }
`;

export default Wrapper;
