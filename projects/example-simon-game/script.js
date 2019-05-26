(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        setup()
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

function setup(){
  console.log(this)
  this.$ = window.jQuery;
  this.strict = false;
  this.STATE = {idle: 0, player: 1, computer: 2}
  this.state = 0;
  this.currentColors = [];
  this.playerColors = [];
  this.audio = [];
  loadAudio();

  this.image = [[null,null],[null,null],[null,null],[null,null]]
  image[0][0] = "https://www.dropbox.com/s/9vs477smwk24qvh/g0.png?dl=1"; //green
  image[0][1] = "https://www.dropbox.com/s/b9yn2b7uu98sbql/g1.png?dl=1";
  image[1][0] = "https://www.dropbox.com/s/cfjj2qsvidauc3c/r0.png?dl=1"; //red
  image[1][1] = "https://www.dropbox.com/s/qotk1jgquvnle1f/r1.png?dl=1";
  image[2][0] = "https://www.dropbox.com/s/gj3p5u4gbr8ghkw/y0.png?dl=1"; //yellow
  image[2][1] = "https://www.dropbox.com/s/1r964lzq4fs5abz/y1.png?dl=1";
  image[3][0] = "https://www.dropbox.com/s/w4xw3ogu0btl7tu/b0.png?dl=1"; //blue
  image[3][1] = "https://www.dropbox.com/s/hv2zhyukub70hb7/b1.png?dl=1";

  loadImage();
  function loadImage(){
    for(var x = 0; x < 4; x++){
      for(var y = 0; y < 2; y++){
        var z = new Image();
          z.onload = function(){
          image[this.thisX][this.thisY] = this;
            if(this.thisY == 0 ){
              $("#image" + this.thisX).attr("src",this.src);
            }
        }
        z.src = image[x][y];
        z.thisX = x;
        z.thisY = y;

      }
    }
  }
  function loadAudio(){
    audio[0] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    audio[1] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    audio[2] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    audio[3] = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  }


  $("#strictText").click(function(){
    if(state == 0){
      strict = strict?false:true;
    }
    $("#strictText").html("strict mode " +  (strict?"on":"off") );
  })

  $("#btnStart").click(function(){
    if(state == 0){
      start = 2;
      $("#midp").html("0 /0")
      turn(9);
    }
  })

  $("#image0").click(function(){
    if(state == 1){
      audio[0].play();
      turn(0);
    }else if(state==2){
      writeMsg("Wait before clicking","err");
    }else{
      writeMsg("click Start","green");
    }
  })
  $("#image0").mousedown(function(){
    if(state == 1){
    turnLightOn(0);
      $(document).mouseup(function(){
        turnLightOff(0);
        $(document).off("mouseup")
      })
    }
    return false;
  })

  $("#image1").mousedown(function(){
    if(state == 1){
    turnLightOn(1);
          $(document).mouseup(function(){
        turnLightOff(1);
        $(document).off("mouseup")
      })
    }
    return false;
  })
  $("#image2").mousedown(function(){
    if(state == 1){
    turnLightOn(2);
          $(document).mouseup(function(){
        turnLightOff(2);
        $(document).off("mouseup")
      })
    }
    return false;
  })
  $("#image3").mousedown(function(){
    if(state == 1){
      turnLightOn(3);
          $(document).mouseup(function(){
        turnLightOff(3);
        $(document).off("mouseup")
      })
    }
    return false;
  })
  $("#image1").click(function(){
    if(state == 1){
      audio[1].play();
      turn(1);
    }else if(state==2){
      writeMsg("Wait before clicking","err");
      playerColors = [];
    }else{
      writeMsg("click Start","green");
    }
  })
  $("#image2").click(function(){
    if(state == 1){
      audio[2].play()
      turn(2);
    }else if(state==2){
      writeMsg("Wait before clicking","err");
      playerColors = [];
    }else{
      writeMsg("click Start","green");
    }
  })
  $("#image3").click(function(){
    if(state == 1){
      audio[3].play()
      turn(3);
    }else if(state==2){
      writeMsg("Wait before clicking","Err");
      playerColors = [];
    }else{
      writeMsg("click Start","green");
    }
  })
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkCorrect(){
  for(var x = 0; x < currentColors.length; x++){
    if(playerColors[x] != currentColors[x]){
      return false;
    }
  }
  return true;
}

function turn(id){
  writeMsg("","")
  console.log("turn",id)
  state = 2;
  if(id==9){
    playerColors = [];
    currentColors.push(random(0,3));
    setTimeout(function(){showColors(0);},300)

  }else{
    playerColors.push(id);
    if(currentColors[playerColors.length - 1] != playerColors[playerColors.length - 1]){


      if(strict){
        writeMsg("Incorrect <br> Click Restart","err");
        currentColors = [];
        for(var x = 0; x < 4; x ++){
          $("#image" + x).unbind("click")
        }
        return;
      }else{
         writeMsg("Incorrect <br> Type Again","err");
      playerColors = [];
         setTimeout(function(){showColors(0);},300);
      }
    }else{
      if(playerColors.length == currentColors.length){
        if(checkCorrect() == true){
          showCount();

          if(currentColors.length > 19){
            writeMsg("Congratulations<br> You Won","green");

            currentColors = [];
            playerColors = [];
            state = 0;
            return 1;

          }else{
            playerColors = [];
            currentColors.push(random(0,3)); console.log("currentColor",currentColors)
            setTimeout(function(){showColors(0);},500);

          }

        }else{

          writeMsg("Incorrect.<br> Type Again","err");
          setTimeout(function(){showColors(0);},500);
          playerColors = [];
          state = 1;
          if(strict){
            writeMsg("Incorrect.<br> Click Restart","err");
            currentColors = [];
            state = 0;
            return;
          }
        }
      }else{
       setTimeout(function(){state = 1;},50)
      }
    }
  }
}

function showColors(a){

  if(a < currentColors.length){
  turnLightOn(currentColors[a])
    audio[currentColors[a]].play();
    setTimeout(function(){
     turnLightOff(currentColors[a])

    if(a == currentColors.length - 1){
      state = 1;
    }else{
      setTimeout(function(){
        showColors(a + 1);
      },300)
    }

    },500)
  }


}

function turnLightOn(a){
  $("#image" + a).attr("src",image[a][1].src);
}
function turnLightOff(a){
  $("#image" + a).attr("src",image[a][0].src);
}

function writeMsg(a,b){
  $("#midsmall").html(a);
  if(b = "err"){
    $("#midsmall").css("color","red");
  }else{
    $("#midsmall").css("color","lightgreen");
  }
}
function showCount(){
  $("#midp").html(currentColors.length + " /20")

}
