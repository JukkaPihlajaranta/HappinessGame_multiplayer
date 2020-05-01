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
    // currentPlayerList[socket.id];
    currentPlayerList[socket.id] = {
        isReady: false,
        playerName: '',
        playersGameId: 'none',
        isGameCreator: false,
        thisGameCreatorsList: [],
        maxPlayers: 0
    };
    socket.isReady = false;
    socket.playerName = '';
    socket.playersGameId = 'none';
    const currentUserNumber = Object.keys(playerList);
    console.log('A user connected: %s socket(s) connected', currentUserNumber.length);


    //DISCONNECT
    socket.on('disconnect', () =>{
        const playerTempName = currentPlayerList[socket.id].playerName;
        
        delete playerList[socket.id];
        delete currentPlayerList[socket.id];
        // connections.splice(connections.indexOf(socket), 1);
        const currentUserNumber = Object.keys(playerList);
        console.log('A user disconnected: %s socket(s) connected', currentUserNumber.length);
        
        //Jos pelaajan nimi ei ole tyhjä ==> disconnectaa pelaaja servulta
        if (playerTempName != ''){

            PlayerDisconnects(playerTempName);
        }
        
    });
    


    function PlayerDisconnects(playerTempName){ // player leaves
        // var packageToClient = [];

        // for(var i in playerList){
        //     packageToClient.push({
        //         playerName: playerList[i].playerName,
        //         isReady: playerList[i].isReady,
        //         id: playerList[i].id
        //     });
        // }
        // console.log("player leaving");

        const leaveText = "<span style=color:red>" + playerTempName + " left..</span>" ;

        for (var i in playerList){
            playerList[i].emit('ToClient_UpdateWholePlayerList', currentPlayerList[socket.id]);
            playerList[i].emit('ToClient_updateChat', leaveText);
        }

        
    }
    
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


    //SEND NORMAL MESSAGE TO CHAT
    socket.on('ToServer_Chat', (data)=> {

        const message = '<span style="color:black; font-weight: 900;">' + currentPlayerList[socket.id].playerName + ": </span>" + data;

        for (var i in playerList){
            playerList[i].emit('ToClient_updateChat', message);
        }
        
    });

    socket.on('ToServer_ChatWinner', ()=> {

        const message = '<span style="color:lime; font-weight: 900;">' + currentPlayerList[socket.id].playerName + " is the WINNER!! Congrats!! </span>";

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
            color: ["salmon", "slateblue", "sienna"],
            gameMaxPlayers: playerNumbers,
            playerIdList: newIDList,                                   //list of players                         
            playerNameList: newPlayerList,                   //list of player names
            weekReady: [false, false, false],                //player week ready check
        }

        //change this current playerlist member
        currentPlayerList[socket.id] = {
            playerName: currentPlayerList[socket.id].playerName,
            isReady: true,
            playersGameId: newGameId,
            isGameCreator: true,
            thisGameCreatorsList: gameList[newGameId].playerIdList,
            maxPlayers: playerNumbers

        }
        
        // console.log("currentGame: ",  gameList[newGameId]);
        // console.log("current Creator: ",  currentPlayerList[socket.id]);

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
            isReady: true,
            playersGameId: gameId,
            isGameCreator: false,
            thisGameCreatorsList: gameList[gameId].playerIdList,
            playersTotal: gameList[gameId].playerIdList.length

        }



        for (var i in playerList){
            playerList[i].emit('ToClient_UpdateWholePlayerList', currentPlayerList);
        }

        if(gameList[gameId].gameMaxPlayers == gameList[gameId].playerIdList.length){
            
            gameList[gameId].playerIdList.forEach( player => {

                playerList[player].emit('ToClient_StartGame', (gameList[gameId]));
            })
             
            
        }

        
    });



    //UPDATE PLAYER STATUS ON CHAT
    socket.on('ToServer_UpdatePlayersStatus', () =>{

        var packageToClient = [];

        for(var i in playerList){
            // playerList[i];
            packageToClient.push({
                playerName: playerList[i].playerName,
                isReady: playerList[i].isReady,
                id: playerList[i].id,
            });
        }

        for (var i in playerList){
            playerList[i].emit('ToClient_UpdatePlayerList', packageToClient);
        }
    });


    //OPPONENT TRACKING EVENTS------------------------------------------------------------------------------------------------------------------------

    //Stats tracking
    socket.on('ToServer_OpponentStats', (data) => {

        const tempData = {
            targetId: socket.id,
            time: data.time,
            happinessPoints: data.happinessPoints,
            moneyPoints: data.moneyPoints,
            homeId: data.homeId,
            educationId: data.educationId,
            petId: data.petId,
            relationshipId: data.relationshipId
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

        
        if (tempReadyCount == gameList[data.gameId].gameMaxPlayers){
            console.log('week have changed');

            gameList[data.gameId].playerIdList.forEach(player => {
                playerList[player].emit('ToClient_NewWeek');
            });

            for (i = 0; i < gameList[data.gameId].weekReady.length; i++){
                gameList[data.gameId].weekReady[i] = false;
            }

        }


    });
   
    socket.on('ToServer_GameWinner', (data) => {
        
        // const winnerId = data[0];
        // const winnerName = data[1];
        // const opponentId = data[2];

        // console.log(data);

        const dataToOpponent = {
            winnerId: data.playerId,
            winnerName: data.playerLocalName,
        };

        // playerId: playerId,
        // playerLocalName, playerLocalName,
        // opponentId, opponentId

        data.opponentId.forEach(id => {
            playerList[id].emit('gameEndsOpponent', (dataToOpponent));
        });
        // playerList[opponentId].emit('gameEndsOpponent', (dataToOpponent));

    });


});

const guid=()=> {
    const s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);     
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
  }