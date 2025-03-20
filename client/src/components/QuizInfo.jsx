import Wrapper from '../assets/wrappers/QuizInfo';

const QuizInfo = ({ icon, text }) => {
    return (
        <Wrapper>
            <span className='quiz-icon'>{icon}</span>
            <span className='quiz-text'>{text}</span>
        </Wrapper>
    );
};
export default QuizInfo;