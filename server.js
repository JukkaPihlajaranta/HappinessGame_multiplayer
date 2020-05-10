const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
// let numberOfPlayers = 2;

app.use(express.static(path.join(__dirname + '/public')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 3000);
console.log("Listening on port => 3000");

playerList = {};
gameList = {};
currentPlayerList = {};

io.sockets.on('connection', (socket) =>{

    socket.id = guid();
    playerList[socket.id] = socket;
    
    currentPlayerList[socket.id] = {
        playerState: 0,
        playerName: '',
        playersGameId: 'none',
        isGameCreator: false,
        thisGameCreatorsList: [],
        maxPlayers: 0
    };
    // socket.isReady = false;
    socket.playerName = '';
    socket.playersGameId = 'none';
    const currentUserNumber = Object.keys(playerList);
    console.log('A user connected: %s socket(s) connected', currentUserNumber.length);


    //DISCONNECT
    socket.on('disconnect', () =>{
        const playerTempName = currentPlayerList[socket.id].playerName;

        if (playerTempName != ''){

            PlayerDisconnects(playerTempName);
        }

        delete playerList[socket.id]; //deletes this for last
        

        const currentUserNumber = Object.keys(playerList);
        console.log('A user disconnected: %s socket(s) connected', currentUserNumber.length);
       
        
    });
    


    function PlayerDisconnects(playerTempName){ // player leaves and deletes the game


        if (currentPlayerList[socket.id].playersGameId != 'none'){
            const currentGameId = currentPlayerList[socket.id].playersGameId;
            const leaveGameText = "<span style=color:red>" + playerTempName + " left the game for some reason...</span>" ;

            gameList[currentGameId].playerIdList.forEach(player => {
                
                currentPlayerList[player] = {
                    playerState: 0,
                    playerName: currentPlayerList[player].playerName,
                    playersGameId: 'none',
                    isGameCreator: false,
                    thisGameCreatorsList: [],
                    maxPlayers: 0
                };

                playerList[player].emit('gameEndsOpponent');
                playerList[player].emit('ToClient_updateChat', leaveGameText);
            });
            
            
            delete gameList[currentGameId];

            // console.log("currentPlayerList ",  currentPlayerList);
        }

        const leaveChatText = "<span style=color:red>" + playerTempName + " left the chat..</span>" ;

        delete currentPlayerList[socket.id];

        for (var i in playerList){
            playerList[i].emit('ToClient_UpdateWholePlayerList', currentPlayerList);
            playerList[i].emit('ToClient_updateChat', leaveChatText);
        }

        // console.log("Current Gamelist: ",  gameList);
    };
    
    //SET PLAYERNAME WHEN JOINING CHAT
    socket.on('ToServer_UpdatePlayerName', (data)=> {

        if (currentPlayerList[socket.id].playerName == ''){
            currentPlayerList[socket.id].playerName = data
            ; //set player name
            
            const joinText = `<span style="color:blue; font-weight: 900;">${data} joined...</span>`;

            for (var i in playerList){
                playerList[i].emit('ToClient_updateChat', joinText);
            }
        }
    });

    socket.on('ToServer_PlayerNotReady', () => {
        

    })

    //SEND NORMAL MESSAGE TO CHAT
    socket.on('ToServer_Chat', (data)=> {

        const message = '<span style="color:black; font-weight: 900;">' + currentPlayerList[socket.id].playerName + ": </span>" + data;

        for (var i in playerList){
            playerList[i].emit('ToClient_updateChat', message);
        }
        
    });

    socket.on('ToServer_ChatWinner', (data)=> {

        const message = '<span style="color:green; font-weight: 900;">' + currentPlayerList[socket.id].playerName + " is the WINNER!! Congrats!!</span> Happiness: " + data.happinessPoints + "%";

        for (var i in playerList){
            playerList[i].emit('ToClient_updateChat', message);
        }
        
    });

    socket.on('ToServer_UpdateWholePlayerList', () => {


        for (var i in playerList){
            playerList[i].emit('ToClient_UpdateWholePlayerList', currentPlayerList);
        }

    })
    

    //CREATE GAME
    socket.on('ToServer_CreateGame', (playerNumbers) => {
        
        playerList[socket.id].emit('ToClient_readyToPlay', socket.id); //Put id to client

        var newIDList = [];
        var newPlayerList = [];

        newIDList.push(socket.id);
        newPlayerList.push(currentPlayerList[socket.id].playerName);


        // checking the amount of players, current 2!
        const newGameId = guid();
        gameList[newGameId] = {
            gameId: newGameId,                              //game id
            gameCreatorId: socket.id,
            color: ["deepskyblue", "orange", "darkturquoise"],
            gameMaxPlayers: playerNumbers,
            playerIdList: newIDList,                                   //list of players                         
            playerNameList: newPlayerList,                   //list of player names
            weekReady: [false, false, false],                //player week ready check
        }

        //Change state to plyaer list
        currentPlayerList[socket.id] = {
            playerName: currentPlayerList[socket.id].playerName,
            playerState: 1,
            playersGameId: newGameId,
            isGameCreator: true,
            thisGameCreatorsList: gameList[newGameId].playerIdList,
            maxPlayers: playerNumbers

        }
        
        // console.log("currentGame: ",  gameList[newGameId]);
        // console.log("current Creator: ",  currentPlayerList[socket.id]);

        //if single player game
        if (playerNumbers == 1){
            currentPlayerList[socket.id].playerState = 2;
            playerList[socket.id].emit('ToClient_StartGame', (gameList[newGameId]));

        }

        for (var i in playerList){
            playerList[i].emit('ToClient_UpdateWholePlayerList', currentPlayerList);
        }

    });

    socket.on('ToServer_JoinGame', (gameId) => {

        gameList[gameId].playerIdList.push(socket.id);
        gameList[gameId].playerNameList.push(currentPlayerList[socket.id].playerName);
        
        playerList[socket.id].emit('ToClient_readyToPlay', socket.id); //Put id to client
        
        currentPlayerList[socket.id] = {
            playerName: currentPlayerList[socket.id].playerName,
            playerState: 1,
            playersGameId: gameId,
            isGameCreator: false,
            thisGameCreatorsList: gameList[gameId].playerIdList,
            playersTotal: gameList[gameId].playerIdList.length

        }



        if(gameList[gameId].gameMaxPlayers == gameList[gameId].playerIdList.length){
            
            gameList[gameId].playerIdList.forEach( player => {

                currentPlayerList[player].playerState = 2;
                playerList[player].emit('ToClient_StartGame', (gameList[gameId]));
            })
           
        }

        for (var i in playerList){
            playerList[i].emit('ToClient_UpdateWholePlayerList', currentPlayerList);
        }

        // console.log("Current Gamelist: ",  gameList);
    });



    //OPPONENT TRACKING EVENTS------------------------------------------------------------------------------------------------------------------------
    socket.on('ToServer_OpponentStats', (data) => {

        const tempData = {
            targetId: socket.id,
            time: data.time,
            happinessPoints: data.happinessPoints,
            moneyPoints: data.moneyPoints,
            homeId: data.homeId,
            educationId: data.educationId,
            petId: data.petId,
            relationshipId: data.relationshipId,
            
            jobsId: data.jobsId,

            //illegals
            fakeEducation: data.fakeEducation,
            drugs: data.drugs,
        }


        data.opponentId.forEach(id => {
            playerList[id].emit('ToClient_OpponentStats', (tempData));
        });
        

    });

    //event texts
    socket.on('ToServer_OpponentEvents', (data) => {

        const tempData = {
            targetId: socket.id,
            eventText: data.eventText
        }

        data.opponentId.forEach(id => {
            playerList[id].emit('ToClient_OpponentEvents', (tempData));
        });
        // playerList[data.opponentId].emit('ToClient_OpponentEvents', (tempData));

    });

    socket.on('ToServer_OpponentMovement', (data) => {

        const tempData = {
            movingPlayerId: socket.id,
            x: data.x,
            y: data.y
        }
        
        data.opponentId.forEach(id => {
            playerList[id].emit('ToClient_OpponentMovement', (tempData));
        });
        

    });

    socket.on('ToServer_OpponentWeeklyTimeCheck', (data) =>{

        let tempReadyCount = 0;
        
        for (i = 0; i < gameList[data.gameId].playerIdList.length; i++){
            
            if (gameList[data.gameId].weekReady[i] == true){
                tempReadyCount++;
            }
            
            if (gameList[data.gameId].playerIdList[i] == data.playerId){
                gameList[data.gameId].weekReady[i] = true;
                tempReadyCount++;
            }
        }

        console.log(gameList[data.gameId].weekReady);

        //if maxplayers have ended their weeks        
        if (tempReadyCount == gameList[data.gameId].gameMaxPlayers){
            
            gameList[data.gameId].playerIdList.forEach(player => {
                playerList[player].emit('ToClient_NewWeek');
            });

            for (i = 0; i < gameList[data.gameId].weekReady.length; i++){
                gameList[data.gameId].weekReady[i] = false;
            }

        }


    });
   
    socket.on('ToServer_GameWinner', (data) => {

        const dataToOpponent = {
            winnerId: data.playerId,
            winnerName: data.playerLocalName,
        };

        //plyaers not ready and update list
        gameList[data.gameId].playerIdList.forEach(player => {
            currentPlayerList[player].playerState = 0;
            currentPlayerList[player].isGameCreator = false;
            currentPlayerList[player].thisGameCreatorsList = [];
        });


        // if more than 1 player
        if (gameList[data.gameId].gameMaxPlayers > 1){

            data.opponentId.forEach(id => {
            
                playerList[id].emit('gameEndsOpponent', (dataToOpponent));
            });

        }

        
        for (var i in playerList){
            playerList[i].emit('ToClient_UpdateWholePlayerList', currentPlayerList);
        }


    });


    //Players competing
    socket.on('ToServer_ReportResult', (data) => {

        if (data.affectedPlayerId == null){
            playerList[data.returnPlayer].emit('ToClinet_ReportResult');
        }

        else{
            const guiltyOne = {
                affectedPlayerId: data.affectedPlayerId,
                affectedPlayerName: data.affectedPlayerName
            }

            playerList[data.returnPlayer].emit('ToClinet_ReportResult', (guiltyOne));
        }
        
    });

    socket.on('ToServer_CheckIfPlayersGuilty', (receivedData) => {

        gameList[receivedData.gameId].playerIdList.forEach(player => {

            if (player != receivedData.playerId){
                playerList[player].emit('ToClinet_CheckIllegals', (receivedData.playerId));
            }

        });
    });

    socket.on('ToServer_OrderedHit', (playerId) => {

        playerList[playerId].emit('ToClient_OrderedHit');
    });

});

const guid=()=> {
    const s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);     
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
  }