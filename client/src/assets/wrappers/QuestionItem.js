import styled from 'styled-components';

const Wrapper = styled.section`
  .question-type-wrapper {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: grid;
      grid-template-columns: 2fr 1fr 0.5fr;
    gap: 1rem;
      align-items: end;
  }
    
    .btn-remove {
        height: 35px;
        background: transparent;
        color: var(--text-secondary-color);
    }
`;
export default Wrapper;