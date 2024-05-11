import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../store/counterSlice.ts";
import GetTenQuestions from "../api/index.ts";
import QuestionComponent from "./QuestionComponent.tsx";
import FinalPage from "./FinalPage.tsx";

const BeginningPage = () => {


    const questions = useSelector((state: any) => state.quests.questions);
    const questionsFetch = useSelector((state: any) => state.quests.fetchQuestions);
    const questionIndex = useSelector((state: any) => state.quests.currentQuestionIndex);
    const dispatch = useDispatch();

    const [startTest, setStartTest] = useState(false)

    useEffect(() => {

        async function Initilaze() {
            var answers = await GetTenQuestions();
            dispatch(setQuestions(answers))
        }

        Initilaze();


        return () => { }
    }, [])

    return (
        <div className="h-dvh flex flex-col justify-center items-center">
            {
                !startTest ?
                    <div className="flex flex-col gap-6 items-center">
                        <h3 className="font-bold text-2xl">Here is your assigment, click to button to start!</h3>
                        <h2 className="font-semibold text-xl text-zinc-500">Each question has 30 seconds</h2>
                        <button className="border-2 border-purple-500 rounded-lg px-6 py-3  text-purple-500 text-lg font-semibold" onClick={() => setStartTest(true)}>Start the Test</button>
                    </div>

                    : null
            }
            {questionsFetch && startTest && questions[questionIndex] ?
                <div className="flex justify-start px-72 py-36">

                    <QuestionComponent key={questionIndex} question={questions[questionIndex]} />
                </div>
                : null
            }
            {
                questionIndex >= 10 ?
                    <FinalPage /> : null
            }
        </div>
    )
}


export default BeginningPage