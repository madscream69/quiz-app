import {useParams} from "react-router-dom";
import {useCallback, useEffect, useMemo, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {fetchQuestionData, resetQuestions} from "../../store/questionsSlice.ts";

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
    const { loading, error, results } = useSelector((state: RootState) => state.questions);
    const firstQuestionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (categoryId) {
            dispatch(fetchQuestionData(categoryId));
        }
        // Очищаем вопросы при размонтировании (опционально)
        return () => {
            dispatch(resetQuestions());
        };
    }, [dispatch, categoryId]);


    if (loading) {
        return <div >Loading questions...</div>;
    }

    if (error) {
        return <div >Error: {error}</div>;
    }
    return (
        <div >
            <h1>Questions for Category "{results[0].category}"</h1>
            <ul>
                {results.map((question, index)=>{
                    return <li key={index}>
                        <h3>{`${index+1}) ${decodeHTML(question.question)}`}</h3>
                        <ul>
                            {[...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5).map((quest, index)=>{
                                return <li key={`${index}${quest}`}>
                                    {decodeHTML(quest)}
                                </li>
                            })}
                        </ul>

                    </li>
                })}
            </ul>

            <button onClick={()=>console.log(results)}>suck my dick</button>
        </div>
    );
}
// NADO FIXIT
export default Category;