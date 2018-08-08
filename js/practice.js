(function(){
"use strict";

Array.prototype.shuffle = function(){
  var i = this.length;
  while(i){
    var j = Math.floor(Math.random() * i );
    var t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};
var
   timer = NaN,
   score = 0,
   flipTimer,
   prevCard,
   startTime;

window.onload =init;
function init(){
  var table = document.getElementById("table");

  var cards =[];
  for(var i = 1; i <= 10; i++){
    cards.push(i);
    cards.push(i);
  }
  cards.shuffle();

  for(var r = 0; r < 4; r++) {
    var tr = document.createElement("tr");
    for(var d = 0; d < 5; d++){
      var td = document.createElement("td");
      td.className = "card back";
      td.number = cards[r * 5 + d];
      td.onclick = flip;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  startTime = new Date();
  timer = setInterval(tick,1000);
}


function tick(){
  var now = new Date();
  var elapsed = Math.floor( (now.getTime() - startTime.getTime())/ 1000);
  document.getElementById("time").textContent = elapsed;
}

function flip(e){
  var src = e.target;
  if(flipTimer || src.textContent != ""){
    return;
  }

  var num = src.number;
  src.className = "card";
  src.textContent = num;

  if(prevCard == null){
    prevCard = src;
    return;
  }

  if(prevCard.number == num){
    if(++score == 10){
      clearInterval(timer);
    }
    prevCard = null;
    clearTimeout(flipTimer);
  }else{
    flipTimer = setTimeout(function(){
        src.className = "card back";
        src.textContent = "";
        prevCard.className = "card back";
        prevCard.textContent ="";
        prevCard = null;
        flipTimer = NaN;
    },1000);
  }
}

}());
