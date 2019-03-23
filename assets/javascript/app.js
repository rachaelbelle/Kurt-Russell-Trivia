$(document).ready(function() {

  var triviaQuestions = [{
    question: "Kurt Russell started his career with  Disney.  His first feature film was:",
    options: ["Herbie the Love Bug", "Bad News Bears", "The Computer Who Wore Tennis Shoes", "The Shaggy D.A."],
    answer: 2
   },{
    question: "John Carpenter and Kurt Russell partnered on many films.  Which was NOT a collaboration between the two?",
    options: ["Big Trouble in Little China", "Escape from New York", "The Thing", "3000 Miles to Graceland"],
    answer: 3
   },{
     question: "In Big Trouble in Little China, Jack Burton meets a mystical Chinese overlord named LoPan.  LoPan's first name is:",
     options: ["David", "Egg", "Wang", "Eddie"],
     answer: 0
   },{
     question: "Snake Plissken is a former Special Forces operator/war hero in WWIII turned criminal. He is granted early release from incarceration to: ",
     options: ['Kill the President', 'Rescue the President from a hostage situation', 'To eliminate the crime in NY', 'Find his kidnapped daughter'],
     answer: 1
    },{
     question: "Wyatt Earp was known for being a fair lawman, until that pesky business at the O.K. Corral. Wyatt's possee included all but:",
     options: ["Johnny Ringo", "Doc Holliday", "Virgil Earp", "Mattie Blaylock"],
     answer: 0
    },{
      question: "In the film 'Soldier', Kurt spoke as few as ____ words?",
      options:  ["62", "104", "1012", "315"],
      answer: 1
    },{
      question: "R.J. MacReady was an American helicopter stationed at an Antarctic Research station in which film:",
      options: ["The Fog", "Poseidon", "The Thing", "The Day After Tomorrow"],
      answer: 2
    },{
      question: "Kurt and Goldie Hawn have been together for a VERY long time. They both starred in this romatic comedy:",
      options: ["Catch me if you Can", "How to Lose a Guy in 10 Days", "You've Got Mail", "Overboard"],
      answer: 3
    }];

  var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8'  ,]
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

  $("#startOverBtn").on('click', newGame);


  function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    $("startOverBtn").empty();

    $(this).hide();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();


 }

 function newQuestion(){
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();
  answered = true;

  //$("#currentQuestion").html("Question #"+(currentQuestion+1)+"/"+triviaQuestions.length);
  $(".question").html("<h1>" + triviaQuestions[currentQuestion].question + "</h1>");
  for(var i = 0; i < 4; i++){
  var choices = $("<div>");
  choices.text(triviaQuestions[currentQuestion].options[i]);
  choices.attr({"data-index": i });
  choices.addClass("thisChoice");
  $(".answerList").append(choices);
  }
  countdown();

  $(".thisChoice").on("click",function(){
  userSelect = $(this).data("index");
  clearInterval(time);
  answerPage();
  });
 }

 function countdown(){
   seconds = 15;
   answered = true;
   time = setInterval(showCountdown, 1000);
 }

 function showCountdown(){
   seconds--;
   $("#timeLeft").html("<h3>" + "Time: " + seconds + "</h3>");
   if(seconds < 1){
     clearInterval(time);
     answered = false;
     answerPage();
   }
 }

  function answerPage(){
    $("#currentQuestion").empty();
    $(".thisChoice").empty();
    $(".question").empty();

    var rightAnswerText = triviaQuestions[currentQuestion].options[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $("#gif").html('<img src = "assets/images/' + gifArray[currentQuestion] +'.gif" width = "400px">');

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
    $("#timeLeft").empty();
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();

    $("#finalMessage").html(messages.finished);
    $("#correctAnswers").html("Correct Answers: " + correctAnswer);
    $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
    $("#unanswered").html("Unanswered: " + unanswered);
    $("#startOverBtn").addClass("reset btn btn-dark");
    $("#startOverBtn").show();
    $("#startOverBtn").text("Start Over?");
  }




})



     //question: "Snake Plissken was granted early release from incarceration to save the President of the USA who was trapped in Manhattan with one small caveat",
