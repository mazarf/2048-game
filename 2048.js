// 2048 game logic. uses JQuery

$( document ).ready( function() {
	var score = 0;
	function generateNum() { // generates 2s or 4s randomly
		if( full() ) {
			return false;
		} else {
			var possibleSquares = $( ".n0" );
			var randomIndex = Math.floor( Math.random() * possibleSquares.length );
			var value = Math.random() < 0.9 ? 2 : 4;
			changeValue(possibleSquares.eq(randomIndex), value);

			// small animation
			var sq = possibleSquares.eq(randomIndex);
			sq.css("background-color", "yellow");
			setTimeout( function() { sq.css("background-color", ""); }, 250);
			return true;
		}
	}

	function full() {
		return $( ".n0" ).length == 0;
	}

	function changeValue(square, value) {
		square.html(value == 0 ? "" : value);
		square.attr("class", "n" + value );
	}

	function areSame(square1, square2)
	{
		return square1.html() == square2.html();
	}

	function moveHandler(event) {
		var moved = false; // stores whether a move was made
		switch(event.which)
		{
			case 37: // left
				moved = moveLeft();
				break;
			case 38: // up
				moved = moveUp();
				break;
			case 39: // right
				moved = moveRight();
				break;
			case 40: // down
				moved = moveDown();
				break;
		}

		if(moved)
		{
			if(generateNum() == false)
			{
				$( "p" ).html("You Lose!");
				$( "body" ).unbind("keydown");
			}
		}
	}

	function moveDown() {
		var allSquares = $( "td" );
		var movementMade = false;
		//var takenSquares = allSquares.not("#n0"); // all nonzero squares;
		for(var i = allSquares.length; i >= 0; i--)
		{
			var currIndex = i + 4;
			var currSquare = allSquares.eq(i);
			if( currSquare.html() != "" )
				while(currIndex < 16)
				{
					var nextSquare = allSquares.eq(currIndex);
					if( nextSquare.html() == "" ) // square below is empty
					{
						changeValue( nextSquare, currSquare.html() );
						changeValue( currSquare, 0 );
						currSquare = nextSquare;
						movementMade = true;
					}
					else if(areSame(currSquare, nextSquare)) // merge
					{
						changeValue( currSquare, 0 );
						changeValue( nextSquare, 2 * nextSquare.html() );
						score = score + parseInt(nextSquare.html());
						$( "p" ).html("Current Score: " + score);
						movementMade = true;
						break;
					}
					else { // not a match
						break;
					}
					currIndex += 4;
				}
		}
		return movementMade;
	}

	function moveUp() {
		var allSquares = $( "td" );
		var movementMade = false;
		for(var i = 0; i < allSquares.length; i++)
		{
			var nextIndex = i - 4;
			var currSquare = allSquares.eq(i);
			if( currSquare.html() != "" )
				while(nextIndex >= 0)
				{
					var nextSquare = allSquares.eq(nextIndex);
					if( nextSquare.html() == "" ) // square above is empty
					{
						changeValue( nextSquare, currSquare.html() );
						changeValue( currSquare, 0 );
						currSquare = nextSquare;
						movementMade = true;
					}
					else if(areSame(currSquare, nextSquare)) // merge
					{
						changeValue( currSquare, 0 );
						changeValue( nextSquare, 2 * nextSquare.html() );
						score = score + parseInt(nextSquare.html());
						$( "p" ).html("Current Score: " + score);
						movementMade = true;
						break;
					}
					else { // not a match
						break;
					}
					nextIndex -= 4;
				}
		}
		return movementMade;
	}

	
	function moveRight() {
		var allSquares = $( "td" );
		var rightOrder = [ 15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0 ]; // rightmost columns first
		var movementMade = false;
		for(var i = 0; i < allSquares.length; i++)
		{
			var nextIndex = rightOrder[i] + 1;
			var currSquare = allSquares.eq(rightOrder[i]);
			if( currSquare.html() != "" )
				while(nextIndex < 16 && nextIndex % 4 > rightOrder[i] % 4) // still on same row and further up
				{
					var nextSquare = allSquares.eq(nextIndex);
					if( nextSquare.html() == "" ) // square to right is empty
					{
						changeValue( nextSquare, currSquare.html() );
						changeValue( currSquare, 0 );
						currSquare = nextSquare;
						movementMade = true;
					}
					else if(areSame(currSquare, nextSquare)) // merge
					{
						changeValue( currSquare, 0 );
						changeValue( nextSquare, 2 * nextSquare.html() );
						score = score + parseInt(nextSquare.html());
						$( "p" ).html("Current Score: " + score);
						movementMade = true;
						break;
					}
					else { // not a match
						break;
					}
					nextIndex += 1;
				}
		}
		return movementMade;
	}

	function moveLeft() {
		var allSquares = $( "td" );
		var movementMade = false;
		for(var i = 0; i < allSquares.length; i++)
		{
			var nextIndex = i - 1;
			var currSquare = allSquares.eq(i);
			if( currSquare.html() != "" )
				while(nextIndex >= 0 && nextIndex % 4 < i % 4) // still on same row and further up
				{
					var nextSquare = allSquares.eq(nextIndex);
					if( nextSquare.html() == "" ) // square to left is empty
					{
						changeValue( nextSquare, currSquare.html() );
						changeValue( currSquare, 0 );
						currSquare = nextSquare;
						movementMade = true;
					}
					else if(areSame(currSquare, nextSquare)) // merge
					{
						changeValue( currSquare, 0 );
						changeValue( nextSquare, 2 * nextSquare.html() );
						score = score + parseInt(nextSquare.html());
						$( "p" ).html("Current Score: " + score);
						movementMade = true;
						break;
					}
					else { // not a match
						break;
					}
					nextIndex -= 1;
				}
		}
		return movementMade;
	}


	/*function move( currSquare, nextSquare, step ) {
		if( nextSquare.html() == "" ) // square below is empty
		{
			changeValue( nextSquare, currSquare.html() );
			changeValue( currSquare, 0 );
			currSquare = nextSquare;
			movementMade = true;
		}
		else if(areSame(currSquare, nextSquare)) // merge
		{
			changeValue( currSquare, 0 );
			changeValue( nextSquare, 2 * nextSquare.html() );
			score = score + parseInt(nextSquare.html());
			$( "p" ).html("Current Score: " + score);
			movementMade = true;
			break;
		}
		else { // not a match
			break;
		}
	} */


	$( "body" ).on( "keydown", moveHandler);
	generateNum();
	generateNum();
});
