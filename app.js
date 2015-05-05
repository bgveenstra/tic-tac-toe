// wait for the DOM to finish loading
window.addEventListener("load", function () {
    // all your code should go in here.
    withBoardListener();
    // Game state variables
    var player = "X";	// who's turn is it?
    var movesSinceReset = 0; // how many moves since game started? (to check ties)

    document.querySelector("#reset").addEventListener("click", resetBoard);

    function resetBoard(){
    	// sets the game state variables back to their initial values
    	// calls resetBox to reset each box
    	movesSinceReset = 0;
    	player = "X";

    	var boxes = document.querySelectorAll(".box");
	    for (var i=0; i<9; i++){
	    	resetBox(boxes[i]);
	    }
	}

	function resetBox(box){
		// sets the box's class and contents back to their initial values
		// sets the box's owner to null (to erase player ownership)
		box.owner = null;
		box.setAttribute("class", "box");
		box.innerHTML = "&nbsp;";
    }

    
    function withBoardListener(){
    	// controls game logic
    	// eventListener is added to the entire board element
		var board = document.querySelector('#board');
		var box;
	  	board.addEventListener('click', function(event) {
	  		// check that this event is for a box (has a class and class includes box)
	        if (event.target.getAttribute("class") && 
	        	event.target.getAttribute("class").match("box")){
	        	// name the clicked box box
	        	box = event.target;
	        	if (box.owner){
					alert("That box is already claimed!");
				} else { // clicked box hasn't been claimed by either player
					// up the move count and let player claim the box
					movesSinceReset += 1; 
					claimBox(player, box);
					// check if the game is over
					if (winner()){  // current player has won :)
						alert(player + " wins!");
					} else if (movesSinceReset === 9) {  // tie
						alert("It's a draw!");
					} else { // game's not over - switch the current player
		    			player = (player==="X") ? "O" : "X";
		    		}
				}
	        }

	    });
    }

    function withBoxListeners(){
    	// sets up an individual event listener for each box
    	// Interesting scoping note. google "add event listener in loop"
    	var boxes = document.querySelectorAll(".box");
	    for (var i=0; i<9; i++){
	    	listenOnBox(boxes[i]);
	    }
	}

	function listenOnBox(box){
		// adds an event listener to the box div passed in
		box.addEventListener("click", function(){  	
			if (box.owner){
				alert("That box is already claimed!");
			} else { // box is empty
				// increase move count and allow player to claim box
				movesSinceReset += 1; 
				claimBox(player, box);
				// check if game is over
				if (winner()){ // current player has won
					alert(player + " wins!");
				} else if (movesSinceReset === 9) {  // tie
					alert("It's a draw!");
				} else { // game isn't over - switch player and keep going
		    		player = (player==="X") ? "O" : "X";  
		    	}
			}
		});
	}

  	function claimBox(player, box){
  		// change box content and attributes to reflect player owning it now
  		box.owner = player;
  		box.innerHTML = player;
    	box.setAttribute("class", (box.getAttribute("class") + " claimed " + player));  
  	}

  	// single-square variables for the winner function
  	// will be set to the owner of each box
	var topLeft, topMid, topRight;
    var midLeft, midMid, midRight;
    var botLeft, botMid, botRight;

    function winner(){
    	// find the owner of each box
    	topLeft = document.querySelector("#topLeft").owner;
    	topMid = document.querySelector("#topMid").owner;
    	topRight = document.querySelector("#topRight").owner;
    	midLeft = document.querySelector("#midLeft").owner;
    	midRight = document.querySelector("#midRight").owner;
    	midMid = document.querySelector("#midMid").owner;
    	botLeft = document.querySelector("#botLeft").owner;
    	botMid = document.querySelector("#botMid").owner;
    	botRight = document.querySelector("#botRight").owner;

    	// check all win conditions
    	// since null === null, need to also check that owner is a truthy string
    	return topLeft && topLeft === topMid && topMid === topRight    ||
    		midLeft && midLeft === midMid && midMid === midRight       ||
    		botLeft && botLeft === botMid && botMid === botRight       ||
    		topLeft && topLeft === midLeft && midLeft === botLeft      ||
    		topMid && topMid === midMid && midMid === botMid           ||
    		topRight && topRight === midRight && midRight === botRight ||
    		topLeft && topLeft === midMid && midMid === botRight       ||
    		topRight && topRight === midMid && midMid === botLeft;
    }


   
});
