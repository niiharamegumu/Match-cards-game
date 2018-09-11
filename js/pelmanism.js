(function(){
"use strict";


var timer = NaN,
  score = 0,
  flipTimer,
  prevCard,
  startTime;


  // Used Fisher-Yates-shuffle.
  Array.prototype.shuffle = function(){
    var arrayLength = this.length;
    while (arrayLength) {
      var randomNum = Math.floor( Math.random() * arrayLength );
      var tmp = this[--arrayLength];
      this[arrayLength] = this[randomNum];
      this[randomNum] = tmp;
    }
    return this;
  };

  // window onload function.
  window.onload = function init(){
    var table = document.getElementById('table');
    var cards = [];

    for(var i = 1; i <= 10; i++){
      cards.push(i, i);
    }

    cards.shuffle();

    for(var trCount = 0; trCount < 4; trCount++){
      var tr = document.createElement("tr");
      for(var tdCount = 0; tdCount < 5; tdCount++){
        var td = document.createElement("td");
        td.className = "card back";
        td.number = cards[trCount * 5 + tdCount];
        td.onclick = flip;
        tr.appendChild(td);
      }
      table.appendChild(tr);
      }

    startTime = new Date();
    timer = setInterval(tick, 1000);
  };

  // elapsed time.
  function tick(){
    var nowTime = new Date();
    var elapsedTime = Math.floor((nowTime.getTime() - startTime.getTime()) / 1000);
    document.getElementById('time').textContent = elapsedTime;
  }

  //Card(td-element) click function.
  function flip(e){
    var clickSrc = e.target;
    var clickSrcNumber = clickSrc.number;

    if(flipTimer || clickSrc.textContent != ""){
      return;
    }

    clickSrc.className = "card";
    clickSrc.textContent = clickSrcNumber;

    if(prevCard == null){
      prevCard = clickSrc;
      return;
    }

    if(prevCard.number == clickSrcNumber){

      if(++score == 10){
        clearInterval(timer);
        alert("Congratulation!!");
      }
      prevCard = null;
      clearTimeout(flipTimer);

    }else{
      flipTimer = setTimeout(function(){
        clickSrc.className = "card back";
        clickSrc.textContent = "";
        prevCard.className = "card back";
        prevCard.textContent = "";
        prevCard = null;
        flipTimer = NaN;
      }, 1000);
    }

  }


}());
