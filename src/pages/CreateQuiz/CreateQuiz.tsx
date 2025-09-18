

function CreateQuiz() {
    return (
        <>
            <h1>Create your own quiz:</h1>
            <label>Theme:
                <input type="text"/>

            </label>
            <label>Question:
                <input type="text"/>

            </label>
            <label>Amount of answers:
                <input type="number"/>

            </label>
            <label>Correct answer:
                <input type="text"/>

            </label>
            <label>Incorrect answers:
                <input type="text"/>

            </label>
        </>
    );
}

export default CreateQuiz;