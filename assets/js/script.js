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

var questionCount = 1;
var timeLeft = 59;

var currentAnswer = 0;
var currentScore = 0;
var highScore = 0;


function countdown(){
  var timerText = document.getElementById('timer');

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
        endQuiz();
      } else {
        timerText.textContent = 'Times up!';
        clearInterval(timeInterval);
        endQuiz();
      }
    }
  }, 1000);
}

function textAppendQuestionDiv(i){
  var body = document.querySelector("main");
  body.textContent = '';

  var questionDiv = document.createElement("div");
  var questionTitle = document.createElement("h2");
  var answerList = document.createElement("ol");
  
  questionTitle.textContent = questions[i].question;
  
  for (var x = 0; x < questions[i].answer.length; x++) {
    var answer = document.createElement("button");
    answer.textContent = questions[i].answer[x];
    answerList.appendChild(answer);
    answer.addEventListener("click", function(event) {
      if (timeLeft > 0 && questionCount < 4) {
        currentAnswer = event.target;
        console.log(currentAnswer);
        textAppendQuestionDiv(questionCount);
        if (currentAnswer === questions[questionCount].correctAnswer){
          currentScore++;
        }
        questionCount++;
      } else {
        console.log(currentAnswer);
        endQuiz();
      }
      
    });

  }

  body.appendChild(questionDiv);
  questionDiv.appendChild(questionTitle);
  questionDiv.appendChild(answerList);
}

function endQuiz(){
  timeLeft = 0;
  var body = document.querySelector("main");
  body.textContent = '';

  var timerText = document.getElementById('timer');
  timerText.textContent = 'Times up!';

  var endDiv = document.createElement("div");
  var endPageTitle = document.createElement('h1');
  var endPageScore = document.createElement('h2');
  var endPageInitials = document.createElement('input');
  var submitButton = document.createElement('button');

  submitButton.textContent = "Click to submit score";

  endPageTitle.textContent = "The quiz is over";
  endPageScore.textContent = ("Your Score was " + currentScore);

  // if (currentScore > highScore){
  //   highScore = currentScore;
  //   endPageTitle.textContent = "The quiz is over";
  //   endPageScore.textContent = ("You reached a new highscore of " + currentScore + "!");
  // } else if (currentScore = highScore){
  //   endPageTitle.textContent = "The quiz is over";
  //   endPageScore.textContent = ("You matched the highscore of " + currentScore + "!");
  // } else {
  //   endPageTitle.textContent = "The quiz is over";
  //   endPageScore.textContent = ("Your Score was " + currentScore);
  // }

  body.appendChild(endDiv);
  endDiv.appendChild(endPageTitle);
  endDiv.appendChild(endPageScore);
  endDiv.appendChild(endPageInitials);
  endDiv.appendChild(submitButton);
  
  endPageInitials.addEventListener('input', function () {
    endPageInitials.textContent = this.value;
  });

  submitButton.addEventListener("click", function() {
    highScoreCheck();
    highScores();

  });

}

function highScoreCheck(){
  
}

function startQuiz(){
  var timerText = document.getElementById('timer');
  timerText.textContent = 'Time: 1 Minute';
  timeLeft = 59;
  questionCount = 1;
  currentAnswer = 0;
  currentScore = 0;
  countdown(timeLeft);
  textAppendQuestionDiv(0);
}

function startPage(){
  var body = document.querySelector("main");
  body.textContent = '';

  var timerText = document.getElementById('timer');
  timerText.textContent = 'Time: 1 Minute';

  var startDiv = document.createElement("div");
  var startTitle = document.createElement('h1');
  var startMessage = document.createElement('h2');
  var startButton = document.createElement('button');

  startTitle.textContent = "Welcome to the Sports Quiz";
  startMessage.textContent = "Click below to start quiz";
  startButton.textContent = "Start";

  body.appendChild(startDiv);
  startDiv.appendChild(startTitle);
  startDiv.appendChild(startMessage);
  startDiv.appendChild(startButton);
  startButton.addEventListener("click", function() {
    startQuiz();
  });
}

function highScores(){
  var body = document.querySelector("main");
  body.textContent = '';

  var currentScore = endQuiz(i);

  console.log(currentScore);

  var highScoreDiv = document.createElement("div");
  var highScoreTitle = document.createElement('h1');
  var highScoreList = document.createElement('ol');
  var startButton = document.createElement('button');

  highScoreTitle.textContent = "Highest Scores";
  highScoreList.textContent = "Test";
  startButton.textContent = "Start Over";

  body.appendChild(highScoreDiv);
  highScoreDiv.appendChild(highScoreTitle);
  highScoreDiv.appendChild(highScoreList);
  highScoreDiv.appendChild(startButton);
  
  startButton.addEventListener("click", function() {
    startPage();
  });

}

startPage();