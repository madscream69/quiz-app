import {useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {fetchQuestionData, resetQuestions} from "../../store/questionsSlice.ts";

import styles from './Category.module.scss'

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
            let score:number = 0
            for (const answer in selectedAnswers) {
                const correctAnswer = results.find((question)=>question.correct_answer === selectedAnswers[answer]);
                console.log(correctAnswer);
                if (correctAnswer) {
                    console.log('yes');
                    score++;
                }
                else{
                    console.log('no');
                }

            }
            //after end we will clear questions by code below
            // dispatch(resetQuestions());
            return score;
        }
        else{
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

            <button onClick={()=>checkAnswers()}>suck my dick</button>
        </div>
    );
}
// NADO FIXIT
export default Category;