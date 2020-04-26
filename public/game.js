const containerRects = document.querySelector('.container').getBoundingClientRect();
const routeBase = document.querySelector('.routeBase');
const movePlayerButton = document.getElementById('move-player');

//Player and opponent
const player = document.getElementById('player');
const opponent = document.getElementById('opponent');

//Buttons
const btn_blockingPanel = document.getElementById('btn-blockingPanel');
const btn_blockingPanel_centerTopic = document.getElementById('btn-blockingPanel-centerTopic');
const homeButton = 'homebutton';
const betterHomeButton = 'betterhomebutton';
const barButton = 'barbutton';
const postButton = 'postbutton';
const petstoreButton = 'petstorebutton';
const somestoreButton = 'somestorebutton';
const schoolbutton = 'schoolbutton';

//Map variables
const playerSizeX = player.clientWidth/2;
const playerSizeY = player.clientHeight/2;
const mapOffSetX = 3;


//Element lists
const elementCount = 56; //must be devided by 8
const elementSize = 40; //element size*size
let allElementsList = []; //not sure if needed
let allRoadElements = [];


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
let playerLocalName = '';
const chatArea = document.getElementById('chatArea');
const inputChat = document.getElementById('inputChat');
const list_of_players = document.getElementById('list_of_players');
const opponentInfo = document.getElementById('opponentInfo');


let playerId;
let opponentId;
let opponentName;
let gameId;

let playerNumberInArray;
let opponentNumberInArray;

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
            socket.emit('ToServer_UpdatePlayersStatus');
        }

    });

    $('#chatBtn').click(function() {
        socket.emit('ToServer_Chat', inputChat.value);
        inputChat.value = '';
    });
    
    //set client ready
    $('#readyBtn').click(function() {
        socket.emit('ToServer_readyToPlay'); //change status
        socket.emit('ToServer_UpdatePlayersStatus'); //update texts
    });

    socket.on('ToClient_addToChat', (data) =>{
        chatArea.innerHTML += `<div>${data}</div>`;
    });

    socket.on('ToClient_readyToPlay', (id) => {
        document.getElementById('readyBtn').innerHTML = 'Ready!'
        playerId = id;
        
    });      

    socket.on('ToClient_UpdatePlayerList', (data) =>{
        
        list_of_players.innerHTML = '<div><b>List of Players:</b></div>';
        
        for(var i = 0; i < data.length; i++){
            if (data[i].playerName != ''){
                list_of_players.innerHTML += `<div><span style="font-weight:900">${data[i].playerName}</span> -
                ${data[i].isReady ? 
                "<span style='color:lime; font-weight:900;'>ready</span>":
                "<span style='color:red;'>not ready</span>"}</div>`;
                }
            }
            
        
    });


    // STARTING THE GAME-----------------------------------------------------------------------
    socket.on("ToClient_StartGame", (data) =>{
        
        playerColor = data.color;

        for(i = 0; i < data.playerName.length; i++){
            // const newPlayer = document.createElement('div');
            
            if (data.id[i] == playerId){
                playerNumberInArray = i;
            }
            else if (data.id[i] != playerId){

                opponentNumberInArray = i;
                opponentId = data.id[i];
                opponentName = data.playerName[i];
                opponentInfo.innerHTML = `Opponent: <span style='font-weight:900;color:${playerColor[opponentNumberInArray]};'>${opponentName}</span>`;

            }
            
        }
        

        player.style.background = playerColor[playerNumberInArray];
        opponent.style.background = playerColor[opponentNumberInArray];
        gameId = data.gameId
        GameStarts();
    });

    //UPDATE DURING THE GAME-------------------------------------------------------------------
    socket.on('ToClient_OpponentStats', (data) =>{
        
        opponent_time_text.innerHTML = "Time: " + Math.ceil((data.time/weeklytimeToCompare)*100) + "%";

        if (data.time <= 0){
            opponent_time_text.innerHTML = "<span class='optiontext red'>Week is over.</span> ";
        }

        opponent_happiness_text.innerHTML = "Happiness: " + data.happinessPoints + "%";
        opponent_moneyText.innerHTML = data.moneyPoints + "€";

        anime({
            targets: opponent_happiness_bar,
            width: data.happinessPoints,
            easing: 'linear',
            duration: 500
    
        });

        anime({
            targets: opponent_time_bar,
            width: (data.time/weeklytimeToCompare)*barWidth,
            easing: 'linear',
            duration: 500
    
        });
        
        ColorTimeBar(data.time, opponent_time_bar);

    });


    socket.on('ToClient_OpponentEvents', (data) =>{
        
        const newEvent = document.createElement('div');
        
        newEvent.innerHTML =`<span style='font-weight:700; color:${playerColor[opponentNumberInArray]}'> ${opponentName}</span> ${data.eventText}`;
        
        opponent_events.appendChild(newEvent);
        newEvent.scrollIntoView(false);
    });
  
    socket.on('ToClient_OpponentMovement', (data) =>{
        
        anime({
            targets: opponent,
            translateX: data.x,
            translateY: data.y,
            easing: 'linear',
            duration: 500
        });
    });

    socket.on('ToClient_NewWeek', () =>{
    
        

        if (weekNumber % 4 == 0){
            console.log("month has changed.");
            
            ShowTempMessage("New month and new things! <span style='color:salmon;'>If you didn't pay your rent, cost has been doubled and credited from your bank account.</span>", 
            "sms");

            if (currentPlayerAttributes.rentToDue){
                
                currentPlayerAttributes.moneyPoints -= rentHomes[currentPlayerAttributes.homeID].rent * 2;
            }
            else{
                ShowTempMessage("New month and new things!", "sms");
            }
            
            currentPlayerAttributes.rentToDue = true;
        }


        if (weekNumber % 4 != 0){
            ShowTempMessage("New week and new things!", "sms");
        }

        if (currentPlayerAttributes.petMonthlyDue && currentPlayerAttributes.homeID != 0){
            // console.log('Your pet is not feeling well. You had to take her to vegetarian.');
            currentPlayerAttributes.moneyPoints -= pets[currentPlayerAttributes.petID].petCostWeek * 8;
        }

        currentPlayerAttributes.petMonthlyDue = true;
        
        
        
        
        weekNumber++;
        weeklyTime = weeklytimeToCompare;
        ManageMoveButtons('off');
        // $(infoboxObj).slideUp(500);
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


function OpponentUpdates(time, happinessPoints, moneyPoints){
    
    //INFORMATION TO OPPONENT => info to sent out
    const tempPackage = {
        opponentId: opponentId,
        happinessPoints: happinessPoints,
        time: time,
        moneyPoints: moneyPoints
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


//ACTUAL GAME--------------------------------------------------------------------------

// StartGame();
// SetInfoBoxPosition();


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
    // player.style.transform = `translate3d(${tempPos.x}px, ${tempPos.y}px, 0)`;
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
    if (count == 2 || count == 3 || count == 21 || count == 22 ||
        count == 35 || count == 36 || count == 37 || 
        count == 45 || count == 50){


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


    else if (count == 40 || count == 48){
        const image = document.createElement('img');
        image.src = "./img/Normal_House_Tilted.png";
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
        image.src = "./img/Building_Functional_RightEnd.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, somestoreButton);
    }

    //BETTER APARTMENT--------------------------------------------------change from student apartment to better one, make function
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
        containerElement.id = "PetStore";
        const image = document.createElement('img');
        image.src = "./img/Building_Functional.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, petstoreButton);
    }


    //SCHOOL---------------------------------------------------------
    else if (count == 23){
        containerElement.id = "School";
        const image = document.createElement('img');
        image.src = "./img/Building_Functional_RightEnd.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, schoolbutton);
    }


    //BAR------------------------------------------------------------
    else if (count == 34){
        containerElement.id = "Bar";
        const image = document.createElement('img');
        image.src = "./img/Building_Functional_LeftEnd.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, barButton);
    }

    //POST OFFICE-----------------------------------------------------
    else if (count == 46){
        
        containerElement.id = "PostOffice";
        const image = document.createElement('img');
        image.src = "./img/Building_Functional_RightEnd.png";
        image.setAttribute('height', elementSize);
        containerElement.appendChild(image);

        CreateButtonElement(containerElement, postButton);

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


function ChangeTempPlayerPos (elementPos){
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
    
        // console.log("chosen one: " + firstOne.id);
        

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

    //CALCULATE THE DISTANCE
    // const distanceX = (Math.abs((newPosX + mapOffSetX + playerSizeX) - (player.getBoundingClientRect().x)))/elementSize;
    // const distanceY = (Math.abs((newPosY + containerRects.top) - (player.getBoundingClientRect().y)))/elementSize;

    routeBase.innerHTML = '';
    
    // player.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/2) - playerSizeY }px, 0)`;
    playerPos.x = newPosX;
    playerPos.y = newPosY;

    randomizeNewOnlineContent = true;
    currentDestinationID = targetDestinationID;
    ManageMoveButtons('playerMovement'); //disable buttons
    // var intervalSetter = null;

    //in the start if there isn't position
    if (positionsForAnimation == undefined){
        player.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/2) - playerSizeY }px, 0)`;
        opponent.style.transform = `translate3d(${newPosX + elementSize/2  }px, ${newPosY + (elementSize + elementSize/2) - playerSizeY }px, 0)`;
        
        playerMoving = false;
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
        opponentId: opponentId,
        x: tempXPos, 
        y: tempYPos
    }

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
        const desiredY = document.getElementById(el).getBoundingClientRect().y - containerRects.height - containerRects.top -8/*+ elementSize/3*/;
        temp.src = "./img/icons/x-mark.png"
        temp.className = "end-dot";
        temp.style.transform = `translate3d(${desiredX}px, ${desiredY}px, 0)`;
        routeBase.appendChild(temp);

    }

    else{
        const temp = document.createElement('div');
        const desiredX = document.getElementById(el).getBoundingClientRect().x - containerRects.left + elementSize/2-2;
        const desiredY = document.getElementById(el).getBoundingClientRect().y - containerRects.height - containerRects.top -5/* + elementSize/2.5*/;
        
        temp.className = "route-dots";
        temp.style.transform = `translate3d(${desiredX}px, ${desiredY}px, 0)`;
        routeBase.appendChild(temp);
    }

}

