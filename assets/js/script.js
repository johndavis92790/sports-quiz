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
  answer: ['$1.5 million', '$6.1 million', '$47.8 million', '$120.2 million'],
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

//global variables
var currentIndex = 0;
var timeLeft;
var currentAnswer;
var currentScore;
var highScore;
var endPageInitials;
var viewHighScores = document.querySelector("#high-scores");

//you can click on the view high scores button at any moment before or after the quiz
viewHighScores.addEventListener("click", function() {
  highScores();
});

//first function that runs when you open the page
function startPage(){
  //creates div to display the start page
  var body = document.querySelector("main");
  body.textContent = '';
  var timerText = document.getElementById('timer');
  timerText.textContent = 'Time: 1 Minute';
  timerText.setAttribute("style", "margin:20px; text-align:right; font-family: Arial, Helvetica, sans-serif");
  var startDiv = document.createElement("div");
  var startTitle = document.createElement('h1');
  var startMessage = document.createElement('h2');
  var startButton = document.createElement('button');
  //sets the text
  startTitle.textContent = "Welcome to the Utah Sports Quiz";
  startMessage.textContent = "Click below to start quiz";
  startButton.textContent = "Start";
  startDiv.setAttribute("style", "margin:auto; width:80%; text-align:center; font-family: Arial, Helvetica, sans-serif");
  startButton.setAttribute("style",
  "border-radius: 4px; background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;"
  );
  //appends it to page to display
  body.appendChild(startDiv);
  startDiv.appendChild(startTitle);
  startDiv.appendChild(startMessage);
  startDiv.appendChild(startButton);
  // user can click start button to start quiz
  startButton.addEventListener("click", function() {
    startQuiz();
  });
}

//countdown function to start running once the quiz starts, the user has 60 secs to finish
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
      //if you finish the quiz early, it clears the interval and ends the quiz
    } else {
      if (currentIndex === questions.length){
        timerText.textContent = 'Times up!';
        clearInterval(timeInterval);
        endQuiz();
        //once time is up, it clears the interval and ends the quiz
      } else {
        timerText.textContent = 'Times up!';
        clearInterval(timeInterval);
        endQuiz();
      }
    }
  }, 1000);
}

//function to start the quiz, resets any needed variables, including timer
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

// function to create the quesitons and display them one at a time, including the answer buttons
function questionDiv(){
  var body = document.querySelector("main");
  body.textContent = '';
  var currentQuestion = questions[currentIndex];
  var questionDiv = document.createElement("div");
  var questionTitle = document.createElement("h2");
  var answerList = document.createElement("ol");
  //for loop to create the 4 buttons for each question being displayed
    for (var x = 0; x < currentQuestion.answer.length; x++){
      var answer = document.createElement("button");
      answer.textContent = currentQuestion.answer[x];
      answer.setAttribute("value", currentQuestion.answer[x]);
      answer.setAttribute("style",
  "border-radius: 4px; margin: 10px; background-color: #f44336; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; font-family: Arial, Helvetica, sans-serif"
  );
      //appends everything to the page and waits for a user click of an answer
      answer.onclick = buttonClick;
      answerList.appendChild(answer);
    }
  //appends everything to the page
  questionTitle.textContent = currentQuestion.question;
  questionDiv.setAttribute("style", "margin:auto; width:80%; text-align:center; font-family: Arial, Helvetica, sans-serif");
  questionDiv.appendChild(questionTitle);
  questionDiv.appendChild(answerList);
  body.appendChild(questionDiv);
}

//function with logic behind the answer chosen and keep score
function buttonClick(){
  // if the correct answer is chosen, it adds 1 to the current score
  if (this.value === questions[currentIndex].correctAnswer ){
    currentScore++;
    //if its an incorrect answer, then it subtracts 10 secs from the current time left
  } else {
    timeLeft = timeLeft - 10;
  }
  //if either the time is up or the last question has been chosen, then is ends the quiz
  if (timeLeft <= 0 || currentIndex === questions.length - 1) {
    endQuiz();
    // if there is still time left or its not the last question, then it goes to the next question
  } else {
    currentIndex++;
    questionDiv()
  }
}

//function to end the quiz
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
  // Resets the divs on the page to display your score
  endPageTitle.textContent = "The quiz is over";
  endPageScore.textContent = ("Your Score was " + currentScore);
  submitButton.textContent = "Click to submit score";
  submitButton.setAttribute("style",
  "font-size: 16px; margin: 10px; border-radius: 4px; background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; font-family: Arial, Helvetica, sans-serif"
  );
  endPageInitialsInput.setAttribute("style","font-size: 16px; text-align: center; padding: 13px 25px; margin: 10px; border-radius: 4px; font-family: Arial, Helvetica, sans-serif");
  //appends all this information to the page
  endDiv.setAttribute("style", "margin:auto; width:80%; text-align:center; font-family: Arial, Helvetica, sans-serif");
  endDiv.appendChild(endPageTitle);
  endDiv.appendChild(endPageScore);
  endDiv.appendChild(endPageInitialsInput);
  endDiv.appendChild(submitButton);
  body.appendChild(endDiv);
//grabs the string input from the input field to get the initials of the user
  endPageInitialsInput.addEventListener('input', function () {
    endPageInitialsInput.textContent = this.value;
  });
  //when submit is clicked, it runs the high score function 
  submitButton.addEventListener("click", function() {
    endPageInitials = endPageInitialsInput.textContent;
    highScores();
  });
}

//funtion to check highscore and display the highest score
function highScores(){
  // Recreates the divs to display the highest score of all time
  var body = document.querySelector("main");
  body.textContent = '';
  var highScoreDiv = document.createElement("div");
  var highScoreTitle = document.createElement('h1');
  var highScoreList = document.createElement('ol');
  var startButton = document.createElement('button');
  // checks local storage high score
  highScore = localStorage.getItem("highScoreStorage");
  //if the current score is higher than the all time high score, then it resets the local 
  //    storage of both the high score and the initials from the previous page
  if (currentScore > highScore){
    highScore = currentScore;
    localStorage.setItem("highScoreStorage", highScore);
    localStorage.setItem("initialsStorage", endPageInitials);
  } 

  highScoreTitle.textContent = "Highest Score";
  highScoreList.textContent = (localStorage.getItem("initialsStorage") + " - " + localStorage.getItem("highScoreStorage"))
  startButton.textContent = "Start Over";
  //appends all this information to the page
  highScoreDiv.setAttribute("style", "margin:auto; width:50%; text-align:center; font-family: Arial, Helvetica, sans-serif");
  startButton.setAttribute("style",
  "border-radius: 4px; background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; font-family: Arial, Helvetica, sans-serif"
  );
  body.appendChild(highScoreDiv);
  highScoreDiv.appendChild(highScoreTitle);
  highScoreDiv.appendChild(highScoreList);
  highScoreDiv.appendChild(startButton);
  // button to start over and go back to the start page
  startButton.addEventListener("click", function() {
    startPage();
  });
}
// initial function that runs
startPage();