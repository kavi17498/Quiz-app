import React, { useRef, useState } from "react";
import "./quiz.css";
import { data } from "../../assets/data";

function Quiz() {

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const optionRefs = [option1, option2, option3, option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                optionRefs[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    const nextQuestion = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            resetOptions();
        } else {
            setResult(true);
        }
    };

    const resetOptions = () => {
        optionRefs.forEach(ref => {
            if (ref.current) {
                ref.current.classList.remove("correct", "wrong");
            }
        });
    };

    const next = () => {
        if (lock === true) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            optionRefs.forEach(option => {
                option.current.classList.remove("wrong", "correct");
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    };
    

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result ? null : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    
                    {question.image && (
             <div className="question-image-container">
            <img src={question.image} alt="Question" className="question-image" />
            </div>
            )}
                    <ul>
                        <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={nextQuestion}>Next</button>
                    <div className="index">{index + 1} of {data.length} Questions</div>
                </>
            )}
            {result ? <><h2>You Scored {score} out of {data.length} </h2>
            <button onClick={reset}>Reset</button></> : <></>};
            
        </div>
    );
}

export default Quiz;
