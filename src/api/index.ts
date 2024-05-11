import axios from 'axios'

const GetTenQuestions = async () => {

    let allData = await axios.get('https://jsonplaceholder.typicode.com/posts')
    if (allData.status !== 200) return Error('Error Occupied !')

    let shuffeledList = allData.data.sort(() => Math.random() - 0.5)
    let TenQuestions = shuffeledList.slice(0, 10)
    TenQuestions = TenQuestions.map((item) => item.body)
    TenQuestions = await PrepareTenQuestions(TenQuestions)
    return TenQuestions
}

const PrepareTenQuestions = async (questions) => {
    let quests = questions.map((item, index) => {
        var answers = item.split(' ').sort(() => Math.random() - 0.5).splice(0, 4) // Randomly select 4 words as answers
        return {
            id: index,
            question: item,
            answers: answers,
            correctAnswer: answers[Math.floor(Math.random() * answers.length)] // Random index found and select as correct answer
        }
    })
    return quests
}


export default GetTenQuestions;