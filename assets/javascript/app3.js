$(document).ready(function() {

  var triviaQuestions = [{
    question: "Kurt Russell was a Disney prodigy.  His first feature film was:",
    options: ["Herbie the Love Bug", "Bad News Bears", "The Computer Who Wore Tennis Shoes", "The Shaggy D.A."],
    answer: 2
  },{
    question: "John Carpenter and Kurt Russell partnered on many films.  Which film was NOT a collaboration between the two?",
    options: ["Big Trouble in Little China", "Escape from New York", "The Thing", "3000 Miles to Graceland"],
    answer: 3
  },{
    question: "In Big Trouble in Little China, Jack Burton meets a mystical Chinese overlord named LoPan.  LoPan's first name is:",
    options: ["David", "Egg", "Wang", "Eddie"],
    answer: 0
  },{
    question: "Snake Plissken was granted early admission from incarceration to save the President of the USA who was trapped in Manhattan with one small caveat",
    options: ["Snake has to kill the President", "Snake needs to  "],
    answer: 1
  },]
  //{
    // question: "Wyatt Earp was known for being a fair lawman, until that pesky business at the O.K. Corral. Wyatt's possee included all but:"
    // options: ["Johnny Ringo", "Doc Holliday", "Virgil Earp", "Mattie Blaylock"],
    // answer: 0
  // },{
    // question: "In the film 'Soldier', Kurt spoke as few as ____ words?",
    // options:  ["62", "104", "1012", "315"],
    // answer: 1
  //},

  var gifArray = []
  var currentQuestion;
  var correctAnswer;
  var incorrectAnswer
  var unanswered;
  var seconds;
  var time;
  var answered;
  var userSelect;
  var messages = {
    correct: "Congrats!",
    incorrect: "Sorry, incorrect.",
    endTime: "Times up!",
    finished: "Let's see how you did!",
  };

  $(".startButton").on("click", newGame);

  $('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
  });


  function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();

    $(this).hide();
    currentQuestion = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();


 }

 function newQuestion(){
  $("#message").empty();
  $("#correctAnswer").empty();
  $("gif").empty();
  answered = true;

  $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
  $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
  for(var i = 0; i < 4; i++){
  var choices = $('<div>');
  choices.text(triviaQuestions[currentQuestion].options[i]);
  choices.attr({'data-index': i });
  choices.addClass('thisChoice');
  $('.answerList').append(choices);
  }
  countdown();
//clicking an answer will pause the time and setup answerPage
  $('.thisChoice').on('click',function(){
  userSelect = $(this).data('index');
  clearInterval(time);
  answerPage();
  });
 }

 function countdown(){
   seconds = 15;
   $("timeLeft").html("<h3>" + "Time Remaining: " + seconds + "</h3>");
   answered = true;
   time = setInterval(showCountdown, 1000);
 }

 function showCountdown(){
   seconds--;
   $("#timeLeft").html("<h3>" + "Time Remaining: " + seconds + "</h3>");
   if(seconds < 1){
     clearInterval(time);
     answered = false;
     answerPage();
   }
 }



  function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].options[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
    //checks to see correct, incorrect, or unanswered
    if((userSelect == rightAnswerIndex) && (answered == true)){
      correctAnswer++;
      $('#message').html(messages.correct);
    } else if((userSelect != rightAnswerIndex) && (answered == true)){
      incorrectAnswer++;
      $('#message').html(messages.incorrect);
      $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else{
      unanswered++;
      $('#message').html(messages.endTime);
      $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
      answered = true;
    }

    if(currentQuestion == (triviaQuestions.length-1)){
      setTimeout(scoreboard, 5000)
    } else{
      currentQuestion++;
      setTimeout(newQuestion, 5000);
    }
  }
  function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass("reset btn btn-dark");
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');

  }




})
