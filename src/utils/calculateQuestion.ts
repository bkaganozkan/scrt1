export const calculateQuestionCorrectness = (questions) => {

    let correctAnswer = 0
    for(let i = 0; i< questions.length;i++){
        if(questions[i].correctAnswer === questions[i].userAnswer){
            correctAnswer++
        }
    }

    return correctAnswer

}