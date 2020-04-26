const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname + '/public')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 3000);
console.log("Listening on port => 3000");

playerList = {};
gameList = {};

io.sockets.on('connection', (socket) =>{

    socket.id = guid();
    playerList[socket.id] = socket;
    socket.isReady = false;
    socket.playerName = '';
    const currentUserNumber = Object.keys(playerList);
    console.log('A user connected: %s socket(s) connected', currentUserNumber.length);
    
    //DISCONNECT
    socket.on('disconnect', () =>{
        const playerTempName = playerList[socket.id].playerName;
        
        delete playerList[socket.id];
        // connections.splice(connections.indexOf(socket), 1);
        const currentUserNumber = Object.keys(playerList);
        console.log('A user disconnected: %s socket(s) connected', currentUserNumber.length);
        
        if (playerTempName != ''){
            UpdatePlayerListFromDisconnect(playerTempName);
        }
        
    });
    

    function UpdatePlayerListFromDisconnect(playerTempName){
        var packageToClient = [];

        for(var i in playerList){
            // playerList[i];
            packageToClient.push({
                playerName: playerList[i].playerName,
                isReady: playerList[i].isReady,
                id: playerList[i].id
            });
        }

        const leaveText = "<span style=color:red>" + playerTempName + " left..</span>" ;

        for (var i in playerList){
            playerList[i].emit('ToClient_UpdatePlayerList', packageToClient);
            playerList[i].emit('ToClient_addToChat', leaveText);
        }

        
    }

    //SEND MESSAGE
    socket.on('ToServer_Chat', (data)=> {

        // console.log(data);
        const message = '<span style="color:black; font-weight: 900;">' + playerList[socket.id].playerName + ": </span>" + data;

        for (var i in playerList){
            playerList[i].emit('ToClient_addToChat', message);
        }
        
    });

    //SET PLAYERNAME
    socket.on('ToServer_UpdatePlayerName', (data)=> {
        if (playerList[socket.id].playerName == ''){
            playerList[socket.id].playerName = data;
            
            const joinText = `<span style="color:lime; font-weight: 900;">${data} joined...</span>`;

            for (var i in playerList){
                playerList[i].emit('ToClient_addToChat', joinText);
            }
        }
    });

    //CHECK WHO'S READY
    socket.on('ToServer_readyToPlay', () => {
        
        playerList[socket.id].isReady = true;
        playerList[socket.id].emit('ToClient_readyToPlay', socket.id);
        // console.log("Socket: ", playerList[socket.id].isReady);
        var newIDList = [];
        var newPlayerList = [];

        for(var i in playerList){
            if (playerList[i].isReady){
                newIDList.push(playerList[i].id)
                newPlayerList.push(playerList[i].playerName)
            }
        }

        //checks if 2 players are ready and then game starts
        if (newIDList.length == 2){
            const newGameId = guid();
            gameList[newGameId] = {
                gameId: newGameId,
                color: ["slateblue", "salmon"],
                id: newIDList,
                playerName: newPlayerList,
                weekReady: [false, false]
                
            }

            newIDList.forEach(player => {
                playerList[player].emit('ToClient_StartGame', gameList[newGameId]);
            });
        }
    });




    //UPDATE PLAYER STATUS AND START THE GAME
    socket.on('ToServer_UpdatePlayersStatus', () =>{

        var packageToClient = [];

        for(var i in playerList){
            // playerList[i];
            packageToClient.push({
                playerName: playerList[i].playerName,
                isReady: playerList[i].isReady,
                id: playerList[i].id
            });
        }

        for (var i in playerList){
            playerList[i].emit('ToClient_UpdatePlayerList', packageToClient);
        }
    });


    //OPPONENT TRACKING EVENTS-------------------------------------------------------------

    //Stats tracking
    socket.on('ToServer_OpponentStats', (data) => {

        const tempData = {
            time: data.time,
            happinessPoints: data.happinessPoints,
            moneyPoints: data.moneyPoints
        }

        playerList[data.opponentId].emit('ToClient_OpponentStats', (tempData));

    });

    //event texts
    socket.on('ToServer_OpponentEvents', (data) => {

        const tempData = {
            eventText: data.eventText
        }

        
        playerList[data.opponentId].emit('ToClient_OpponentEvents', (tempData));

    });

    socket.on('ToServer_OpponentMovement', (data) => {

        const tempData = {
            x: data.x,
            y: data.y
        }

        // console.log("temp data: ", tempData);
        playerList[data.opponentId].emit('ToClient_OpponentMovement', (tempData));

    });

    socket.on('ToServer_OpponentWeeklyTimeCheck', (data) =>{

        let tempReadyCount = 0;
        
        for (i = 0; i < gameList[data.gameId].id.length; i++){
            
            if (gameList[data.gameId].weekReady[i] == true){
                tempReadyCount++;
            }
            
            if (gameList[data.gameId].id[i] == data.playerId){
                gameList[data.gameId].weekReady[i] = true;
                tempReadyCount++;
            }
        }

        
        if (tempReadyCount == 2){
            console.log('week have changed');

            gameList[data.gameId].id.forEach(player => {
                playerList[player].emit('ToClient_NewWeek');
            });

            for (i = 0; i < gameList[data.gameId].weekReady.length; i++){
                gameList[data.gameId].weekReady[i] = false;
            }

        }


    });

    // socket.on('GameWinner', (data) => {
    // who won id? the difference?
    // });


});

const guid=()=> {
    const s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);     
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
  }