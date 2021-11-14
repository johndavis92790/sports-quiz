var body = document.main;

var timerText = document.getElementById('timer');

var startPageDiv = document.createElement("div");
var startButton = document.createElement('button');

var endPage = document.createElement("div");
var highScores = document.createElement("div");

var questionDiv = document.getElementById("question-div");
var questionTitle = document.getElementById("question-title");
var answerList = document.getElementById("answer-list");
var answer1 = document.getElementById("answer-button-1");
var answer2 = document.getElementById("answer-button-2");
var answer3 = document.getElementById("answer-button-3");
var answer4 = document.getElementById("answer-button-4");

var questionCount = 0;
var timeLeft = 10;

var currentAnswer = 0;
var currentScore = 0;
var highScore = 0;


var questions = [{
  question: 'Test question#1',
  answer: ['Q1Answer#1', 'Q1Answer#2', 'Q1Answer#3', 'Q1Answer#4'],
  correctAnswer: 0
},
{
  question: 'Test question#2',
  answer: ['Q2Answer#1', 'Q2Answer#2', 'Q2Answer#3', 'Q2Answer#4'],
  correctAnswer: 1
},
{
  question: 'Test question#3',
  answer: ['Q3Answer#1', 'Q3Answer#2', 'Q3Answer#3', 'Q3Answer#4'],
  correctAnswer: 2
},
{
  question: 'Test question#4',
  answer: ['Q4Answer#1', 'Q4Answer#2', 'Q4Answer#3', 'Q4Answer#4'],
  correctAnswer: 3
}];

function textAppendQuestionDiv(i){
  questionTitle.textContent = (questions[i].question);
  answer1.textContent = (questions[i].answer[0]);
  answer2.textContent = (questions[i].answer[1]);
  answer3.textContent = (questions[i].answer[2]);
  answer4.textContent = (questions[i].answer[3]);
}

function countdown(){
  // Use the setInterval method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerText.textContent = 'Time: ' + timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerText.textContent = 'Time: ' + timeLeft + ' second remaining';
      timeLeft--;
    } else {
      if (questionCount === 4){
        timerText.textContent = 'Times up!';
        clearInterval(timeInterval);
      } else {
        timerText.textContent = 'Times up!';
        clearInterval(timeInterval);
        endQuiz();
      }
    }
  }, 1000);
}

function highScores(){
}

function startQuiz(){
  countdown();
  
  answer1.addEventListener("click", function() {
    if (timeLeft > 0 && questionCount < 4) {
        textAppendQuestionDiv(questionCount);
        currentAnswer = 0;
        if (currentAnswer === questions[questionCount].correctAnswer){
          currentScore++;
        }
        questionCount++;
    } else {
      endQuiz();
    }
  });
  answer2.addEventListener("click", function() {
    if (timeLeft > 0 && questionCount < 4) {
        textAppendQuestionDiv(questionCount);
        currentAnswer = 1;
        if (currentAnswer === questions[questionCount].correctAnswer){
          currentScore++;
        }
        questionCount++;
    }else {
      endQuiz();
    }
  });
  answer3.addEventListener("click", function() {
    if (timeLeft > 0 && questionCount < 4) {
        textAppendQuestionDiv(questionCount);
        currentAnswer = 2;
        if (currentAnswer === questions[questionCount].correctAnswer){
          currentScore++;
        }
        questionCount++;
    }else {
      endQuiz();
    }
  });
  answer4.addEventListener("click", function() {
    if (timeLeft > 0 && questionCount < 4) {
        textAppendQuestionDiv(questionCount);
        currentAnswer = 3;
        if (currentAnswer === questions[questionCount].correctAnswer){
          currentScore++;
        }
        questionCount++;
    }else {
      endQuiz();
    }
  });
}

function startPage(){
  var startPageTitle = document.createElement('h1');
  startButton = document.createElement('button');
  startPageTitle.textContent = "Initial Test Question";
  startButton.textContent = "Start";
  startPageDiv.appendChild(startPageTitle);
  startPageDiv.appendChild(startButton);
  questionDiv.replaceWith(startPageDiv);

  startButton.addEventListener("click", startQuiz());
}

function endQuiz(){
  var endPageTitle = document.createElement('h1');
  var endPageScore = document.createElement('h2');
  if (currentScore >= highScore){
    highScore = currentScore;
    endPageTitle.textContent = "The quiz is over";
    endPageTitle.textContent = ("You reached a new highscore of " + currentScore + "!");
  } else {
    endPageTitle.textContent = "The quiz is over";
    endPageScore.textContent = ("Your Score was " + currentScore);
  }
  endPage.appendChild(endPageTitle);
  endPage.appendChild(endPageScore);
  questionDiv.replaceWith(endPage);

}

startPage(); 