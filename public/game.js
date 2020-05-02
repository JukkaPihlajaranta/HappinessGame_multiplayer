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

let playerLocalName = '';
let playerId;
let opponentId = [];
let opponentName = [];
let gameId;

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
                list_of_players.innerHTML += `<div><span style="font-weight:900">${data[obj].playerName}</span> - <span style='color:red; font-weight:900;'>hasn't decided yet..</span>`;
            }
            
        }


    });

    function JoinGame(gameId){
        playerGameState = 1;
        // console.log("joined game");
        socket.emit('ToServer_JoinGame', gameId);
    }

    function CreatingGame(amount){
        playerGameState = 1;
        numberOfPlayersForGame = amount;
        socket.emit('ToServer_CreateGame', numberOfPlayersForGame); //CREATE A GAME
        // socket.emit('Update_ServerPlayerNumber', amount); //change status
        socket.emit('ToServer_Chat', "<span style='color:green'>created a game!</span>");
        $("#gameCreateButtons").fadeOut(300);
    }

    // socket.on('ToClient_UpdatePlayerList', (data) =>{
        
    //     //this is the player list, join game buttons and player who are ready
    //     list_of_players.innerHTML = 'Welcome to lobby';

    //     for(var i = 0; i < data.gamePlayerList.length; i++){
    //         if (data.gamePlayerList[i] != ''){
    //             list_of_players.innerHTML += `<div><span style="font-weight:900">${data.gamePlayerList[i]}</span> <span style='color:lime; font-weight:900;'>${data.id.length}/${numberOfPlayersForGame} ready!</span>`;

    //         }
    //         else{
    //             list_of_players.innerHTML += `<div><span style="font-weight:900">${data[i].gamePlayerList}</span>`;
    //         }
    //     }

    // });



    
    // STARTING THE GAME-----------------------------------------------------------------------
    socket.on("ToClient_StartGame", (data) =>{
        
        //reset these
        playerGameState = 2;
        currentPlayerAttributes = startingAttributes;

        opponentId = [];
        opponentName = [];
        gameId = '';
        opponentObject_2.style.display = "none";

        //Erase Opponent 2 information
        opponentName2.innerHTML = "N/A";
        opponent_time_text2.innerHTML = "N/A";
        opponent_time_bar2.style = "width:0%",
        opponent_happiness_text2.innerHTML = "N/A";
        opponent_happiness_bar2.style = "width:0%",
        opponent_moneyText2.innerHTML = "N/A";
        opponent_moneyText2.className = "scoreboard-icon";

        //don't show pictures
        opponent_icon_house2.style.display = "none";
        opponent_icon_houselux2.style.display = "none";
        opponent_icon_education2.style.display = "none";
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
                playerText.innerHTML = playerLocalName;
                player.appendChild(playerText);
            }
            else if (data.playerIdList[i] != playerId){

                opponentNumberInArray.push(i);
                opponentId.push(data.playerIdList[i]);
                
                opponentName.push(truncate(data.playerNameList[i], 13));

            }
        }

        player.style.background = playerColor[playerNumberInArray];
        
        opponentName1.innerHTML = `<span style='font-weight:900;color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
        opponentObject_1.style.background = playerColor[opponentNumberInArray[0]];
        

        opponentObject_1.innerHTML =''; //empty the inner html
        const opp_text = document.createElement('div');
        opp_text.className = "opponentHoverName";
        opp_text.innerHTML = `<span style='color:${playerColor[opponentNumberInArray[0]]};'>${opponentName[0]}</span>`;
        opponentObject_1.appendChild(opp_text);

        if (numberOfPlayersForGame > 2){
            opponentName2.innerHTML = `<span style='font-weight:900;color:${playerColor[opponentNumberInArray[1]]};'>${opponentName[1]}</span>`;
            opponentObject_2.style.background = playerColor[opponentNumberInArray[1]];


            opponentObject_2.innerHTML =''; //empty the inner html
            const opp_text2 = document.createElement('div');
            opp_text2.className = "opponentHoverName";
            opp_text2.innerHTML = `<span style='color:${playerColor[opponentNumberInArray[1]]};'>${opponentName[1]}</span>`;
            opponentObject_2.appendChild(opp_text2);
            opponentObject_2.style.display = "block";
        }

      
        
        GameStarts();
    });

    //UPDATES DURING THE GAME-------------------------------------------------------------------
    socket.on('ToClient_OpponentStats', (data) =>{

        if (data.targetId == opponentId[0]){
            opponent_time_text.innerHTML = "Time: " + Math.ceil((data.time/weeklytimeToCompare)*100) + "%";


            if (data.time <= 0){
                opponent_time_text.innerHTML = "<span class='optiontext red'>Time's up!</span> ";
            }

            opponent_happiness_text.innerHTML = "Happiness: " + data.happinessPoints + "%";
            opponent_moneyText.innerHTML = data.moneyPoints + "€";
            data.moneyPoints> 0 ? opponent_moneyText.className = "UI_text scoreboard green" : opponent_moneyText.className = "UI_text scoreboard red";

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

            

            data.homeId == 0 ?  opponent_icon_house.style.display = "block" : opponent_icon_house.style.display = "none";
            data.homeId == 1 ?  opponent_icon_houselux.style.display = "block" : opponent_icon_houselux.style.display = "none";
            data.educationId > 1 ?  opponent_icon_education.style.display = "block" : opponent_icon_education.style.display = "none";
            data.petId > 0 ?  opponent_icon_pet.style.display = "block" : opponent_icon_pet.style.display = "none";
            data.relationshipId > 0 ?  opponent_icon_relationship.style.display = "block" : opponent_icon_relationship.style.display = "none";
            
            ColorTimeBar(data.time, opponent_time_bar);
        }

        else if (data.targetId == opponentId[1]){
            
            opponent_time_text2.innerHTML = "Time: " + Math.ceil((data.time/weeklytimeToCompare)*100) + "%";


            if (data.time <= 0){
                opponent_time_text2.innerHTML = "<span class='optiontext red'>Time's up!</span> ";
            }

            opponent_happiness_text2.innerHTML = "Happiness: " + data.happinessPoints + "%";
            
            data.moneyPoints> 0 ? opponent_moneyText2.className = "UI_text scoreboard green" : opponent_moneyText2.className = "UI_text scoreboard red";
            opponent_moneyText2.innerHTML = data.moneyPoints + "€";
    

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

            data.homeId == 0 ?  opponent_icon_house2.style.display = "block" : opponent_icon_house2.style.display = "none";
            data.homeId == 1 ?  opponent_icon_houselux2.style.display = "block" : opponent_icon_houselux2.style.display = "none";
            data.educationId > 1 ?  opponent_icon_education2.style.display = "block" : opponent_icon_education2.style.display = "none";
            data.petId > 0 ?  opponent_icon_pet2.style.display = "block" : opponent_icon_pet2.style.display = "none";
            data.relationshipId > 0 ?  opponent_icon_relationship2.style.display = "block" : opponent_icon_relationship2.style.display = "none";
            
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
    
        currentPlayerAttributes.weeklyTime = weeklytimeToCompare;

        //Month change
        if (currentPlayerAttributes.weekNumber % 4 == 0){
            // console.log("month has changed.");
 
            if (currentPlayerAttributes.rentToDue){ 
                ShowTempMessage("New month and new things! <span style='color:salmon;'>If you didn't pay your rent, cost has been doubled and credited from your bank account.</span>", 
                "sms");
                currentPlayerAttributes.moneyPoints -= rentHomes[currentPlayerAttributes.homeID].rent * 2; 
            }
            else{ ShowTempMessage("New month and moon!", "sms"); }
            
            currentPlayerAttributes.rentToDue = true;
        }


        
        if (currentPlayerAttributes.weekNumber % 4 != 0){
            ShowTempMessage("New week and new things!", "sms");

        }

        //declining relationship
        if (currentPlayerAttributes.relationshipID != 0 && !currentPlayerAttributes.newlyMet){
            // console.log('relatinoship checkup');
            currentPlayerAttributes.relationshipStrenght -= 3;

            if (currentPlayerAttributes.relationshipStrenght <= 0){
                switch (currentPlayerAttributes.relationshipID){
                    case 1: //complicated
                        currentPlayerAttributes.relationshipID = 0;
                        currentPlayerAttributes.happinessPoints -= 4;
                        break;
                    
                    case 2: //just met
                        currentPlayerAttributes.relationshipID = 0;
                        currentPlayerAttributes.happinessPoints -= 4;
                        break;

                    case 3: //dating
                        currentPlayerAttributes.relationshipID = 1;
                        currentPlayerAttributes.happinessPoints -= 4;
                        break;
                    
                    case 4: //relationship
                        currentPlayerAttributes.relationshipID = 1;
                        currentPlayerAttributes.happinessPoints -= 4;
                        break;

                }
                
                currentPlayerAttributes.relationshipStrenght = 0;
            }

            
            
        }

        //losing the job
        if (currentPlayerAttributes.currentWorkId != 0){
    
            if (currentPlayerAttributes.workStress < 1){ //don't go work at all
                currentPlayerAttributes.currentWorkId = 0;
                currentPlayerAttributes.happinessPoints -= 10;
                ShowTempMessage("You neglected your work. You are got fired.", 'sms');
            }
    
            else if(currentPlayerAttributes.workStress > 5){
                currentPlayerAttributes.weeklyTime -= 60;
                currentPlayerAttributes.moneyPoints -= 60;
                currentPlayerAttributes.happinessPoints -= 5;
                ShowTempMessage("You worked too much. You felt a little bit sick for awhile and visited a doctor. The fee was 60€", 'sms');
            }
    
            currentPlayerAttributes.workStress = 0;
        }

        if (currentPlayerAttributes.petID == 1){

            if (currentPlayerAttributes.petWeeklyDue){
                // console.log("pet decare");
                ShowTempMessage("You haven't taken care of your pet. You had to take it to a vet. The fee was " + pets[currentPlayerAttributes.petID].petPenalty +"€", 'sms');
                currentPlayerAttributes.moneyPoints -= pets[currentPlayerAttributes.petID].petPenalty;
                currentPlayerAttributes.happinessPoints -= 5;
            }

            currentPlayerAttributes.petFoodAmount == 0 ? currentPlayerAttributes.petFoodAmount == 0 : currentPlayerAttributes.petFoodAmount--; //decrease pet food
            currentPlayerAttributes.petWeeklyDue = true;
        }

        currentPlayerAttributes.forestHappiness = 2;
        currentPlayerAttributes.internetHappiness = 1;
        currentPlayerAttributes.exerciseLvl = 0;
        currentPlayerAttributes.currentYogaEnhancer = 0;
        currentPlayerAttributes.beautyFactor = 0;


        currentPlayerAttributes.newlyMet = false;
        PutLocalEvent(0,0,"newWeek");
        
        currentPlayerAttributes.weekNumber++;
        
        ManageMoveButtons('off');
        // $(infoboxObj).slideUp(500);
        ReduceTime_Check(0);

        currentPlayerAttributes.randomForRenting = Math.floor(Math.random()*3); //randomizes renting options

        if (currentPlayerAttributes.happinessTotal >= 100 ){

            const winnderData = {
                playerId: playerId,
                playerLocalName, playerLocalName,
                opponentId, opponentId
            }

            // const winnerdata = [playerId, playerLocalName, opponentId];
            socket.emit('ToServer_GameWinner', winnderData);
            GameEnds();
            socket.emit('ToServer_ChatWinner');
            
        }

    });

    socket.on('gameEndsOpponent',() => {
        GameEnds();
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
    containerGame.innerHTML = '';

    $("#GameArea").hide();
    $("#game_ChatState").show();
    socket.emit('ToServer_PlayerNotReady');
    socket.emit('ToServer_Chat', "grats...");
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
        relationshipId: currentPlayerAttributes.relationshipID
    }
    
    
    socket.emit('ToServer_OpponentStats', (tempPackage));
}

function OpponentEvents(eventText){

    const tempPackage = {
        opponentId: opponentId,
        eventText: eventText,
    }

    socket.emit('ToServer_OpponentEvents', (tempPackage));
}

function OpponentMovement(opponentMove){
    socket.emit('ToServer_OpponentMovement', (opponentMove));
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
    allElementsList  =[];
    const container = document.querySelector('.container');
    let count = 0;
    container.innerHTML = '';
    

    for (var i = 0; i < elementCount; i++) { 

        count++;
        CreateMap(container, count);
          
    }

    let tempPos = {
        x: document.getElementById("block-9").getBoundingClientRect().x - containerRects.x,
        y: document.getElementById("block-9").getBoundingClientRect().y - containerRects.y
    }


    targetDestinationID = "Home";
    MovePlayer(tempPos);
    ChooseDirection(targetDestinationID);
    $(movePlayerButton).fadeOut(0);
    
    window.scrollTo(0,0);
    containerRects = document.querySelector('.container').getBoundingClientRect();
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
                    $(movePlayerButton).fadeIn(300);
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

    //SOME STORE---------------------------------------------- 
    else if (count == 4){
        containerElement.id = "SomeStore"; //CHANGE---------------------------------
        const image = document.createElement('img');
        image.src = "./img/Building_Basic_RightEnd.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, betterHomeButton); // changeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
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

    //PETSTORE-------------------------------------------------------
    else if (count == 20){
        containerElement.id = "School";
        const image = document.createElement('img');
        image.src = "./img/Building_Functional.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, schoolbutton);
    }


    //FOREST, NOT SCHOOL---------------------------------------------------------
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

    //POST OFFICE-----------------------------------------------------
    else if (count == 46){
        
        containerElement.id = "Mall";
        const image = document.createElement('img');
        image.src = "./img/Building_MallRight.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, mallButton);

    }

    //Mall OFFICE-----------------------------------------------------
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
    // console.log("Updated temp Playerpos: ", tempPlayerPosition.x, " ", tempPlayerPosition.y);
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

    
    // playersPreviousPos = {x: playerPos.x, y: playerPos.y};
    tempPlayerPosition = {x: playerPos.x, y: playerPos.y};
    // console.log(tempPlayerPosition);
    // console.log("tempPlayerPosition: ", tempPlayerPosition);


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
            // console.log(array.distY);
            return array.distY == firstOne.distY;
        }
    
        if (shortestDistance.length > 1){
            // console.log("more than 1");
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
    
        // console.log("firstOne.x: " + firstOne.x);

        if (firstOne.x == undefined){
            console.log("error in movement!");
            return;
        }

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
        if (ClosestBlocks(document.getElementById(targetDestination.destinationName).getBoundingClientRect(), tempPlayerPosition) == 0){
            // console.log("Destination!");
            endPositionFound = true;
            DrawDots(firstOne.id, true);
            return;
        }

        DrawDots(firstOne.id, false);

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

function PlayerDistanceFromDestination(destination, playerRunningPos){

    // document.getElementById(el).innerHTML = "";
    // const newPosX = elementPos.x;
    // const newPosY = elementPos.y;
    // console.log(el, " => pos X:", newPosX, " Y:", newPosY);
    // console.log(el, " => RunningPos X:", playerRunningPos.x-8, " Y:", playerRunningPos.y-106.5);
    // console.log("Second: " + el, " X:", newPosX,  /*+ mapOffSetX*/ playerRunningPos.x, " Y:", newPosY,  /*+ containerRects.top*/ playerRunningPos.y);
    
    //CALCULATING THE DISTANCE FROM START POINT
    const distanceX = (Math.abs(destination.x - (playerRunningPos.x )))/elementSize;
    const distanceY = (Math.abs(destination.y - (playerRunningPos.y )))/elementSize;
    // console.log("Distances filtered: X:", distanceX, " Y:", distanceY);
    // document.getElementById(el).innerHTML = distanceX+distanceY;
    // console.log("Player Distance:", distanceX+distanceY);

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
        player.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/2) - playerSizeY}px, 0)`;
        opponentObject_1.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/2) - playerSizeY}px, 0)`;
        opponentObject_2.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/2) - playerSizeY}px, 0)`;
        playerMoving = false;
        console.log(newPosX, " ", newPosY);
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

    if (endDot){
        const temp = document.createElement('img');
        const desiredX = document.getElementById(el).getBoundingClientRect().x - containerRects.left + elementSize/2-2;
        const desiredY = document.getElementById(el).getBoundingClientRect().y - containerRects.height - containerRects.top +14/*-8+ elementSize/3*/;
        temp.src = "./img/icons/x-mark.png"
        temp.className = "end-dot";
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

