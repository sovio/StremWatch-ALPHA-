const client = require('./LogInToDatabase')

async function NickUpdate(obj) {
    try {
        const result = await client.query(`SELECT test3.Content.Users FROM test3 WHERE ID = '${obj.RoomID}'`)
       
         for (let x in result.rows[0].Users ) {
             if (obj.socket === result.rows[0].Users[x].UserID) {
                client.query(
                    `UPDATE test3 t 
                    SET 
                    t.Content.Users[${x}].UserNickName = '${obj.NewNick}' WHERE ID = '${obj.RoomID}'`
                );    
                return
            }  
        } 
    } catch(e) {
        console.log(e)
    }
}

module.exports = NickUpdate