//Model
const operations = ['*','+','-']
const startBtn = document.querySelector('.start-btn');
const startInterface = document.querySelector('.start-game');
const solutionGrabber = document.getElementById('solution-grabber');
let mins = document.querySelector('.mins');
let secs = document.querySelector('.secs');
const submitBtn = document.querySelector('.submit-btn');
const questionsNumbers = document.querySelectorAll('.questions-number');
const question = document.querySelector('.question');
const answers = [];
let wrongAnswers = 0;
const resultBoard = document.querySelector('.result');
const tryAgainBtn = document.querySelector('.try-again');


//View
function generateProblem(){
    question.textContent = `${Math.floor(Math.random()*20)}${operations[Math.floor(Math.random()*3)]}${Math.floor(Math.random()*20)}`
}

function startGame(){
    startInterface.style.display = 'none';
    solutionGrabber.focus();

    generateProblem();

    setInterval(()=>{
        secs.innerHTML = Number(secs.innerHTML)+1;
        if(Number(secs.innerHTML) < 10){
            secs.innerHTML = '0'+secs.innerHTML;
        } if(Number(secs.innerHTML) >= 59){
            secs.innerHTML = 0;
            mins.innerHTML = Number(mins.innerHTML)+1;
            if(Number(mins.innerHTML) < 10){
                mins.innerHTML = '0'+ mins.innerHTML;
            } 
        }
    },1000);
}

function pushAnswer(questionTitle){
    answers.push({
        numOfQuestion: questionTitle.textContent,
        question: question.textContent,
        answer: solutionGrabber.value
    });
}

function submitAnswer(){
    const questionTitle = document.querySelector('.question-heading');
    const timeStat = document.querySelector('.time');
    const wrongAnswersStat = document.querySelector('.wrong-answers');
    const timer = document.querySelector('.timer')

    if(eval(solutionGrabber.value) === eval(question.innerText)){
        pushAnswer(questionTitle);
    } if(eval(solutionGrabber.value) !== eval(question.innerText)){
        pushAnswer(questionTitle);
        wrongAnswers++;
    } if(Number(questionsNumbers[1].textContent) === 20) {
        resultBoard.style.display = 'flex';
        timeStat.textContent = timer.textContent;
        wrongAnswersStat.textContent = wrongAnswers;
    }

    questionsNumbers.forEach(questionsNumber=>{
        questionsNumber.textContent = Number(questionsNumber.textContent) + 1;
    });
    generateProblem();
    solutionGrabber.value = '';
    solutionGrabber.focus();
}

function tryAgain(){
    wrongAnswers = 0;
    mins.textContent = '00';
    secs.textContent = '00';
    questionsNumbers.forEach(questionsNumber=>{
        questionsNumber.textContent = 1;
    });
    resultBoard.style.display = 'none';
}

//Controller
startBtn.addEventListener('pointerup', startGame);
submitBtn.addEventListener('pointerup', submitAnswer);
tryAgainBtn.addEventListener('pointerup', tryAgain);