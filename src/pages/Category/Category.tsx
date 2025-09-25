import {NavLink, useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {fetchQuestionData, resetQuestions} from "../../store/questionsSlice.ts";

import styles from './Category.module.scss'
import Button from "../../components/Button/Button.tsx";

interface Question{
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[];
    question: string,
    type: string

}
const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

function Category() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const dispatch = useDispatch();
    const { categories } = useSelector((state: RootState) => state.quiz);
    const { loading, error, results } = useSelector((state: RootState) => state.questions);

    const [score, setScore] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);

    const firstQuestionRef = useRef<HTMLDivElement>(null);

    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    useEffect(() => {
        if (categoryId ) {
            dispatch(fetchQuestionData(categoryId));
        }
        // Очищаем вопросы при размонтировании (опционально)
        return () => {
            // dispatch(resetQuestions());
        };
    }, [dispatch, categoryId]);

    useEffect(() => {
        if (finished) {
            // Отключаем скролл, добавляя класс на body
            document.body.classList.add(styles.noScroll);
        } else {
            // Включаем скролл, убирая класс
            document.body.classList.remove(styles.noScroll);
        }
        // Очищаем класс при размонтировании компонента
        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, [finished]);

    const handleSetAnswer = useCallback((qIndex: string, answer: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [qIndex]: answer
        }));
    }, []);

    const shuffledOptions = useMemo(() => {
        const newShuffled: { [key: number]: string[] } = {};
        results.forEach((q, qIndex) => {
            const encodedAnswers = [...q.incorrect_answers, q.correct_answer];
            const shuffledEncoded = encodedAnswers.sort(() => Math.random() - 0.5);
            newShuffled[qIndex] = shuffledEncoded.map(decodeHTML);
        });
        return newShuffled;
    }, [results]);

    function checkAnswers() {
        if (Object.values(selectedAnswers).length === results.length) {

            let newScore:number = 0;
            for (const answer in selectedAnswers) {
                const correctAnswer = results.find((question)=>question.correct_answer === selectedAnswers[answer]);
                console.log(correctAnswer);
                if (correctAnswer) {
                    console.log('yes');
                    newScore++
                }
                else{
                    console.log('no');
                }

            }
            setScore(newScore);
            setFinished(true);
            //after end we will clear questions by code below
            // dispatch(resetQuestions());

        }
        else{
            alert('U need to answer all questions!!!')
            console.log('answer all questions');
        }

    }
    
    if (loading) {
        return <div >Loading questions...</div>;
    }

    if (error) {
        return <div >Error: {error}</div>;
    }

    return (
        <>
            {finished && <div className={styles.popup}>
                <div className={styles.popupWrapper}>
                    <h2 className={styles.popupHeader}>Your score: {score}</h2>
                    <NavLink onClick={()=>dispatch(resetQuestions())} className={styles.popupBtn} to={"/"}>Home</NavLink>
                </div>

            </div>}
            <div className={styles.main}>
                {/*results[0].category*/}


                <h1 className={styles.headerText}>Questions for Category "{categories?.find((cat)=>{
                    return cat.id === Number(categoryId)
                })?.name}"</h1>
                <div className={styles.grid}>
                    {results.map((question, index)=>{
                        const shuffled = shuffledOptions[index] || [];
                        return <div key={index} className={styles.question}>
                            <h3 className={styles.questionText}>{`${index+1}) ${decodeHTML(question.question)}`}</h3>
                            <div className={styles.answerSection}>
                                {shuffled.map((answer, aIndex)=>{
                                    return <label key={aIndex} className={styles.answerLabel}>
                                        {/*TODO: Nado fixing peremeshenie posle rendera*/}
                                        <input
                                            name={question.question}
                                            type='radio'
                                            key={`${aIndex}${answer}`}
                                            value={decodeHTML(answer)}
                                            checked={selectedAnswers[decodeHTML(question.question)] === decodeHTML(answer)}
                                            onChange={()=> {
                                                handleSetAnswer(decodeHTML(question.question), answer)
                                            }}
                                        />
                                        <span className={styles.answerText}>{decodeHTML(answer)}</span>
                                    </label>
                                })}
                            </div>

                        </div>
                    })}
                </div>
                <Button onClick={()=>checkAnswers()} text='check my answers'></Button>
            </div>
        </>

    );
}
// NADO FIXIT
export default Category;