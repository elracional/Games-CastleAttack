//Global variables used in the game
var PawnSelected_x;
var PawnSelected_y;

var CastleP1 = 1000; // Castle life
var CastleP2 = 1000;// Castle life

var secs;
var mins;
var cronometer; //Used to count the match time
var checkTime;

var board = new Array(8); //Matrix of the board to be used
var player; //Variable that says the player's turn


// Function created so that time returns to zero when a new game begins
function ResetTime(){
    clearInterval(cronometer);
    clearTimeout(checkTime);
    secs = 0;
    mins =0;
}

// Function that initializes the stopwatch time
function StarTime(){
    secs =0;
    mins =0;
    s = document.getElementById("seconds");
    m = document.getElementById("minutes");

    cronometer = setInterval(//setInterval used to advance through each given time interval, 
    	//it is given in milliseconds so we put 1000 at the end

        function(){
        	//The seconds will be converted to minutes
            if(secs==60){ 
                secs=0;
                mins++;
                if (mins<10) m.innerHTML ="0"+mins;
                else m.innerHTML = mins;

                if(mins==60) mins=0;
            }
            if (secs<10) s.innerHTML ="0"+secs;
            else s.innerHTML = secs;

            secs++;
        
        }
        ,1000);
}


function ClearBoard(){
  	//soldiers or pawns from player 2 or CPU on initial state
  	
	board[1][7][0] = 2;
	board[3][7][0] = 2;
	board[5][7][0] = 2; //id from player
	board[7][7][0] = 2;

	board[1][7][1] = 100;
	board[3][7][1] = 100;
	board[5][7][1] = 100; //Pawns life
	board[7][7][1] = 100;

	board[1][7][2] = 1;
	board[3][7][2] = 1; //state of combo
	board[5][7][2] = 1;
	board[7][7][2] = 1;

	board[0][6][0] = 2;
	board[2][6][0] = 2;//id from player
	board[4][6][0] = 2;
	board[6][6][0] = 2;

	board[0][6][1] = 100;
	board[2][6][1] = 100;//Pawns life
	board[4][6][1] = 100;
	board[6][6][1] = 100;

	board[0][6][2] = 1;
	board[2][6][2] = 1;
	board[4][6][2] = 1;//state of combo
	board[6][6][2] = 1;

	board[1][5][0] = 2;
	board[3][5][0] = 2;//id from player
	board[5][5][0] = 2;
	board[7][5][0] = 2;

	board[1][5][1] = 100;
	board[3][5][1] = 100;//Pawns life
	board[5][5][1] = 100;
	board[7][5][1] = 100;

	board[1][5][2] = 1;
	board[3][5][2] = 1;//state of combo
	board[5][5][2] = 1;
	board[7][5][2] = 1;
	
	//Painting the pawns on the board
	for (i=0; i<8; i++){
		for (j=5; j<8; j++){
			if (board[i][j][0] == 2 ){
				cell = document.getElementById("c"+i+j);
				cell.style.background = "none repeat scroll 0% 0% orange";
				cell = document.getElementById("c"+i+j).innerHTML = 
					"<img id='" + i + j + "' src='img/pawnW.png'></img>"
			}
			
		}
	}

	//soldiers or pawns from player 1 on initial state (player 2)
	board[0][2][0] = 1;
	board[2][2][0] = 1;
	board[4][2][0] = 1;//id from player
	board[6][2][0] = 1;

	board[0][2][1] = 100;
	board[2][2][1] = 100;//Pawns life
	board[4][2][1] = 100;
	board[6][2][1] = 100;

	board[0][2][2] = 1;
	board[2][2][2] = 1;//state of combo
	board[4][2][2] = 1;
	board[6][2][2] = 1;

	board[1][1][0] = 1;
	board[3][1][0] = 1;
	board[5][1][0] = 1;//id from player
	board[7][1][0] = 1;

	board[1][1][1] = 100;
	board[3][1][1] = 100;//Pawns life
	board[5][1][1] = 100;
	board[7][1][1] = 100;

	board[1][1][2] = 1;
	board[3][1][2] = 1;
	board[5][1][2] = 1;//state of combo
	board[7][1][2] = 1;

	board[0][0][0] = 1;
	board[2][0][0] = 1;//id from player
	board[4][0][0] = 1;
	board[6][0][0] = 1;

	board[0][0][1] = 100;
	board[2][0][1] = 100;//Pawns life
	board[4][0][1] = 100;
	board[6][0][1] = 100;

	board[0][0][2] = 1;
	board[2][0][2] = 1;//state of combo
	board[4][0][2] = 1;
	board[6][0][2] = 1;

	//Painting the pawns on the board (player 1)
	for (i=0; i<8; i++){
		for (j=0; j<3; j++){
			if (board[i][j][0] == 1){
				cell = document.getElementById("c"+i+j);
				cell.style.background = "none repeat scroll 0% 0% orange";
				cell = document.getElementById("c"+i+j).innerHTML = 
					"<img id='" + i + j + "' src='img/pawnB.png'></img>"
			}
			
		}
	}
	
	//Put all cells that do not have pawns in zero
	for (i=0; i<8; i++){
		for (j=0; j<8; j++){
			if (board[i][j][1] != 100){
				board[i][j][0]=0;
				board[i][j][1]=0;
				board[i][j][2]=0;
				cell = document.getElementById("c"+i+j);
				cell.style.background = "";  
				cell = document.getElementById("c"+i+j).innerHTML = "";
			}
			
		}
	}
}
//Function that updates the board and marks in yellow the pawns with %100 of life and with red the pawns with %50 of life
function UpdateBoard(){
    for (i=0; i<8; i++){
		for (j=0; j<8; j++){
			if (!board[i][j][0]){
				board[i][j][0]=0;
				board[i][j][1]=0;
				cell = document.getElementById("c"+i+j);
				cell.style.background = "";  
				cell = document.getElementById("c"+i+j).innerHTML = "";
			}
			if (board[i][j][1] == 50 && board[i][j][0] == 1){
				cell = document.getElementById("c"+i+j);
				cell.style.background = "none repeat scroll 0% 0% red";
				cell = document.getElementById("c"+i+j).innerHTML = 
				"<img id='" + i + j + "' src='img/pawnB.png'></img>"
			}
			if (board[i][j][1] == 100 && board[i][j][0] == 1){
				cell = document.getElementById("c"+i+j);
				cell.style.background = "none repeat scroll 0% 0% orange";
				cell = document.getElementById("c"+i+j).innerHTML = 
				"<img id='" + i + j + "' src='img/pawnB.png'></img>"
			}
			if (board[i][j][1] == 50 && board[i][j][0] == 2){
				cell = document.getElementById("c"+i+j);
				cell.style.background = "none repeat scroll 0% 0% red";
				cell = document.getElementById("c"+i+j).innerHTML = 
				"<img id='" + i + j + "' src='img/pawnW.png'></img>"
			}
			if (board[i][j][1] == 100 && board[i][j][0] == 2){
				cell = document.getElementById("c"+i+j);
				cell.style.background = "none repeat scroll 0% 0% orange";
				cell = document.getElementById("c"+i+j).innerHTML = 
				"<img id='" + i + j + "' src='img/pawnW.png'></img>"
			}
		}	
	}	 
}

//Function that delete the -Code Behavior- table when the button (Clean Board) is pressed
function cleanB() {
    document.getElementById("print").innerHTML="";
}

//Function that generates the -Code Behavior- table
//where it shows the movements in the form of a matrix to see how the code behaves
//when the button (Get a board) is pressed
function generate_board() {

	document.getElementById("print").innerHTML="";
    var table="<table border=\"2\">";
    table+="<tr><td></td>";
    for(j=0;j<8;j++){ 
        table+="<td>"+(j+1)+ "</td>";
    }
    table+="</tr>";
    
    for(i=0;i<8;i++){
        table+="<tr>";
        table+="<td>"+(i+1)+ "</td>";
        for(j=0;j<8;j++){ 
            table+="<td>"+"team: "+board[i][j][0]+" health: "+board[i][j][1]+" combo: "+board[i][j][2]+ "</td>";
        }
        table+="</tr>";
    }
    table+="</table>";
    document.getElementById("print").innerHTML=table;

}
//Function that paints green the cell it receives in the parameters 
function PaintCellSelection(x, y){
	cell = document.getElementById("c"+x+y);
	cell.style.background = "none repeat scroll 0% 0% green";
	
}

//Variable that ensures that a second click will occur
var secondClick = false;
/*This function receives in the parameters the coordinates of the selected cell , 
  then checks if it is the first click (where the pawn is selected) 
  or the second (where the pawn is already selected and will make the desired movement)*/
function CheckClick(x,y){
	
	if(secondClick){ 
		//If it is the second click, it converts the variable that validates it back to false and calls the function Check_mov where 
		//it gives the parameters of the selected cell
		//Also mark the next player's turn in the html
		Check_mov(x,y);
		secondClick = false;
		play = document.getElementById("player_id").innerHTML ="Player: "+ player;

	}
	if(board[x][y][0] == player && !secondClick){
		/*If it is the first click and turn of the player selected, print the combo that pawn has in the html and also print the last play that was made in the html.
		In the end call the CheckCellPawn function*/
		combo = document.getElementById("combo").innerHTML ="Combo From Pawn Selected: "+ board[x][y][2];
		latestM = document.getElementById("latestM").innerHTML = "Player: "+player +" In position: ["+x+"]["+y+"] With values: "+board[x][y];
		CheckCellPawn(x,y);	
	}
}
/*The function calls a function that paints green the selected cell , assigns the coordinates of the selected cell to the global variables and changes players with the changePlayer function
Finally enable the possibility of a second click*/	
function CheckCellPawn(x,y){

	PaintCellSelection(x, y);
	
	PawnSelected_x = x;
	PawnSelected_y = y;
	
	changePlayer();
	secondClick = true;
}

//Function that only changes the player's turn
function changePlayer(){

	if(player == 1){
		player =2;
	}else{
		player = 1;
	}
}

/*It is the most important function because it validates pawn attacks, 
the requirements to kill an enemy pawn are met, or that a pawn can simply move forward.*/
function Check_mov(x,y){
	//Variable used as a flag to make a move
	SuccessfulMov = false;
	//The pawn data that was previously selected
	id = board[PawnSelected_x][PawnSelected_y][0];
	life = board[PawnSelected_x][PawnSelected_y][1];
	combo = board[PawnSelected_x][PawnSelected_y][2];

	//A subtraction of the coordinates of the selected pawn and the coordinates received by the function is made
	//The difference will be the movement made by the pawn
	dif_x = x - PawnSelected_x;
	dif_y = y - PawnSelected_y;
	
	//It is validated that the movement is joined vertically forward
	if (dif_x == 0 && dif_y == 1) {
		if(board[x][y][0] == 0){//If the cell in front is empty the pawn advances
			SuccessfulMov = true;
		}
		if(board[x][y][0] != 0){ //if not
			if(board[x][y][0]==1){ 
				alert("You can not attack your team");
			}
			/*Validate that the one in front is not your ally
				If the one in front is an enemy and has %50 of life you kill him and your combo increases by one, but you lower %50 of life*/
			if(board[x][y][0]==2){
				if(board[x][y][1] == 50){
					SuccessfulMov = true;
					combo++; //Increase your combo on this pawn
				}
				if(board[x][y][1] == 100){
					board[x][y][1] = 50;
					UpdateBoard();//Update the board
				}
			}
		}
	}

	/*
	Validates that the movement is diagonally to the right and that there is an enemy pawn in the middle of the movement
	If these requirements are met, the enemy pawn dies and you are given another turn.*/
	if(dif_x == 2 && dif_y == 2){
		if(board[PawnSelected_x+1][PawnSelected_y+1][0]==2){
			if(board[x][y][0] == 0){
				board[PawnSelected_x+1][PawnSelected_y+1][0]=0;
				board[PawnSelected_x+1][PawnSelected_y+1][1]=0;
				board[PawnSelected_x+1][PawnSelected_y+1][2]=0;
				SuccessfulMov = true;
				combo++;
				player = 1;
			}	
		}	
	}
	//Validates that the movement is diagonally to the left
	if(dif_x == -2 && dif_y == 2){
		if(board[PawnSelected_x-1][PawnSelected_y+1][0]==2){
			if(board[x][y][0] == 0){
				board[PawnSelected_x-1][PawnSelected_y+1][0]=0;
				board[PawnSelected_x-1][PawnSelected_y+1][1]=0;
				board[PawnSelected_x-1][PawnSelected_y+1][2]=0;
				SuccessfulMov = true;
				combo++;
				player = 1;
			}	
		}	
	}

	//Same as above just changing Y coordinates to negative so that it moves down

	if (dif_x == 0 && dif_y == -1) {
		if(board[x][y][0] == 0){
			SuccessfulMov = true;
		}
		if(board[x][y][0] != 0){
			if(board[x][y][0]==2){
				alert("No puedes atacar a tus aliados");
			}
			if(board[x][y][0]==1){
				if(board[x][y][1] == 50){
					combo++;
					SuccessfulMov = true;
				}
				if(board[x][y][1] == 100){
					board[x][y][1] = 50;
					UpdateBoard();
				}
			}
		}
	}

	if(dif_x == 2 && dif_y == -2){
		if(board[PawnSelected_x+1][PawnSelected_y-1][0]==1){
			if(board[x][y][0] == 0){
				board[PawnSelected_x+1][PawnSelected_y-1][0]=0;
				board[PawnSelected_x+1][PawnSelected_y-1][1]=0;
				board[PawnSelected_x+1][PawnSelected_y-1][2]=0;
				combo++;
				SuccessfulMov = true;
				player = 2;
			}	
		}	
	}

	if(dif_x == -2 && dif_y == -2){
		if(board[PawnSelected_x-1][PawnSelected_y-1][0]==1){
			if(board[x][y][0] == 0){
				board[PawnSelected_x-1][PawnSelected_y-1][0]=0;
				board[PawnSelected_x-1][PawnSelected_y-1][1]=0;
				board[PawnSelected_x-1][PawnSelected_y-1][2]=0;
				combo++;
				SuccessfulMov = true;
				player = 2;
			}	
		}	
	}
	
	/*When the movement is validated as successful, 
	the data of the cell where the pawn was located is deleted and a 
	function is called that assigns the data of the pawn to the cell 
	where the pawn is now*/
	if(SuccessfulMov){
		board[PawnSelected_x][PawnSelected_y][0]=0;
		board[PawnSelected_x][PawnSelected_y][1]=0;
		board[PawnSelected_x][PawnSelected_y][2]=0;
		MovPawn(x,y,id,life,combo);
	}
}

//function that assigns the pawn data to the new cell where it is located
//Valid if the pawn is in the last cell to attack the enemy castle
function MovPawn(x,y,id,life,combo){

	board[x][y][0] = id;
	
	board[x][y][1] = life;
	
	board[x][y][2] = combo;

	/*If the pawn is in the last cell to attack the enemy castle it becomes Kamikase and dies attacking the castle
	The damage that the castle receives is the life of the pawn multiplied by the number of combo that it had*/

	if(y==7 && id == 1){
		CastleP2 -= life*combo;
		board[x][y][0]=0;
		board[x][y][1]=0;
		board[x][y][2]=0;
		latestM = document.getElementById("latestC").innerHTML = "Castle 2 attacked!!";
	}
	if(y==0 && id == 2){
		CastleP1 -= life*combo;;
		board[x][y][0]=0;
		board[x][y][1]=0;
		board[x][y][2]=0;
		latestM = document.getElementById("latestC").innerHTML = "Castle 1 attacked!!";
	}
	//Castle life is rewritten in HTML
	hC1 = document.getElementById("healC1").innerHTML = CastleP1;
	hC2 = document.getElementById("healC2").innerHTML = CastleP2;
	//Update the board
	UpdateBoard();
}


//It contains a chronometer in which when it reaches a certain time it forces the game to end and a winner is decided
function GameOver(){
	//setTimeout is given in milliseconds and when time passes it performs the action that is within the function 
	checkTime= setTimeout(function(){
		/*If player 1's castle life is longer, he wins
		Or if player 2's castle life reaches 0*/
		if(CastleP1 > CastleP2 || CastleP2 == 0){
			//Another function is called by sending strings as parameters
			ShowGameOver("Game Over Player 1 Wins", "Try Again!");	
		}
		/*If player 2's castle life is longer, he wins
		Or if player 1's castle life reaches 0*/
		if(CastleP2 > CastleP1 || CastleP1 == 0){
			ShowGameOver("Game Over Player 2 Wins", "Try Again!");
		}
		//If the life of the two castles is the same, a draw is achieved (peace).
		if(CastleP1 == CastleP2){
			ShowGameOver("Game Over, You Reached Peace", "Try Again!");
		}
	},1000*60*2); // we assign 2 minutes
}

//Function that receives the strings, shows the winner's message in html and enables a button to play again
function ShowGameOver(string_notification, string_button){
	GameOverS = document.getElementById("message");
	GameOverS.style.display = "block";
	Message_GameOver=document.getElementById("notification");
	Message_GameOver=document.getElementById("notification").innerHTML=string_notification;
	Message_GameOver=document.getElementById("button");
	Message_GameOver=document.getElementById("button").innerHTML= string_button;		
	WhiteRestart();
}

//Function that hides the game over message and reloads the html page to play again and the values ​​return to the initials.
function hide_message(){
	message = document.getElementById("message");
	message.style.display = "none";
	document.location.reload();
}

//Main function with which the game is controlled
function match(){
	//Initial game values ​​shown in html
	latestM = document.getElementById("latestM").innerHTML = "Player: "+player ;
	message = document.getElementById("message");
	message.style.display = "none";
	CastleP1=1000;
	CastleP1=1000;
	hC1 = document.getElementById("healC1").innerHTML = CastleP1;
	hC2 = document.getElementById("healC2").innerHTML = CastleP2;
	//It is decided that the player who starts is 1
	player=1; //You can change it to "2" and start player 2
	play = document.getElementById("player_id").innerHTML = "Player: "+ player;
	
	for (i=0; i<8; i++) board[i]= new Array(8); //The multidimensional array is created array[][]

	for (i=0; i<8; i++){
		for (j=0; j<8; j++){
			board[i][j]= new Array(2);//The multidimensional array is created array[][][]
		}
	}
	//The board is cleaned, starting with the initial values
	ClearBoard();
	//The time of the chronometers is returned to zero
	ResetTime();
	//Start the timer at zero
	StarTime();
	//The game ends when the timer reaches the allotted time
	GameOver();
}
//function that makes it possible for the game to start
match();