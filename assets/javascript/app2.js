$(document).ready(function() {
  var triviaQuestions = [{
    question: "Kurt Russel was a Disney prodigy.  His first feature film was:",
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

  $(".startButton").on("click", start);


  var timerRunning = false;
  var time = 15;


  function start(){
    if (!timerRunning){
      intervalId = setInterval(count, 1000);
      timerRunning = true;
      console.log ("count")
      $(this).hide();
      $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
      $("#insertQuestions").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
      for(var i = 0; i < 4; i++){
        var choices = $("<div>");
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        //choices.attr({"data-index": i});
        choices.addClass("thisChoice");
        $(.answerList).append(choices);
      }
    }
  };

  function reset(){
    time = 15;
    $("#display").text("Time to Answer: 15");
    currentQuestion = 0;
    //$("#insertQuestions").html("<h2>" + triviaQuestions[0] + "</h2>");
  }

  function count(){
    time--;
    var converted = timeConverter(time);
    $("#display").text(converted);

  }

  function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }if (minutes === 0) {
      minutes = "00";
    }else if (minutes < 10) {
      minutes = "0" + minutes;
    }if (minutes == 00 && seconds == 00){
      reset();
    }return minutes + ":" + seconds;
  }



})
