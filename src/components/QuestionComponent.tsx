import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/counterSlice.ts";
import { useEffectOnce } from "../utils/useEffectOnce.ts";
const QuestionComponent = ({ question }) => {

    const questionIndex = useSelector((state: any) => state.quests.currentQuestionIndex);
    const dispatch = useDispatch();

    const [selectedAnswer, setSelectedAnswer] = useState<any>('')
    const [timer, setTimer] = useState<number>(30);
    const [intervalID, setIntervalID] = useState<any>();
    const [nextButtonActive, setNextButtonActive] = useState<boolean>(false)
    const [percantage, setPercantage] = useState<number>(0)


    // I don't want to out of the context of Strict Mode.
    // So I use custom function to call interval for once.
    useEffectOnce(() => {
        setIntervalID(e => e = setInterval(decraseTime, 1000))
    })

    useEffect(() => {

        if (timer < 0) {
            handleAnswer()
        }
        else if (timer < 21) {
            setNextButtonActive(true)
        }
        setPercantage(timer / 30 * 100)

        return () => { }
    }, [timer]) // Active this effect every time timer is changed



    const handleAnswer = () => {
        dispatch(increment(selectedAnswer))
        clearInterval(intervalID)
    }

    const decraseTime = () => {
        setTimer(prevTimer => prevTimer - 1)
    }



    return (
        <div className="flex flex-col gap-6 justify-start font-medium text-lg text-left border-2 border-purple-400 p-16 rounded-xl shadow-xl shadow-purple-300">
            <div className="flex justify-between">
                <h6 className=" font-extrabold text-purple-400 text-2xl"> Question {questionIndex + 1}</h6>
                Timer :  {timer}
            </div>
            <div className="bg-purple-400 h-2 transition-width duration-700 transat" style={{ width: `${percantage}%` }}></div>
            <p >
                {question.question}
            </p>
            <div className="grid gap-3 self-start">
                {
                    question.answers.map((item, index) =>
                        <label key={index} className="text-left">
                            <input type="radio" value={item} checked={item === selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)} /> {item}
                        </label>
                    )}
            </div>
            <button disabled={!nextButtonActive} className={`${!nextButtonActive ? 'text-gray-500 border-gray-400' : 'text-purple-700 border-purple-700'} self-end border-2  rounded-md px-8`} onClick={() => handleAnswer()}>Next</button>
        </div>
    )
}

export default QuestionComponent