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
let answers = [];
let wrongAnswers = 0;
const resultBoard = document.querySelector('.result');
const tryAgainBtn = document.querySelector('.try-again');
const viewResultsBtn = document.querySelector('.view-results');
const questionsOverview = document.querySelector('.questions-overview');
const backBtn = document.querySelector('.back-btn');


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
    answers = [];
    wrongAnswers = 0;
    mins.textContent = '00';
    secs.textContent = '00';
    questionsNumbers.forEach(questionsNumber=>{
        questionsNumber.textContent = 1;
    });
    resultBoard.style.display = 'none';
    
    questionsOverview.querySelectorAll('div').forEach(div=>{
        div.remove();
    });
}

function overviewQuestions(){
    answers.forEach(answer=>{
        const questionContainer = document.createElement('div');
        const questionContainerHTML = `
        <h2 class="question-heading">${answer.numOfQuestion}</h2>
        <h3 class="question">${answer.question} = ${answer.answer}</h3>
        `;
        questionContainer.innerHTML = questionContainerHTML;
        questionsOverview.appendChild(questionContainer);

        if(eval(answer.question) !== Number(answer.answer)){
            const rightAnswer = document.createElement('h4');
            rightAnswer.textContent = `Right answer is ${eval(answer.question)}`;
            rightAnswer.classList.add('right-answer');
            questionContainer.appendChild(rightAnswer);
            questionContainer.classList.add('wrong-answer');
        } else {
            questionContainer.classList.add('right-answer');
        }

        questionsOverview.style.display = 'flex';
        resultBoard.style.display = 'none';
        
    });
}

function backToBoard() {
    questionsOverview.style.display = 'none';
    resultBoard.style.display = 'flex';
}

//Controller
startBtn.addEventListener('pointerup', startGame);
submitBtn.addEventListener('pointerup', submitAnswer);
tryAgainBtn.addEventListener('pointerup', tryAgain);
viewResultsBtn.addEventListener('pointerup', overviewQuestions);
backBtn.addEventListener('pointerup', backToBoard);