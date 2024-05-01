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
const difficultyLevel = document.getElementById('difficulty-level');


//View
function generateProblem(difficultyLevel){
    //Generate the math problem and render it onto the page
    question.textContent = `${Math.floor(Math.random()* difficultyLevel)}${operations[Math.floor(Math.random()*3)]}${Math.floor(Math.random()*difficultyLevel)}`
}

function startGame(){
    if(difficultyLevel.value > 0) {
        //Hide the starting interface and focus on the answering field
        startInterface.style.display = 'none';
        solutionGrabber.focus();
        //and then generate the problem onto the page
        generateProblem(difficultyLevel.value);
        //Timer functionality
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
    } if(difficultyLevel.value < 0) {
        alert('Only positive numbers');
    } if(difficultyLevel.value == 0) {
        alert('You have to enter a number');
    }
}

function pushAnswer(questionTitle){
    //The object of the answers for the stats board
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

    //If answer is right push the object right away
    if(eval(solutionGrabber.value) === eval(question.innerText)){
        pushAnswer(questionTitle);
        //If answer is wrong push the object and count that as a wrong answer
    } if(eval(solutionGrabber.value) !== eval(question.innerText)){
        pushAnswer(questionTitle);
        wrongAnswers++;
        //If questions are over get the analytics page
    } if(Number(questionsNumbers[1].textContent) === 20) {
        resultBoard.style.display = 'flex';
        timeStat.textContent = timer.textContent;
        wrongAnswersStat.textContent = wrongAnswers;
    }

    //Keep track of the number of questions
    questionsNumbers.forEach(questionsNumber=>{
        questionsNumber.textContent = Number(questionsNumber.textContent) + 1;
    });
    //Then generate another math problem
    generateProblem(difficultyLevel.value);
    solutionGrabber.value = '';
    solutionGrabber.focus();
}

function tryAgain(){
    //Reset all values for starting another round
    answers = [];
    wrongAnswers = 0;
    mins.textContent = '00';
    secs.textContent = '00';
    questionsNumbers.forEach(questionsNumber=>{
        questionsNumber.textContent = 1;
    });
    resultBoard.style.display = 'none';
}

function overviewQuestions(){
    answers.forEach(answer=>{
        //View the results to the player
        const questionContainer = document.createElement('div');
        const questionContainerHTML = `
        <h2 class="question-heading">${answer.numOfQuestion}</h2>
        <h3 class="question">${answer.question} = ${answer.answer}</h3>
        `;
        questionContainer.innerHTML = questionContainerHTML;
        questionsOverview.appendChild(questionContainer);

        //In case there is a wrong answer mark it with a red color and add to it the right answer
        if(eval(answer.question) !== Number(answer.answer)){
            const rightAnswer = document.createElement('h4');
            rightAnswer.textContent = `Right answer is ${eval(answer.question)}`;
            rightAnswer.classList.add('right-answer');
            questionContainer.appendChild(rightAnswer);
            questionContainer.classList.add('wrong-answer');
        } else {
            //And if the answer is right just mark it with a green color
            questionContainer.classList.add('right-answer');
        }

        questionsOverview.style.display = 'flex';
        resultBoard.style.display = 'none';
        
    });
}

function backToBoard() {
    questionsOverview.style.display = 'none';
    resultBoard.style.display = 'flex';
       
    questionsOverview.querySelectorAll('div').forEach(div=>{
        div.remove();
    });
}

//Controller
startBtn.addEventListener('pointerup', startGame);
submitBtn.addEventListener('pointerup', submitAnswer);
tryAgainBtn.addEventListener('pointerup', tryAgain);
viewResultsBtn.addEventListener('pointerup', overviewQuestions);
backBtn.addEventListener('pointerup', backToBoard);