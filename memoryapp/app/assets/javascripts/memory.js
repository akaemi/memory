var games = function() {
  var pics = null;
  var numSelected = 0;
  var numMatches = 0;
  var numGuesses = 0;
  var firstSelected = null;
  
  function setPics(p) {
  	pics = p;
  }
  
  function flipCard (element) {
    if (!element.selected && !element.matched && (firstSelected == null || firstSelected.id != element.id)) {
		numSelected++;
      
      if (numSelected == 1) {
        firstSelected = element;
        updateCard(element, true, false);
      }
      else if (numSelected == 2) {
        var pic1 = pics[firstSelected.id];
        var pic2 = pics[element.id];
        if (pic1[0] == pic2[0]) {
          updateCard(element, true, false);
          setTimeout(function(){updateCards(firstSelected, element, false, true, "Congratulations! You have a match!")}, 1000);
        } else {
          updateCard(element, true, false);
          setTimeout(function(){updateCards(firstSelected, element, false, false, "Sorry, not a match.")}, 1000);
        }
      }
      
    }
  }
  
  function updateCard(element, selected, matched) {
    
    var imgElement = element.getElementsByTagName("img")[0];
    
    if (matched) {
      element.matched = true;
      element.style.backgroundImage = 'url("/assets/other.png")';
    } else if (selected) {
      element.selected = true;
      var pic = pics[element.id];
      element.style.backgroundImage = 'url(' + pic[1] + ')';
    } else {
      element.selected = false;
      element.style.backgroundImage = 'url("/assets/card-back.png")';
    }
  }
  
  function updateCards(card1, card2, selected, matched, message) {
    //alert(message);
    var backgroundImage = card1.style.backgroundImage;
    updateCard(firstSelected, selected, matched);
    updateCard(card2, selected, matched);
    firstSelected=null;
    numSelected=0;
    addGuess();
    
    if (matched) {
	    // ajax call
	    $.getJSON("/games/projectDetails.json?url=" + backgroundImage,
	        function(data){
	          var img = "<img align='center' src='" + data.thumbnail.src + "'/>";
	          $("#matches").append("<div class='match'>" + data.name + "<br/>" + img + "</div>");
	        });
	        
	 	// update counter
	 	addMatch();
     }
  }
  
  function addGuess() {
  	numGuesses++;
  	$("#guessCounter").text(numGuesses);
  }
  
  function addMatch() {
  	numMatches++;
  	$("#matchCounter").text(numMatches);
  }
  
  return {
  	flipCard : flipCard,
  	setPics : setPics
  }
  
  
 
}();