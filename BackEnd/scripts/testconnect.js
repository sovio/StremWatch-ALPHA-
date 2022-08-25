const { json } = require('express');
var client = require('./LogInToDatabase')
var test = {
    PlayList: [],
    Users: []
}

function createRoomTable(roomID, jsonFile) {
    try {
        client.put('test3', {ID: roomID, Content: jsonFile});
        //client.query(`INSERT INTO test3 VALUES (${roomID},${JSON.stringify(test)})`);
    } catch(error) {
        console.log(error);
    }
}

//insertToTable();
//createRoomTable('sd6yi7iysib88zz2', test)


module.exports = createRoomTable
