var questions = [{
  question: 'Who had the top individual scoring game by a Jazz player?',
  answer: ['Karl Malone', 'Pete Marovich', 'Donovan Mitchell', 'John Stockton'],
  correctAnswer: 'Pete Marovich'
},
{
  question: 'Who is the Jazz all-time leader in 3-point attempts and 3-pointers made?',
  answer: ['John Stockton', 'Jeff Hornaceck', 'Kyle Korver', 'Joe Ingles'],
  correctAnswer: 'John Stockton'
},
{
  question: 'Which former Utah football player was nominated for the Heisman Trophy, and drafted number 1 in the 2005 NFL Draft?',
  answer: ['Quinton Ganther', 'Eric Weddle', 'Alex Smith', 'Paris Warren'],
  correctAnswer: 'Alex Smith'
},
{
  question: 'Urban Meyer left the head coach position at the Utah Utes to become head coach of this team.',
  answer: ['University of Miami', 'Bowling Green', 'Florida St.', 'University of Florida'],
  correctAnswer: 'University of Florida'
},
{
  question: 'What year did football become a program for the University of Utah?',
  answer: ['1905', '1892', '1911', '1900'],
  correctAnswer: '1892'
},
{
  question: 'What was the original price tag for the Jazz as an expansion franchise in 1974?',
  answer: ['$1.5 million', '$6.1 million', '47.8 million', '$120.2 million'],
  correctAnswer: '$6.1 million'
},
{
  question: 'Which current or former Jazz player’s father played on the 1984 NCAA Championship team with Michael Jordan at North Carolina?',
  answer: ['Rudy Gobert', 'Dante Exum', 'Jordan Clarkson', 'Trey Lyles'],
  correctAnswer: 'Dante Exum'
},
{
  question: 'Which city were the Jazz located in before moving to Utah?',
  answer: ['New Orleans', 'Atlanta', 'Austin', 'Memphis'],
  correctAnswer: 'New Orleans'
},
{
  question: 'Who was the head football coach for Utah from 1990-1998?',
  answer: ['Jack Cutrice', 'Ron McBride', 'Urban Meyer', 'Ray Nagel'],
  correctAnswer: 'Ron McBride'
},
{
  question: 'When Utah first broke the BCS, they played against this team in this BCS Bowl Game.',
  answer: ['Alabama/Sugar Bowl', 'Georgia Tech/Emerald Bowl', 'Tulsa/Armed Forces Bowl', 'Pittsburgh/Fiesta Bowl'],
  correctAnswer: 'Pittsburgh/Fiesta Bowl'
}];

var currentIndex = 0;
var timeLeft;
var currentAnswer;
var currentScore;
var highScore;
var endPageInitials;
var viewHighScores = document.querySelector("#high-scores");

viewHighScores.addEventListener("click", function() {
  highScores();
});

function startPage(){
  var body = document.querySelector("main");
  body.textContent = '';
  var timerText = document.getElementById('timer');
  timerText.textContent = 'Time: 1 Minute';
  var startDiv = document.createElement("div");
  var startTitle = document.createElement('h1');
  var startMessage = document.createElement('h2');
  var startButton = document.createElement('button');
  startTitle.textContent = "Welcome to the Utah Sports Quiz";
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
      if (currentIndex === questions.length){
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

function startQuiz(){
  var timerText = document.getElementById('timer');
  timerText.textContent = 'Time: 1 Minute';
  timeLeft = 59;
  currentAnswer = 0;
  currentIndex = 0;
  currentScore = 0;
  countdown(timeLeft);
  questionDiv();
}

function questionDiv(){
  var body = document.querySelector("main");
  body.textContent = '';
  var currentQuestion = questions[currentIndex];
  var questionDiv = document.createElement("div");
  var questionTitle = document.createElement("h2");
  var answerList = document.createElement("ol");
    for (var x = 0; x < currentQuestion.answer.length; x++){
      var answer = document.createElement("button");
      answer.textContent = currentQuestion.answer[x];
      answer.setAttribute("value", currentQuestion.answer[x]);
      answer.onclick = buttonClick;
      answerList.appendChild(answer);
    }
    questionTitle.textContent = currentQuestion.question;
    questionDiv.appendChild(questionTitle);
    questionDiv.appendChild(answerList);
    body.appendChild(questionDiv);
}

function buttonClick(){
  if (this.value === questions[currentIndex].correctAnswer ){
    currentScore++;
  } else {
    timeLeft - 10;
  }
  if (timeLeft <= 0 || currentIndex === questions.length - 1) {
    endQuiz();
  } 
  else {
    currentIndex++;
    questionDiv()
  }
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
  var endPageInitialsInput = document.createElement('input');
  var submitButton = document.createElement('button');
  endPageTitle.textContent = "The quiz is over";
  endPageScore.textContent = ("Your Score was " + currentScore);
  submitButton.textContent = "Click to submit score";
  endDiv.appendChild(endPageTitle);
  endDiv.appendChild(endPageScore);
  endDiv.appendChild(endPageInitialsInput);
  endDiv.appendChild(submitButton);
  body.appendChild(endDiv);

  endPageInitialsInput.addEventListener('input', function () {
    endPageInitialsInput.textContent = this.value;
  });
  submitButton.addEventListener("click", function() {
    endPageInitials = endPageInitialsInput.textContent;
    highScores();
  });
}

function highScores(){
  var body = document.querySelector("main");
  body.textContent = '';
  var highScoreDiv = document.createElement("div");
  var highScoreTitle = document.createElement('h1');
  var highScoreList = document.createElement('ol');
  var startButton = document.createElement('button');
  highScore = localStorage.getItem("highScoreStorage");
  if (currentScore > highScore){
    highScore = currentScore;
    localStorage.setItem("highScoreStorage", highScore);
    localStorage.setItem("initialsStorage", endPageInitials);
  } 
  highScoreTitle.textContent = "Highest Score";
  highScoreList.textContent = (localStorage.getItem("initialsStorage") + " - " + localStorage.getItem("highScoreStorage"))
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