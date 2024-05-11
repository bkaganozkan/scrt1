import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateQuestionCorrectness } from "../utils/calculateQuestion.ts";


const FinalPage = () => {

    const questions = useSelector((state: any) => state.quests.questions);

    const [correctAnswers, setCorrectAnswers] = useState(0)

    useEffect(() => {
        setCorrectAnswers(e => e = calculateQuestionCorrectness(questions))
    }, [])

    const handleFinishExam = () => {

        alert('Thank you for complete the test!')
        window.location.href = "https://baykartech.com/tr/"
    }

    return (
        <div className="h-dvh flex items-center ">
            <div className="flex flex-col gap-8 border-4 border-purple-400 rounded-lg px-24 py-8 shadow-xl shadow-purple-400">
                <table >
                    <thead className="grid grid-cols-4 gap-2 border-b font-bold text-xl py-2">
                        <th className="border-r px-4">Questions</th>
                        <th className="border-r px-4"> Correct Answer </th>
                        <th className="border-r px-4" >Your Answer</th>
                        <th className="px-3"> Is it Correct ? </th>
                    </thead>
                    <tbody className="font-medium text-lg" >
                        {
                            questions.map((question) =>

                                <tr className="grid grid-cols-4 gap-2 border-b">
                                    <td className="border-x  py-3">Question {question.id + 1}</td>
                                    <td className="border-r  py-3">{question.correctAnswer}</td>
                                    <td className="border-r  py-3">{question.userAnswer}</td>
                                    <td className={`${question.correctAnswer === question.userAnswer ? 'text-green-500' : 'text-red-500'} font-bold text-xl   border-r  py-3`}>{
                                        question.correctAnswer === question.userAnswer ? '+' : '-'
                                    }</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">
                        Results: {correctAnswers} / {questions.length}
                    </h2>
                    <button onClick={() => handleFinishExam()} className="self-end border-2 border-purple-400 text-purple-500 text-lg font-semibold rounded-lg px-6 py-1">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default FinalPage