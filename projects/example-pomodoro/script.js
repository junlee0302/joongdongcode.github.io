var duration = 0;
var currentTime = 0;
var startTime = new Date();
var breakDurationMin = 5;
var studyDurationMin = 25;
var currentState = "study";
var paused = 0;
var pausedTime = 0;
var notPaused  = 0;
$( document ).ready(function() {
  window.progressCircle = new ProgressBar.Circle('#timerCircle', {
      strokeWidth: 3,
      trailWidth: 1,
      text: {
          value: '25 : 00'
      }
  });
  $("#upButton").click(function(){
    if(!duration){
      if(currentState == "study"){
        studyDurationMin++;
        console.log(studyDurationMin + " : 00")
        progressCircle.setText(studyDurationMin + " : 00");
      }else{
        breakDurationMin++;
        console.log(breakDurationMin + " : 00")
        progressCircle.setText(breakDurationMin + " : 00");
      }
    }
  })

  $("#downButton").click(function(){
    if(!duration){
      if(currentState == "study"){
        studyDurationMin--;
        if(studyDurationMin == 0){studyDurationMin++}
        progressCircle.setText(studyDurationMin + " : 00");
      }else{
        breakDurationMin--;
        progressCircle.setText(breakDurationMin + " : 00");
        if(studyDurationMin == 0){breakDurationMin++}
      }
    }
  })
  $("#startButton").click(function(){
    if(!duration){
      startTime = new Date();
      duration = currentState == "study" ? setHeader("study")+studyDurationMin * 60 : setHeader("break") + breakDurationMin * 60;
      if(currentState == "study"){
        progressCircle.path.setAttribute('stroke','#eaa535')
      }else{
        progressCircle.path.setAttribute('stroke','#4a4adb')
      }
      currentTime = 0;
      $("#startButton").html("Pause");
      tick();
    }else{
      if(paused){

        paused = 0;
        notPaused = 1;
        $("#startButton").html("Pause");
        setHeader(currentState + " time");
      }else{
        paused = 1;
        $("#startButton").html("Resume");
        setHeader("paused");
      }
    }
  })
});




function tick(){
  if(!paused){
   currentTime = (new Date().getTime()-startTime.getTime())/1000;
    if(notPaused == 1){
      pausedTime += (new Date().getTime()-startTime.getTime())/1000 - currentTime;
      notPaused = 0;
    }
  }
  if(currentTime - pausedTime > duration){
     progressCircle.animate(1, {
    duration: 70
  }, function() {
    duration = 0;
    currentTime = 0;
    pausedTime = 0;
       if(currentState == 'study'){
         currentState ="break";
         progressCircle.path.setAttribute('stroke','#4a4adb');
         progressCircle.setText(breakDurationMin + " : 00");
         setHeader("break")
       }else{
         currentState ="study";
         setHeader("study")
         progressCircle.path.setAttribute('stroke','#eaa535');
         progressCircle.setText(studyDurationMin + " : 00");
       }
  });
    $("#startButton").click()
    return;
  }
  progressCircle.animate((currentTime-pausedTime)/duration, {
    duration: 60,
  }, function() {

   progressCircle.setText(Math.floor((duration - currentTime + pausedTime)/60)+ " : " + (Math.floor((duration - currentTime + pausedTime)%60).toString().length == 2? Math.floor((duration - currentTime + pausedTime)%60):'0' + Math.floor((duration - currentTime + pausedTime)%60)))
    tick();

  });
}


function setHeader(a){
  console.log(a);
  var text = a;
  text = text.split();
  for(var x = 0; x < text.length; x++){
    text[x] = text[x].split('');
    text[x][0] = text[x][0].toUpperCase()
    text[x] = text[x].join('')
  }
  text = text.join(' ')
  $("#timerState").html(text);
  if(currentState == "study"){
    $("#timerState").css("color","#eaa535");
  }else{
    $("#timerState").css("color","#4a4adb");
  }
  return 0;
}

function reset(){
  duration = 0
  currentState = "study";
  pausedTime = 0
  paused = 0
  notPaused  = 0;
  currentTime = 0;
  progressCircle.destroy()
  progressCircle = new ProgressBar.Circle('#timerCircle', {
    strokeWidth: 3,
    trailWidth: 1,
    text: {
        value: '' + studyDurationMin + ' : 00'
    }
});
  $("#startButton").html("Start");
}
