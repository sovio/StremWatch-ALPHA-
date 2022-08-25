const Nicks = require('./NickNames.js')
const Avatars = require('./Avatars')
const client = require('./LogInToDatabase')
const FindNickSql = require('./FindNickSql')


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function AddUserSql(socket, RoomID) {
    const opt = {}
    let z = []
    let nick = null
    let avatar
    try {
        do {
            const result = await client.query(`SELECT Content FROM test3 WHERE ID='${RoomID}'`, opt);
            
            for (let x in result.rows[0].Content.Users) {
                z.push(result.rows[0].Content.Users[x].UserID)
            }
            if (!z.includes(socket)) {

                nick = Nicks[getRandomInt(0, Nicks.length)]
                avatar = Avatars[getRandomInt(0, Avatars.length)]
                client.query(
                    `UPDATE test3 t 
                    ADD 
                    t.Content.Users 0 {"UserID":"${socket}","UserNickName":"${nick}", "Status":"${true}", "Avatar":"${avatar}"}
                    WHERE 
                    ID = "${RoomID}"`
                );    
            }
            opt.continuationKey = result.continuationKey
        } while(opt.continuationKey)
        if (nick != null) {
            return ({nick:nick, avatar:avatar})
        } else {
            return(await FindNickSql(socket,RoomID))
        }
    } catch(error) {
        console.log(error)
    }
}

module.exports = AddUserSql