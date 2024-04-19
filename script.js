
const quizQuestions = window.questions;

// console.log(questions); 

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const quitButton = document.getElementById("quit-btn");

let currentQuestionIndex = 0; 
let score = 0; 
let answeredQuestions = 0;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        // Handle up and down arrow keys for navigating answers
        const buttons = answerButton.querySelectorAll("button");
        let focusedButton = document.activeElement;
        let index = Array.from(buttons).indexOf(focusedButton);

        if (event.key === "ArrowUp") {
            index = index > 0 ? index - 1 : buttons.length - 1;
        } else if (event.key === "ArrowDown") {
            index = index < buttons.length - 1 ? index + 1 : 0;
        }

        buttons[index].focus();
    } else if (event.key === "Enter") {
        // Handle Enter key for selecting answer, next, or quit
        const focusedButton = document.activeElement;
        if (focusedButton) {
            if (focusedButton.classList.contains("btn")) {
                focusedButton.click(); // Click the focused answer button
            } else if (focusedButton === nextButton) {
                handleNextbutton(); // Trigger next button action
            } else if (focusedButton === quitButton) {
                quitQuiz(); // Trigger quit button action
            }
        }
    }
});




function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function startQuiz(){
    currentQuestionIndex = 0; 
    score = 0;
    answeredQuestions = 0;
    shuffleQuestions(questions); 
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild)
    answerButton.removeChild(answerButton.firstChild);
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }  
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
    quitButton.style.display="block";
    answeredQuestions++;
}

function showScore(){
    resetState();
    const questionCount = questions.length;
    const plural = answeredQuestions !== 1 ? 's' : ''; // Check if it's plural
    const scoreMessage = `You scored ${score} out of ${questionCount} question${plural} answered!`;
    questionElement.innerHTML = scoreMessage;
    // questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block";
}
 
function  handleNextbutton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    } else{
        startQuiz();
    }
} )




function quitQuiz(){
    resetState();
    const questionCount = questions.length;
    const plural = answeredQuestions !== 1 ? 's' : ''; // Check if it's plural
    const scoreMessage = `You scored ${score} out of ${answeredQuestions} question${plural} answered!`;
    questionElement.innerHTML = scoreMessage;
    // questionElement.innerHTML = `You answered ${answeredQuestions} questions! You Scored ${score}`;
    questionElement.classList.add("quitScore")
    if(currentQuestionIndex = questions.length){
        nextButton.innerHTML = "Play Again";
        nextButton.style.display="block";
    }
}


quitButton.addEventListener("click", ()=>{
    quitQuiz();
    if(currentQuestionIndex = questions.length){
        quitButton.style.display="none";
    }
    
} )


function countAnsweredQuestions() {
    return answeredQuestions;
}


startQuiz();

