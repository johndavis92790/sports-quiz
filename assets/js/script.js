var body = document.body;

var timerText = document.getElementById('timer');

var startPage = document.createElement("div");
var endPage = document.createElement("div");
var highScores = document.createElement("div");

var questionDiv = document.createElement("div");
var questionTitle = document.createElement("h2");
var answerList = document.createElement("ol");
var answer1 = document.createElement("li");
var answer2 = document.createElement("li");
var answer3 = document.createElement("li");
var answer4 = document.createElement("li");

// var questionNumber = 0;


var questions = [{
  question: 'Test question#1',
  answer: ['Q1Answer#1', 'Q1Answer#2', 'Q1Answer#3', 'Q1Answer#4']
},
{
  question: 'Test question#2',
  answer: ['Q2Answer#1', 'Q2Answer#2', 'Q2Answer#3', 'Q2Answer#4']
},
{
  question: 'Test question#3',
  answer: ['Q3Answer#1', 'Q3Answer#2', 'Q3Answer#3', 'Q3Answer#4']
},
{
  question: 'Test question#4',
  answer: ['Q4Answer#1', 'Q4Answer#2', 'Q4Answer#3', 'Q4Answer#4']
}];

function startOver() {
  startPage.appendChild(body);
}

function textAppendQuestionDiv(i){

  var questionDiv = document.createElement("div");
  var questionTitle = document.createElement("h2");
  var answerList = document.createElement("ol");
  var answer1 = document.createElement("li");
  var answer2 = document.createElement("li");
  var answer3 = document.createElement("li");
  var answer4 = document.createElement("li");

  questionTitle.textContent = (questions[i].question);
  answer1.textContent = (questions[i].answer[0]);
  answer2.textContent = (questions[i].answer[1]);
  answer3.textContent = (questions[i].answer[2]);
  answer4.textContent = (questions[i].answer[3]);

  body.appendChild(questionDiv);
  questionDiv.appendChild(questionTitle);
  questionDiv.appendChild(answerList);
  answerList.appendChild(answer1);
  answerList.appendChild(answer2);
  answerList.appendChild(answer3);
  answerList.appendChild(answer4);
  console.log(questionDiv);

}

function countdown(){
  var timeLeft = 10;

  // Use the setInterval method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerText.textContent = 'Time: ' + timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerText.textContent = 'Time: ' + timeLeft + ' second remaining';
      timeLeft--;
    } else {
      timerText.textContent = 'Times up!';
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz(){

}

function highScores(){


}


function startQuiz(){
  countdown();

  for (i = 0; i < questions.length; i++) {
    // var questionNumber = i;
    console.log(i);
    textAppendQuestionDiv(i);
    questionDiv.remove();
  }
}

startQuiz();

// var questionNumber = 1; 

// textAppendQuestionDiv(questionNumber - 1);


