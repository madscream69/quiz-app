import {useState} from "react";
import * as React from "react";

import styles from './CreateQuiz.module.scss'

function CreateQuiz() {
    const [amountOfAnswers, setAmountOfAnswers] = useState<number>(1);
    const [inputValues, setInputValues] = useState<string[]>(Array(amountOfAnswers).fill(''));

    // Хендлер для изменения количества из number-input
    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1 && value <= 9) { // Минимальное значение — 1, чтобы избежать ошибок
            setAmountOfAnswers(value);
            // Синхронизируем массив значений: добавляем/удаляем элементы
            setInputValues((prev) => {
                const newValues = [...prev];
                if (value > prev.length) {
                    // Добавляем пустые значения
                    newValues.push(...Array(value - prev.length).fill(''));
                } else {
                    // Удаляем лишние
                    newValues.splice(value);
                }
                return newValues;
            });
        }
    };

    // Хендлер для обновления значения динамического input по индексу
    const handleInputChange = (index: number, value: string) => {
        const newValues = [...inputValues];
        newValues[index] = value;
        setInputValues(newValues);
    };


    return (
        <main className={styles.main}>
            <h3 className={styles.title}>Create your own quiz:</h3>

            <div className={styles.createQuiz}>
                <div className={styles.theme}>
                    <label className={styles.themeLabel}>Theme:</label>
                    <input className={styles.themeInput} type="text"/>
                </div>
                <div className={styles.question}>
                    <label className={styles.questionLabel}>Question:</label>
                    <input className={styles.questionInput} type="text"/>
                </div>
                <div className={styles.correct}>
                    <label className={styles.correctLabel}>Correct answer:</label>
                    <input className={styles.correctInput} type="text"/>
                </div>
                <div className={styles.amount}>
                    <label className={styles.amountLabel}>Amount of incorrect answers:</label>
                    <input
                        placeholder={`${amountOfAnswers}`}
                        value={amountOfAnswers}
                        onChange={handleNumChange}
                        type="text"
                        className={styles.amountInput}
                    />
                    <button className={styles.amountBtn} onClick={()=>setAmountOfAnswers((prevState)=>prevState < 9 ? prevState + 1 : prevState)}>+</button>
                    <button className={styles.amountBtn} onClick={()=>setAmountOfAnswers((prevState)=> prevState > 1 ? prevState - 1 : prevState
                    )}>-</button>
                </div>

                {/*
                    todo:fix input
                */}
                {Array.from({ length: amountOfAnswers }).map((_, index) => (
                    <div key={index} className={styles.incorrect}>
                        <label className={styles.incorrectLabel}>Incorrect answer {index + 1}:</label>
                        <input
                            className={styles.incorrectInput}
                            type="text"
                            value={inputValues[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder={`Incorrect answer ${index + 1}`}
                        />
                    </div>
                ))}
            </div>


        </main>
    );
}

export default CreateQuiz;