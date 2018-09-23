(function(){
"use strict";


	var
		timer = NaN,
	  score = 0,
	  flipTimer,
	  prevCard,
		randomNum,
	  startTime,
		nowTime,
		elapsedTime,
		elapsedMin,
		elapsedSec,
		cards = [];


  // Used Fisher-Yates-shuffle.
  Array.prototype.shuffle = function(){
		var
			len = this.length - 1,
			tmp,
			j;

		for(var i = len; i > 0; i--){
			j = Math.floor(Math.random() * (i + 1));
			tmp = this[i];
			this[i] = this[j];
			this[j] = tmp;
		}
		return this;
  };

  // window onload function.
  window.onload = function init(){
    var table = document.getElementById('table');

    for(var i = 1; i <= 10; i++){
      cards.push(i, i);
    }

    cards.shuffle();

    for(i = 0; i < 4; i++){
      var tr = document.createElement("tr");
      for(var j = 0; j < 5; j++){
        var td = document.createElement("td");
        td.className = "card back";
        td.number = cards[i * 5 + j];
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
    nowTime = new Date();
    elapsedTime = (nowTime.getTime() - startTime.getTime());
    elapsedSec = ("0" + Math.floor((elapsedTime / 1000) % 60)).slice(-2);
    elapsedMin = ("0" + Math.floor((elapsedTime / 1000) / 60)).slice(-2);
    document.getElementById("min").textContent = elapsedMin;
    document.getElementById("sec").textContent = elapsedSec;
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
