import styles from './quiz.module.scss';
import {Image, Stack} from "react-bootstrap";
import sample from '../../assets/images/sample.png'

const QuizCard = ({ quiz, onClick }) => {
    return (
        <div className={styles.quizCard} onClick={onClick}
             style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <Image src={sample} width={170} height={130} />
            <h4 className={"mt-3"}>퀴즈의 제목</h4>
            <span>퀴즈에 대한 설명입니다.</span>
            <Stack direction={"horizontal"} className={'justify-content-between'}>
                <span>제작자: 닉네임</span>
                <span>총 80문제</span>
            </Stack>
        </div>
    );
}

export default QuizCard;