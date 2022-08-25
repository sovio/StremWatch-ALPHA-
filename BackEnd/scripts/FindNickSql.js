const client = require('./LogInToDatabase')

async function FindNickSql(socket, RoomID) {
    try{
        const result = await client.query(`SELECT Content FROM test3 WHERE ID='${RoomID}'`)
        
        for (let x in result.rows[0].Content.Users) {      
            if (result.rows[0].Content.Users[x].UserID == socket) {
                return({nick: result.rows[0].Content.Users[x].UserNickName, avatar: result.rows[0].Content.Users[x].Avatar })
            }
        }
    }catch(e){console.log(e)}
}

module.exports = FindNickSql