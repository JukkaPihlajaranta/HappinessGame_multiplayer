const containerGame = document.getElementById('gameContainer');
const moveButtonsRect = document.querySelector('.moveButtons').getBoundingClientRect();
const routeBase = document.querySelector('.routeBase');
const movePlayerButton = document.getElementById('move-player');

let containerRects = document.querySelector('.container').getBoundingClientRect();

//Player and opponent
const player = document.getElementById('player');
const opponentObject_1 = document.getElementById('opponent');
const opponentObject_2 = document.getElementById('opponent2');

//Buttons
const btn_blockingPanel = document.getElementById('btn-blockingPanel');
const btn_blockingPanel_centerTopic = document.getElementById('btn-blockingPanel-centerTopic');
const homeButton = 'homebutton';
const betterHomeButton = 'betterhomebutton';
const barButton = 'barbutton';
const mallButton = 'mallbutton';
const schoolbutton = 'schoolbutton';
const forestButton = 'forestbutton';
const sportsButton = 'sportsbutton';
const churchButton = 'churchbutton';

//Map variables
const playerSizeX = player.clientWidth/2;
const playerSizeY = player.clientHeight/2;
const mapOffSetX = 3;



//Element lists
const elementCount = 56; //must be devided by 8
const elementSize = 40; //element size*size
let allElementsList = []; //not sure if needed
let allRoadElements = [];
let numberOfPlayersForGame = 2;

//ROUTE CALCULATION
let positionToMove; //Set player position to move
let currentRoute = [];
let endPositionFound = false;           //for movement cancelation -- could be local??
let tempPlayerPosition = {x: 0, y: 0}   // temp position
let targetDestination;                  //actual target destination
let playerPos = {x: 0, y: 40}         //player starting pos 


let targetDestinationID = '';           //destination house ID
let currentDestinationID = '';
let tooFarAway = false;    


//ANIMATION
let animationCount = 0;
let playerMoving = false;
let positionsForAnimation; /*= {x: 0, y: 40};*/


//MULTIPLAYER INFO
const chatArea = document.getElementById('chatArea');
const inputChat = document.getElementById('inputChat');
const list_of_players = document.getElementById('list_of_players');
const opponentName1 = document.getElementById('opponentName1');
const opponentName2 = document.getElementById('opponentName2');
let playerGameState = 0;

let opponentJobs = [];
let playerLocalName = '';
let playerId;
let opponentId = [];
let opponentName = [];
let gameId;
let opponentHappiness = [];


let playerNumberInArray;
let opponentNumberInArray = [];

let playerColor;

var socket = io.connect();

    $("#game_ChatState").hide(); //hides the lobby area
    $("#GameArea").hide(); //hides the game area
    $('#enterBtn').click(function() {
        
        const name = $('#playerNameText').val();

        if (name != ''){

            playerLocalName = name;
            $("#startUp_element").hide();
            $("#game_ChatState").show();
            document.getElementById('first_Topic').innerHTML = 'Welcome ' + name + "!";
            
            socket.emit('ToServer_UpdatePlayerName', name);
            socket.emit('ToServer_UpdateWholePlayerList');
        }

    });

    //BUTTONS
    $('#chatBtn').click(function() {
        socket.emit('ToServer_Chat', inputChat.value);
        inputChat.value = '';
    });
    


    //RECEIVE A CHAT
    socket.on('ToClient_updateChat', (data) =>{
        chatArea.innerHTML += `<div>${data}</div>`;
    });


    socket.on('ToClient_readyToPlay', (id) => {
        playerId = id;
       
    });      

    //RECEIVE UPDATED PLAYERLIST
    socket.on('ToClient_UpdateWholePlayerList', (data) => {

        list_of_players.innerHTML = '';

        for (const obj in data){

            //Is game creator and doesn't show the join button
            if (data[obj].isGameCreator && data[obj].thisGameCreatorsList[0] == playerId && data[obj].playerState == 1){
                // console.log(data[obj].thisGameCreatorsList[0], " ", playerId);
                list_of_players.innerHTML += `<div><span style="font-weight:900">${data[obj].playerName}</span> - <span style='color:lime; font-weight:900;'>${data[obj].thisGameCreatorsList.length}/${data[obj].maxPlayers} 
                ready!</span>`;
                // console.log("is the game creator, not showing the button");
            }

            //Show join button next to game creator if client gamestate 0 and gamecreator is not playing
            else if (data[obj].isGameCreator && playerGameState == 0 && data[obj].playerState != 2){
                list_of_players.innerHTML += `<div><span style="font-weight:900">${data[obj].playerName}</span> - <span style='color:lime; font-weight:900;'>${data[obj].thisGameCreatorsList.length}/${data[obj].maxPlayers} 
                 ready!   <button class="btn" onclick="JoinGame('${data[obj].playersGameId}')">Join!</button></span>`;
                //  ${data[obj].playerName}'s game
                //   console.log("show the button");
            }

            else if (data[obj].playerState == 2){

                list_of_players.innerHTML += `<div><span style="font-weight:900">${data[obj].playerName}</span> - <span style='color:blue; font-weight:900;'>is playing!</span>`;
            }

            else if (data[obj].playersGameId != 'none' && data[obj].playerState == 1){
                list_of_players.innerHTML += `<div><span style="font-weight:900">${data[obj].playerName}</span> - <span style='color:lime; font-weight:900;'>assigned to a game!</span>`;
                // console.log("ready for the game");
            }
            else if (data[obj].playerName != ''){
                list_of_players.innerHTML += `<div><span style="font-weight:900">${data[obj].playerName}</span> - <span style='color:orange; font-weight:900;'>hasn't decided yet..</span>`;
            }
            
        }


    });

    function JoinGame(gameId){
        playerGameState = 1;
        // console.log("joined game");
        socket.emit('ToServer_JoinGame', gameId);
    };

    function CreatingGame(amount){
        playerGameState = 1;
        numberOfPlayersForGame = amount;
        socket.emit('ToServer_CreateGame', numberOfPlayersForGame); //CREATE A GAME
        // socket.emit('Update_ServerPlayerNumber', amount); //change status
        socket.emit('ToServer_Chat', "<span style='color:green'>created a game!</span>");
        $("#gameCreateButtons").fadeOut(300);
    };

    
    
    // STARTING THE GAME-----------------------------------------------------------------------
    socket.on("ToClient_StartGame", (data) =>{
        
        //reset these
        playerGameState = 2;
        currentPlayerAttributes = {};
        
        currentPlayerAttributes = {...startingAttributes};
        
        // opponentJobs = []; //list of opponent jobs
        opponentId = [];
        opponentName = [];
        gameId = '';
        opponentObject_1.style.display = "none";
        opponentObject_2.style.display = "none";

        //Erase Opponent 2 information
        opponentName.innerHTML = "N/A";
        opponent_time_text.innerHTML = "N/A";
        opponent_time_bar.style = "width:0%",
        opponent_happiness_text.innerHTML = "N/A";
        opponent_happiness_bar.style = "width:0%",
        opponent_moneyText.innerHTML = "N/A";
        opponent_moneyText.className = "scoreboard-icon";

        opponentName2.innerHTML = "N/A";
        opponent_time_text2.innerHTML = "N/A";
        opponent_time_bar2.style = "width:0%",
        opponent_happiness_text2.innerHTML = "N/A";
        opponent_happiness_bar2.style = "width:0%",
        opponent_moneyText2.innerHTML = "N/A";
        opponent_moneyText2.className = "scoreboard-icon";

        //don't show pictures
        opponent_icon_house.style.display = "none";
        opponent_icon_houselux.style.display = "none";
        // opponent_icon_education.style.display = "none";
        opponent_icon_pet.style.display = "none";
        opponent_icon_relationship.style.display = "none";

        opponent_icon_house2.style.display = "none";
        opponent_icon_houselux2.style.display = "none";
        // opponent_icon_education2.style.display = "none";
        opponent_icon_pet2.style.display = "none";
        opponent_icon_relationship2.style.display = "none";


        //set colors and other info
        playerColor = data.color;
        gameId = data.gameId;
        numberOfPlayersForGame = data.gameMaxPlayers;

        // console.log("wholedata: ", data);
        for(i = 0; i < data.playerNameList.length; i++){
            // const newPlayer = document.createElement('div');
            
            if (data.playerIdList[i] == playerId){ //checks which object is this player
                playerNumberInArray = i;

                player.innerHTML =''; //empty the inner html
                const playerText = document.createElement('div');
                playerText.className = "opponentHoverName";
                playerText.innerHTML = truncate(playerLocalName, 8);
                player.appendChild(playerText);
            }
            else if (data.playerIdList[i] != playerId){

                opponentNumberInArray.push(i);
                opponentId.push(data.playerIdList[i]);
                
                opponentName.push(truncate(data.playerNameList[i], 13));

            }
        }

        
        if (numberOfPlayersForGame > 1){

            opponentName1.innerHTML = `<span style='font-weight:900;color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
            opponentObject_1.style.background = playerColor[opponentNumberInArray[0]];
            
    
            opponentObject_1.innerHTML =''; //empty the inner html
            const opp_text = document.createElement('div');
            opp_text.className = "opponentHoverName";
            opp_text.innerHTML = `<span style='color:${playerColor[opponentNumberInArray[0]]};'>${truncate(opponentName[0], 8)}</span>`;
            opponentObject_1.appendChild(opp_text);
            opponentObject_1.style.display = "block";
    
            if (numberOfPlayersForGame > 2){
                opponentName2.innerHTML = `<span style='font-weight:900;color:${playerColor[opponentNumberInArray[1]]};'>${opponentName[1]}</span>`;
                opponentObject_2.style.background = playerColor[opponentNumberInArray[1]];
    
    
                opponentObject_2.innerHTML =''; //empty the inner html
                const opp_text2 = document.createElement('div');
                opp_text2.className = "opponentHoverName";
                opp_text2.innerHTML = `<span style='color:${playerColor[opponentNumberInArray[1]]};'>${truncate(opponentName[1],8)}</span>`;
                opponentObject_2.appendChild(opp_text2);
                opponentObject_2.style.display = "block";
            }
        }
      
        
        GameStarts();
    });
    
    // ENDS THE GAME-----------------------------------------------------------------------
    socket.on('gameEndsOpponent',() => {
        GameEnds();
    });

    //UPDATES DURING THE GAME-------------------------------------------------------------------
    socket.on('ToClient_OpponentStats', (data) =>{ 

        //if 1 opponent
        if (data.targetId == opponentId[0]){
            
            opponentHappiness[0] = data.happinessPoints;

            // if (currentPlayerAttributes.policeAlert){

            //     if(data.drugs != 0 || data.fakeEducation){
            //         ShowTempMessage(`<span style='color:green'>You were right. There was someone, making illegal actions. ${opponentName[0]} had something illegal going on and is fined now.</span>`, "sms");
            //         currentPlayerAttributes.happinessPoints += 3;
            //         socket.emit('ToServer_ReportPlayer', data.targetId);
            //     }

            //     else {
            //         ShowTempMessage("<span style='color:orange'>There wasn't any illegal going on with anyone. We'll make you accountable for false reporting. Fine is 80€</span>", "rejection");
            //         currentPlayerAttributes.moneyPoints -= 80;
            //         currentPlayerAttributes.happinessPoints -= 5;
            //     }

            //     currentPlayerAttributes.policeAlert = false;
            // }


            

            if (opponentId.length == 1){
                
                //if opponent happiness is bigger
                if (data.happinessPoints > currentPlayerAttributes.happinessTotal){
                    opponentName1.innerHTML = `#1 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
                }
                
                //if happiness smaller
                else if (data.happinessPoints <= currentPlayerAttributes.happinessTotal){
                    opponentName1.innerHTML = `#2 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
                }
                
            }


            if (opponentId.length == 2){

                //if opponent happiness is bigger
                if (data.happinessPoints > currentPlayerAttributes.happinessTotal && data.happinessPoints > opponentHappiness[1]){
                    opponentName1.innerHTML = `#1 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
                }
                
                //in the middle
                else if (data.happinessPoints <= currentPlayerAttributes.happinessTotal && data.happinessPoints > opponentHappiness[1] || data.happinessPoints > currentPlayerAttributes.happinessTotal && data.happinessPoints <= opponentHappiness[1] ){
                    opponentName1.innerHTML = `#2 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
                }

                //last place
                else if (data.happinessPoints < currentPlayerAttributes.happinessTotal && data.happinessPoints < opponentHappiness[1]){
                    opponentName1.innerHTML = `#3 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
                }
            }

            

            opponent_time_text.innerHTML = "Time: " + Math.ceil((data.time/weeklytimeToCompare)*100) + "%";
            
            if (data.time <= 0){
                opponent_time_text.innerHTML = "<span class='optiontext red'>Time's up!</span> ";
            }

            opponent_happiness_text.innerHTML = "Happiness: " + data.happinessPoints + "%";
            data.moneyPoints > currentPlayerAttributes.moneyPoints ? opponent_moneyText.innerHTML = "> than you" : opponent_moneyText.innerHTML = "< than you";
            data.moneyPoints > currentPlayerAttributes.moneyPoints ? opponent_moneyText.className = "UI_text scoreboard red" : opponent_moneyText.className = "UI_text scoreboard green";

            

            anime({
                targets: opponent_happiness_bar,
                width: data.happinessPoints,
                easing: 'linear',
                duration: 500
        
            });
    
            anime({
                targets: opponent_time_bar,
                width: Math.ceil(data.time/weeklytimeToCompare*barWidth),
                easing: 'linear',
                duration: 500
        
            });

            //For that online jobs doensn't show opponent's jobs
            opponentJobs[0] = data.jobsId;

            data.homeId == 0 ?  opponent_icon_house.style.display = "block" : opponent_icon_house.style.display = "none";
            data.homeId == 1 ?  opponent_icon_houselux.style.display = "block" : opponent_icon_houselux.style.display = "none";
            // data.educationId > 1 ?  opponent_icon_education.style.display = "block" : opponent_icon_education.style.display = "none";
            data.petId > 0 ?  opponent_icon_pet.style.display = "block" : opponent_icon_pet.style.display = "none";
            data.relationshipId > 1 ?  opponent_icon_relationship.style.display = "block" : opponent_icon_relationship.style.display = "none";
            
            ColorTimeBar(data.time, opponent_time_bar);
        }

        //if 2 opponents
        if (data.targetId == opponentId[1]){

            opponentHappiness[1] = data.happinessPoints;


            if (opponentId.length == 2){

                //if opponent happiness is bigger
                if (data.happinessPoints > currentPlayerAttributes.happinessTotal && data.happinessPoints > opponentHappiness[0]){
                    opponentName2.innerHTML = `#1 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[1]]};'>${opponentName[1]}</span>`;
                }
                
                //in the middle
                else if (data.happinessPoints <= currentPlayerAttributes.happinessTotal && data.happinessPoints > opponentHappiness[0] || data.happinessPoints > currentPlayerAttributes.happinessTotal && data.happinessPoints <= opponentHappiness[0] ){
                    opponentName2.innerHTML = `#2 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[1]]};'>${opponentName[1]}</span>`;
                }

                //last place
                else if (data.happinessPoints < currentPlayerAttributes.happinessTotal && data.happinessPoints < opponentHappiness[0]){
                    opponentName2.innerHTML = `#3 <span style='font-weight:900;color:${playerColor[opponentNumberInArray[1]]};'>${opponentName[1]}</span>`;
                }
            }

            
            opponent_time_text2.innerHTML = "Time: " + Math.ceil((data.time/weeklytimeToCompare)*100) + "%";


            if (data.time <= 0){
                opponent_time_text2.innerHTML = "<span class='optiontext red'>Time's up!</span> ";
            }

            opponent_happiness_text2.innerHTML = "Happiness: " + data.happinessPoints + "%";
            
            // data.moneyPoints> 0 ? opponent_moneyText2.className = "UI_text scoreboard green" : opponent_moneyText2.className = "UI_text scoreboard red";
            // opponent_moneyText2.innerHTML = data.moneyPoints + "€";
            
            data.moneyPoints > currentPlayerAttributes.moneyPoints ? opponent_moneyText2.innerHTML = "> than you" : opponent_moneyText2.innerHTML = "< than you";
            data.moneyPoints > currentPlayerAttributes.moneyPoints ? opponent_moneyText2.className = "UI_text scoreboard red" : opponent_moneyText2.className = "UI_text scoreboard green";

            anime({
                targets: opponent_happiness_bar2,
                width: data.happinessPoints,
                easing: 'linear',
                duration: 500
        
            });
    
            anime({
                targets: opponent_time_bar2,
                width: Math.ceil(data.time/weeklytimeToCompare*barWidth),
                easing: 'linear',
                duration: 500
        
            });

            //For that online jobs doensn't show opponent's jobs
            opponentJobs[1] = data.jobsId;

            data.homeId == 0 ?  opponent_icon_house2.style.display = "block" : opponent_icon_house2.style.display = "none";
            data.homeId == 1 ?  opponent_icon_houselux2.style.display = "block" : opponent_icon_houselux2.style.display = "none";
            // data.educationId > 1 ?  opponent_icon_education2.style.display = "block" : opponent_icon_education2.style.display = "none";
            data.petId > 0 ?  opponent_icon_pet2.style.display = "block" : opponent_icon_pet2.style.display = "none";
            data.relationshipId > 1 ?  opponent_icon_relationship2.style.display = "block" : opponent_icon_relationship2.style.display = "none";
            
            ColorTimeBar(data.time, opponent_time_bar2);
        }

        
        

    });

    socket.on('ToClient_OpponentEvents', (data) =>{
        
        const newEvent = document.createElement('div');

        if (data.targetId == opponentId[0]){

            newEvent.innerHTML =`<span style='font-weight:700; color:${playerColor[opponentNumberInArray[0]]}'> ${opponentName[0]}</span> ${data.eventText}`;
        }

        else if (data.targetId == opponentId[1]){
            newEvent.innerHTML =`<span style='font-weight:700; color:${playerColor[opponentNumberInArray[1]]}'> ${opponentName[1]}</span> ${data.eventText}`;
        }

        
        opponent_events.appendChild(newEvent);
        // newEvent.scrollIntoView(false);
        opponent_events.scrollTo(0,opponent_events.scrollHeight);
        // console.log(opponent_events.scrollHeight);
    });
  
    socket.on('ToClient_OpponentMovement', (data) =>{
        
        let movingOpp = null;

        if (data.movingPlayerId == opponentId[0]){
            movingOpp = opponentObject_1;
        }

        else if (data.movingPlayerId == opponentId[1]){
            movingOpp = opponentObject_2;
        }

        anime({
            targets: movingOpp,
            translateX: data.x,
            translateY: data.y,
            easing: 'linear',
            duration: 500
        });

        // if (numberOfPlayersForGame > 2){
        //     anime({
        //         targets: opponentObject_2,
        //         translateX: data.x,
        //         translateY: data.y,
        //         easing: 'linear',
        //         duration: 500
        //     });
        // }

    });

    socket.on('ToClient_NewWeek', () =>{
    
        weeklyChangeEvents = [];
        currentPlayerAttributes.weeklyTime = weeklytimeToCompare;

        //Month change
        if ( currentPlayerAttributes.weekNumber % 4 == 0){
            // console.log("month has changed.");
 
            // if (currentPlayerAttributes.rentToDue){ 
            //     ShowTempMessage("New month and new things! <span style='color:salmon;'>If you didn't pay your rent, cost has been doubled and credited from your bank account.</span>", 
            //     "sms");
                
            // }
            // else{ 
                
            // }
            weeklyChangeEvents.push(`New moon!`);
            
            //Monthly changes
            currentPlayerAttributes.gymTimes = 10; // out 10 gym times
            currentPlayerAttributes.rentToDue = true;
            weeklyChangeEvents.push('rentToDue');
        }


        
        if (currentPlayerAttributes.weekNumber % 4 != 0){
            
            weeklyChangeEvents.push(`New week and new things!`);
            Rent_WeekChange();
            
        }

        Relationship_WeekChange();
        Work_WeekChange();
        Lottery_WeekChange();



        currentPlayerAttributes.forestHappiness = 1;
        currentPlayerAttributes.internetHappiness = 1;
        currentPlayerAttributes.exerciseLvl = 0;
        currentPlayerAttributes.currentYogaEnhancer = 0;
        currentPlayerAttributes.beautyFactor = 0;
        currentPlayerAttributes.barGig = true;
        currentPlayerAttributes.mallActions = 1;
        currentPlayerAttributes.newlyMet = false;
        currentPlayerAttributes.schoolAction = 0;
        currentPlayerAttributes.lotteryTickets = 0;
        currentPlayerAttributes.volunteerTime = 2;
        currentPlayerAttributes.weeklyUnemployedPay = true;

        PutLocalEvent(0,0,"newWeek"); //putting new event to event checker
        
        currentPlayerAttributes.weekNumber++;
        
        ManageMoveButtons('off');
        
        Messages_WeekChange(weeklyChangeEvents); //show messages for new week
        ReduceTime_Check(0);



        currentPlayerAttributes.randomForRenting = Math.floor(Math.random()*3); //randomizes renting options

        if (currentPlayerAttributes.happinessTotal >= 100 ){

            const winnerData = {
                gameId: gameId,
                playerId: playerId,
                playerLocalName, playerLocalName,
                opponentId: opponentId,
                happinessPoints: currentPlayerAttributes.happinessTotal
            }

            // const winnerdata = [playerId, playerLocalName, opponentId];
            socket.emit('ToServer_GameWinner', winnerData);
            GameEnds();
            socket.emit('ToServer_ChatWinner', winnerData);
            
        }
        
        
        

    });


    
    //Players competing
    socket.on('ToClinet_CheckIllegals', (serverData) => {

        // let returnData = {};

        if (currentPlayerAttributes.drugs > 0 || currentPlayerAttributes.fakeEducation){

            ShowTempMessage(`<span style='color:salmon'>You're fined of breaking the law. This is bad. No no nooo...<br>
            You will lose your job, if you have one.</span>`, "sms");
            currentPlayerAttributes.moneyPoints -= 110;
            currentPlayerAttributes.happinessPoints -= 8;
    
            //unemploy
            currentPlayerAttributes.drugs = 0;
            currentPlayerAttributes.currentWorkId = 0;
            currentPlayerAttributes.fakeEducation = false;
    
            //decerase education
            currentPlayerAttributes.educationId = 0 ? currentPlayerAttributes.educationId = 0 : currentPlayerAttributes.educationId--;
            
            const returnData = {
                returnPlayer: serverData,
                affectedPlayerId: playerId,
                affectedPlayerName: playerLocalName
            }
             
            
            //send playerId
            socket.emit('ToServer_ReportResult', (returnData));
            ReduceTime_Check(0);
        }

        else {
            //send empty
            const returnData = {
                returnPlayer: serverData
            }

            socket.emit('ToServer_ReportResult', (returnData));
        }


        
    });

    socket.on('ToClinet_ReportResult', (data) => {

        if (numberOfPlayersForGame == 2){
            if (data != null){
                ShowTempMessage(`<span style='color:lime'>You were right. There was someone, making illegal actions. <span style='color:orange'>${opponentName[0]}</span> had something illegal going on and is fined now.</span>`, "sms");
                currentPlayerAttributes.happinessPoints += 3;
            }
    
            else{
                ShowTempMessage("<span style='color:orange'>There wasn't any illegal going on with anyone. We'll make you accountable for false reporting. Fine is 80€</span>", "rejection");
                currentPlayerAttributes.moneyPoints -= 80;
                currentPlayerAttributes.happinessPoints -= 5;
            }

            ReduceTime_Check(0);
        }

        else if (numberOfPlayersForGame == 3){
            console.log(data);
        }



    });

    function CheckPlayerIllegalActions(){

        const package = {
            gameId: gameId,
            playerId: playerId
        };

        socket.emit('ToServer_CheckIfPlayersGuilty', (package));
    };

    function InitiateTheHit(hitInfo){

        const targetId = hitInfo[0];

        socket.emit('ToServer_OrderedHit', targetId);
    };

    socket.on('ToClient_OrderedHit', () => {
        currentPlayerAttributes.happinessPoints -= 15;
        ShowTempMessage('<span style="color:salmon">You have been hit by someone. Your happiness has decreased.</span>', 'sms');
        ReduceTime_Check(0);
    });


//THE GAME STARTS------------------------------------------------------------------
function GameStarts(){
    $("#game_ChatState").hide();
    // $("#game_ChatState").fadeOut(500);
    $("#GameArea").fadeIn(1000);

    // console.log("Current players: ", currentPlayers)
    // $("#GameArea").show();
    StartGame();
    SetInfoBoxPosition();
    
}

function GameEnds(){
    containerGame.innerHTML = '';               //container hidden

    $("#GameArea").hide();                      //game are hide
    $("#game_ChatState").show();                //lobby things
    $("#gameCreateButtons").slideDown(300);     //game create buttons
    
    socket.emit('ToServer_PlayerNotReady');
    socket.emit('ToServer_Chat', `Happiness: ${currentPlayerAttributes.happinessTotal}%. grats to winner`);
    playerGameState = 0;
}

function OpponentUpdates(){
    
    //INFORMATION TO OPPONENT => info to sent out
    const tempPackage = {
        opponentId: opponentId,
        happinessPoints: currentPlayerAttributes.happinessTotal,
        time: currentPlayerAttributes.weeklyTime,
        moneyPoints: currentPlayerAttributes.moneyPoints,
        homeId: currentPlayerAttributes.homeID,
        educationId: currentPlayerAttributes.educationId,
        petId: currentPlayerAttributes.petID,
        relationshipId: currentPlayerAttributes.relationshipID,
        
        //do not show to opponent
        jobsId: jobs[currentPlayerAttributes.currentWorkId].id,

        //illegals
        fakeEducation: currentPlayerAttributes.fakeEducation,
        drugs: currentPlayerAttributes.drugs
    }
    
   
    if (numberOfPlayersForGame > 1){
        socket.emit('ToServer_OpponentStats', (tempPackage));
    }
}

function OpponentEvents(eventText){

    const tempPackage = {
        opponentId: opponentId,
        eventText: eventText,
    }

    if (numberOfPlayersForGame > 1){
        socket.emit('ToServer_OpponentEvents', (tempPackage));
    }
    
}

function OpponentMovement(opponentMove){
    if (numberOfPlayersForGame > 1){
    socket.emit('ToServer_OpponentMovement', (opponentMove));
    }
}

function OpponentEndOfWeek(){

    const package = {
        gameId: gameId,
        playerId: playerId
    }

    socket.emit('ToServer_OpponentWeeklyTimeCheck', (package));
}


//ACTUAL GAME-----------------------------------------------------------------------------------------------

function StartGame(){
    allElementsList = [];
    allRoadElements = [];
    positionsForAnimation = undefined;
    animationCount = 0;
    
    
    // homeButton.removeEventListener('click');
    // homeButton.className = "moveButton active";
    // betterHomeButton.removeEventListener();
    // betterHomeButton.className = "moveButton";
    // barButton.removeEventListener('click');
    // barButton.className = "moveButton";
    // mallButton.removeEventListener('click');
    // mallButton.className = "moveButton";
    // schoolbutton.removeEventListener('click');
    // schoolbutton.className = "moveButton";
    // forestButton.removeEventListener('click');
    // forestButton.className = "moveButton";
    // sportsButton.removeEventListener('click');
    // sportsButton.className = "moveButton";
    // churchButton.removeEventListener('click');
    // churchButton.className = "moveButton";

    const container = document.querySelector('.container');
    let count = 0;
    container.innerHTML = '';

    positionToMove = undefined;
    currentRoute = [];
    endPositionFound = false;
    tempPlayerPosition = {x: 0, y: 0};
    targetDestination = undefined;
    playerPos = {x: 0, y: 40};

    // console.log("playerPos", playerPos);
    // console.log("targetDestination", targetDestination);
    // console.log("tempPlayerPosition", tempPlayerPosition);
    // console.log("endPositionFound", endPositionFound);
    // console.log("currentRoute", currentRoute);
    // console.log("positionToMove", positionToMove);

    for (var i = 0; i < elementCount; i++) { 

        count++;
        CreateMap(container, count);
          
    }

    window.scrollTo(0,0);
    containerRects = document.querySelector('.container').getBoundingClientRect();

    let tempPos = {
        x: document.getElementById("block-9").getBoundingClientRect().x - containerRects.x,
        y: document.getElementById("block-9").getBoundingClientRect().y - containerRects.y
    }


    targetDestinationID = "Home";
    console.log("first pos: ", tempPos);
    MovePlayer(tempPos);
    ChooseDirection(targetDestinationID);
    $(movePlayerButton).fadeOut(0);
    

};

//Creating the current map
function CreateMap(container, count){

    const containerElement = document.createElement('div');    
    containerElement.className = "mapElement";
    // const rand = Math.floor(Math.random()*10)
    let tempRoadElementArray = [];

    function CreateMapElement(pictureName, count){
        containerElement.id = "block-" + count;
        
        const image = document.createElement('img');
        image.src = "./img/" + pictureName;
        image.setAttribute('height', elementSize);

        containerElement.appendChild(image);
        // containerElement.innerHTML += '<div class="temp_text">'+count+'</div>';
        tempRoadElementArray.push(containerElement.id);
    }

    function CreateButtonElement(containerElement, buttonID){
        //Adds event listener


        document.getElementById(buttonID).addEventListener('click', () =>{

            if (!playerMoving){
                window.scrollTo(0,0);
                containerRects = document.querySelector('.container').getBoundingClientRect();

                //Gets the element position below
                const index = allElementsList.findIndex( (x) => {return x == containerElement.id});
                positionToMove = document.getElementById(allElementsList[index+8]).getBoundingClientRect();
                
                //checks if some button is already selected
                const activeButton = document.querySelector('.moveButton.active');
                if (activeButton != null){
                    activeButton.className = "moveButton";
                }
                
                $(infoboxObj).slideUp(500);
                document.getElementById(buttonID).className = "moveButton active";


                routeBase.innerHTML = '';
                targetDestinationID = containerElement.id;
                // console.log(containerRects);
                if (currentDestinationID != targetDestinationID){
                    ShowRoute_NewTry(positionToMove, allElementsList[index+8]); //send actual container element name ==> +8
                    TrackPoints();
                    if (!tooFarAway){
                        $(movePlayerButton).fadeIn(300);
                    }
                    
                }

                else if(currentDestinationID == targetDestinationID){
                    ChooseDirection(currentDestinationID);
                    $(movePlayerButton).fadeOut(300);
                }
            
            }

        });
    }

    //Different buildings
    if (count == 2 || count == 3 || count == 21 || 
        count == 35 || count == 36 || count == 37 || count == 50){


        const image = document.createElement('img');
        const rand = Math.floor(Math.random()*3)
        if (rand == 2){
            image.src = "./img/Building_Basic.png";
        }
        else {
            image.src = "./img/Building_Basic.png";
        }

        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);
        
        containerElement.id = "Obstacle";
        


    }

    else if (count == 14 || count == 19 || count == 49){
        const image = document.createElement('img');
        image.src = "./img/Building_Basic_LeftEnd.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);
        containerElement.id = "Obstacle";
    }

    else if (count == 38 || count == 51 || count == 15){
        const image = document.createElement('img');
        image.src = "./img/Building_Basic_RightEnd.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);
        containerElement.id = "Obstacle";
    }





    //STARTING HOME-----------------------------------------------------
    else if (count == 1){
        containerElement.id = "Home";
        // containerElement.className = "box interactive";
        const image = document.createElement('img');
        image.src = "./img/Normal_House.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, homeButton);
    }

    //CHURCH---------------------------------------------- 
    else if (count == 4){
        containerElement.id = "Church"; //CHANGE---------------------------------
        const image = document.createElement('img');
        image.src = "./img/Building_Church.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, churchButton);
    }

    //BETTER APARTMENT
    else if (count == 17){
        containerElement.id = "BetterHome";
        const image = document.createElement('img');
        image.src = "./img/BetterHouse.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, betterHomeButton);
    }

    //SCHOOL-------------------------------------------------------
    else if (count == 20){
        containerElement.id = "School";
        const image = document.createElement('img');
        image.src = "./img/Building_School.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, schoolbutton);
    }


    //FOREST ---------------------------------------------------------
    else if (count == 23){
        containerElement.id = "Forest";
        const image = document.createElement('img');
        image.src = "./img/Building_Forest.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, forestButton);
    }

    //FOREST2
    else if (count == 22){
        containerElement.id = "Obstacle";
        const image = document.createElement('img');
        image.src = "./img/Building_Forest.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);
    }

    //SPORTS
    else if (count == 48){
        containerElement.id = "Sports";
        const image = document.createElement('img');
        image.src = "./img/Building_Sports.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, sportsButton);
    }
    //SPORTS FIELD
    else if (count == 40){
        const image = document.createElement('img');
        image.src = "./img/Building_Sports2.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);
        containerElement.id = "Obstacle";
    }


    //BAR------------------------------------------------------------
    else if (count == 34){
        containerElement.id = "Bar";
        const image = document.createElement('img');
        image.src = "./img/Building_Bar.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, barButton);
    }

    //MALL -----------------------------------------------------
    else if (count == 46){
        
        containerElement.id = "Mall";
        const image = document.createElement('img');
        image.src = "./img/Building_MallRight.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, mallButton);

    }

    //MALL LEFT PART -----------------------------------------------------
    else if (count == 45){
        
        containerElement.id = "Building";
        const image = document.createElement('img');
        image.src = "./img/Building_MallLeft.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        // CreateButtonElement(containerElement, postButton);

    }

    //VERTICAL ROAD END RIGHT OPEN
    else if (count == 9){
        CreateMapElement("roadHorizontalEnd_Rightopen.png", count);
    }

    //VERTICAL ROAD END LEFT OPEN
    else if (count == 56){
        CreateMapElement("roadHorizontalEnd_Leftopen.png", count);
    }

    //VERTICAL CROSSING DOWN
    else if (count == 10 || count == 31){
        CreateMapElement("roadcrossing_verticaldown.png", count);
    }

    //VERTICAL CROSSING UP
    else if (count == 26 || count == 55){
        CreateMapElement("roadcrossing_verticalup.png", count);
    }

    //RIGHT DOWN
    else if (count == 5 || count == 25){
        CreateMapElement("road_rightdown.png", count);
    }

    //RIGHT UP
    else if (count == 52 || count == 41){
        CreateMapElement("road_rightup.png", count);
    }

    //LEFT DOWN
    else if (count == 8 || count == 44){
        CreateMapElement("road_leftdown.png", count);
    }

    //LEFT UP
    else if (count == 13 || count == 32){
        CreateMapElement("road_leftup.png", count);
    }

    //VERTICAL ROADS
    else if (count == 16 || count == 18 || count == 24 || count == 33 || count == 39 || count == 47){
        CreateMapElement("roadVertical.png", count);
    }
    
    
    else{
        CreateMapElement("roadHorizontal.png", count);
        containerElement.id = "block-" + count;
       

        
    }
    allElementsList.push(containerElement.id);
    container.appendChild(containerElement);
    
    

    tempRoadElementArray.forEach(el => {
        allRoadElements.push({
            id: el,
            x: document.getElementById(el).getBoundingClientRect().x,
            y: document.getElementById(el).getBoundingClientRect().y
            });

    })
    // console.log(allRoadElements);

}


//SEARCH PATH BUTTON
// document.getElementById('add-step-path').addEventListener('click', () =>{
    
//     TrackPoints();
// })


function ChangeTempPlayerPos(elementPos){
    tempPlayerPosition.x = elementPos.x - containerRects.x;
    tempPlayerPosition.y = elementPos.y - containerRects.y;
    
}


function ShowRoute_NewTry(destination, destinationID){
    
    // targetDestinationID = destinationID;
    
    // distanceOfElements = [];
    positionsForAnimation = [];
    currentRoute = [];
    currentRoute = allRoadElements.slice();
    // console.log("destination id: ", destinationID);
    endPositionFound = false;

    targetDestination  = {
        destinationName: destinationID,
        x: destination.x - containerRects.x, 
        y: destination.y - containerRects.y
    };

    

    tempPlayerPosition = {x: playerPos.x, y: playerPos.y};



    //removes players current standing block from the list
    for (var i = 0; i < currentRoute.length; i++){
        if ((ClosestBlocks(document.getElementById(currentRoute[i].id).getBoundingClientRect(), tempPlayerPosition) == 0)){
            // console.log(currentRoute[i].id);
            currentRoute.splice(i, 1);
        }
    }
    
}


function TrackPoints(){

    let count = 0;
    
    while(!endPositionFound){
        count++;
        
        if (count > 30){
            endPositionFound = true;
        }
        let shortestDistance = [];



        currentRoute.forEach(el =>{
            // console.log(el.id, "  ",  document.getElementById(el.id).getBoundingClientRect(), "  ", tempPlayerPosition);
            if (ClosestBlocks(document.getElementById(el.id).getBoundingClientRect(), tempPlayerPosition) == 1){
                    // console.log("FOUND ELEMENT: ", el.id, " X distance: ", Math.abs((el.x - containerRects.x -targetDestination.x)/elementSize), " Y distance: ", Math.abs((el.y- containerRects.y-targetDestination.y)/elementSize));
                    shortestDistance.push({
                            id: el.id,
                            x: el.x,
                            y: el.y,
                            distX: Math.abs((el.x - containerRects.x - targetDestination.x)/elementSize), 
                            distY: Math.abs((el.y - containerRects.y - targetDestination.y)/elementSize)
                            });
    
            }
        });
        // console.log(shortestDistance);
        
        let firstOne = shortestDistance[0];
        
        
        //checks if current value is in the array
        function checkSameValues(array){
            return array.distY == firstOne.distY;
        }
    
        if (shortestDistance.length > 1){
            
            if (shortestDistance.every(checkSameValues)){
                //same Y values, so checking shortest X
                // console.log("X triggered!");
                for (var i = 0; i < shortestDistance.length; i++){
                    // console.log(shortestDistance[i].id + " Xs: " + shortestDistance[i].distX +" < " + firstOne.distX);
                    if (Math.abs(shortestDistance[i].distX) <  Math.abs(firstOne.distX)){
                        
                        firstOne = shortestDistance[i]
                        // console.log("Changing for X:" + firstOne);        
                    }
                }
            }
        
            else{
                for (var i = 0; i < shortestDistance.length; i++){
                    // console.log("Checking Y");
                    // console.log(shortestDistance[i].id + "Ys: " + shortestDistance[i].distY +" < " + firstOne.distY);
                    if (Math.abs(shortestDistance[i].distY) <  Math.abs(firstOne.distY)){
                        firstOne = shortestDistance[i]
                    }
                }
            }
        }
    

        // if (firstOne.x == undefined){
        //     console.log("error in movement!");
        //     return;
        // }

        //adding to animation array
        positionsForAnimation.push({
            x: firstOne.x - containerRects.x-5, 
            y: firstOne.y - containerRects.y -40,
        });



        ChangeTempPlayerPos(firstOne);
        let index;
        for (var i = 0; i < currentRoute.length; i++){
            if (currentRoute[i].id == firstOne.id){
                index = i;
            }
        }
        currentRoute.splice(index, 1);
        
        // console.log("Distance: " + ClosestBlocks(document.getElementById(targetDestination.destinationName).getBoundingClientRect(), tempPlayerPosition));
        if (ClosestBlocks(document.getElementById(targetDestination.destinationName).getBoundingClientRect(), tempPlayerPosition) == 0 && (positionsForAnimation.length * 0.2) < currentPlayerAttributes.weeklyTime){
            // console.log("Destination!");
            endPositionFound = true;
            DrawDots(firstOne.id, 'end');
            tooFarAway = false;
            return;
        }

        

        if ((positionsForAnimation.length * 0.2) >= currentPlayerAttributes.weeklyTime){
            // console.log(positionsForAnimation.length * 0.2, "  ", currentPlayerAttributes.weeklyTime);
            DrawDots(firstOne.id, "red");
            tooFarAway = true;

            if (ClosestBlocks(document.getElementById(targetDestination.destinationName).getBoundingClientRect(), tempPlayerPosition) == 0) {
                $(movePlayerButton).hide();
                endPositionFound = true;
                ReduceTime_Check(3);
            }
            
        }

        else{
            DrawDots(firstOne.id);
        }

        
    } //end of while
    // let tempX = (firstOne.x - containerRects.x) -playerPos.x;
    // let tempY = (firstOne.y - containerRects.y) -playerPos.y;
    // console.log("X: ", tempX, " |  Y: ", tempY);

    // anime({
    //     targets: player,
    //     translateX: tempX, 
    //     translateY: tempY,
    //     easing: 'linear',
    //     duration: 500
    // });
    // console.log("PlayerPos X: ", player.getBoundingClientRect().x, " | PlayerPos Y: ", player.getBoundingClientRect().y);

    
}


function ClosestBlocks(elementPos, playerRunningPos){


    //CALCULATING THE DISTANCE FROM START POINT
    const distanceX = (Math.abs((elementPos.x - containerRects.x) - playerRunningPos.x))/elementSize;
    const distanceY = (Math.abs((elementPos.y - containerRects.y) - playerRunningPos.y))/elementSize;

    // console.log(distanceX, distanceY);

    return distanceX+distanceY;
    
    
}


//MOVE BUTTON
document.getElementById('move-player').addEventListener('click', () =>{
    
    MovePlayer(targetDestination);
    
    
});

function MovePlayer(position){
    playerMoving = true;
    $(movePlayerButton).fadeOut(300);

    //MOVE TO NEW POSITION
    const newPosX = position.x;
    const newPosY = position.y;

    
    routeBase.innerHTML = '';
    
    playerPos.x = newPosX;
    playerPos.y = newPosY;

    randomizeNewOnlineContent = true;
    currentDestinationID = targetDestinationID;
    ManageMoveButtons('playerMovement'); //disable buttons
    // var intervalSetter = null;

    //in the start if there isn't position
    if (positionsForAnimation == undefined){
        player.style.transform = `translate3d(0px, 0px, 0)`;
        opponentObject_1.style.transform = `translate3d(0px, 0px, 0)`;
        opponentObject_2.style.transform = `translate3d(0px, 0px, 0)`;

        player.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/3) - playerSizeY}px, 0)`;
        opponentObject_1.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/3) - playerSizeY}px, 0)`;
        opponentObject_2.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/3) - playerSizeY}px, 0)`;
        playerMoving = false;
        // console.log(newPosX, " ", newPosY);
    }

    
    else{
        animationCount = 0;
        // console.log("Start");
        animationInterval = setInterval(function(){
            if (animationCount < positionsForAnimation.length){
                ShowMoveAnimation();
            }
            else{
                clearInterval(animationInterval);
            }
            // console.log("interval going on");
        }, 500);

        // console.log("end");

    }
}

function ShowMoveAnimation(){

    const tempXPos = positionsForAnimation[animationCount].x;
    const tempYPos = positionsForAnimation[animationCount].y;

    const opponentMove = {
        opponentId: opponentId, //which opponents to send (array)
        x: tempXPos,            //x movement
        y: tempYPos             //y movement
    }
    // - containerRects.height - moveButtonsRect.height

    OpponentMovement(opponentMove);
    ReduceTime_Check(0.2);

    anime({
        targets: player,
        translateX: tempXPos,
        translateY: tempYPos,
        easing: 'linear',
        duration: 500
    });
    animationCount++;

    if (animationCount ==  positionsForAnimation.length){

        ManageMoveButtons('off');
        ChooseDirection(targetDestinationID);
        playerMoving = false;
    }
    
    // player.addEventListener("transitionend", function(){
    //     console.log("anim has ended.");
    // })
}


function DrawDots(el, endDot){

    if (endDot == "end"){
        const temp = document.createElement('img');
        const desiredX = document.getElementById(el).getBoundingClientRect().x - containerRects.left + elementSize/2-2;
        const desiredY = document.getElementById(el).getBoundingClientRect().y - containerRects.height - containerRects.top +14/*-8+ elementSize/3*/;
        temp.src = "./img/icons/x-mark.png"
        temp.className = "end-dot";
        temp.style.transform = `translate3d(${desiredX}px, ${desiredY}px, 0)`;
        routeBase.appendChild(temp);

    }

    else if(endDot == 'red'){
        const temp = document.createElement('div');
        const desiredX = document.getElementById(el).getBoundingClientRect().x - containerRects.left + elementSize/2-2;
        const desiredY = document.getElementById(el).getBoundingClientRect().y - containerRects.height - containerRects.top +17/*-5 + elementSize/2.5*/;
        
        temp.className = "route-dots red";
        temp.style.transform = `translate3d(${desiredX}px, ${desiredY}px, 0)`;
        routeBase.appendChild(temp);

    }

    else{
        const temp = document.createElement('div');
        const desiredX = document.getElementById(el).getBoundingClientRect().x - containerRects.left + elementSize/2-2;
        const desiredY = document.getElementById(el).getBoundingClientRect().y - containerRects.height - containerRects.top +17/*-5 + elementSize/2.5*/;
        
        temp.className = "route-dots";
        temp.style.transform = `translate3d(${desiredX}px, ${desiredY}px, 0)`;
        routeBase.appendChild(temp);
    }

}

function PutLocalEvent(color, text, newWeek) {

    if (newWeek == "newWeek"){
        const newEvent = document.createElement('div');
        
        newEvent.innerHTML =`<span style='font-weight:700; color:lime'>-=New week=-</span>`;
        
        opponent_events.appendChild(newEvent);

    }
    else{
        const newEvent = document.createElement('div');
        
        newEvent.innerHTML =`<span style='font-weight:700'>You</span> <span style='color:${color}'>${text}</span>`;
        
        opponent_events.appendChild(newEvent);
    }

}

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

