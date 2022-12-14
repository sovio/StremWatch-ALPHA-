//const server = require('http').createServer();
const server = require('http').createServer();
const io = require('socket.io')(server);

//-------------------------------------------//
const CheckExist = require('./scripts/Checkexist')
const AddUserSql = require('./scripts/AddUserSql')
const FindNickSql = require('./scripts/FindNickSql')
const NickUpdate = require('./scripts/NickUpdate')
const client = require('./scripts/LogInToDatabase')
const createID = require('./scripts/createID');
const dbinsert = require('./scripts/testconnect')
//-----------------------------------------//

async function AddLinkToPlayListSql (obj) {
    try {
        await client.query(`
            UPDATE test3 
            SET test3.Content.PlayList = "${obj.Url}",
            SET test3.Content.FilmRef.isPlay = "false",
            SET test3.Content.FilmRef.FilmTime = 0
            WHERE 
            ID = "${obj.RoomID}"`
        )
    }catch(e) {
        console.log(e)
    }
}

async function PlayIsNull (RoomID) {
    try {
        const response = await client.query(`SELECT test3.Content.PlayList FROM test3 WHERE ID = "${RoomID}"`)
        let p = response.rows[0].PlayList.length == 0 ? true: false
        return p

        
        
    }catch(e){console.log(e)}
}

async function GetFilmUrl (RoomID){
    try {
        const result = await client.query(`SELECT test3.Content.PlayList, test3.Content.FilmRef FROM test3 WHERE ID = '${RoomID}'`)
         if(result.rows[0].PlayList != '') {
            return ({Url: result.rows[0].PlayList, FilmRef: result.rows[0].FilmRef})
        }else{
            return ({Url: '', FilmRef: result.rows[0].FilmRef})
        } 
    }catch(e) {
        console.log(e)
    }
}

async function StatusUpdate(obj) {
    try {
        await client.query(`
            UPDATE test3
            SET 
            test3.Content.FilmRef.isPlay = ${!obj.Status}
            WHERE 
            ID = "${obj.RoomID}"
        `)
    } catch(e) {
        console.log(e)
    }
}

async function FilmTimeUpdate(obj) {
    try{
        await client.query(`
            UPDATE test3
            SET 
            test3.Content.FilmRef.FilmTime = ${obj.time}
            WHERE 
            ID = "${obj.RoomID}"
        `)
    }catch(e) {
        console.log(e)
    }
}

async function isPlaying(ID) {
    try{
        const result = await client.query(`SELECT test3.Content.FilmRef.isPlay FROM test3 WHERE ID = '${ID}'`)
        return result.rows[0].isPlay
    }
    catch(e) {
        console.log(e)
    }
}

async function  RemoveFilm(ID) {
    try{
        client.query(`
        UPDATE test3
        SET 
        test3.Content.PlayList = ''
        WHERE 
        ID = "${ID}"
        `)
    }catch(e) {
        console.log(e)
    }
}

async function PeopleCheck(ID){
    try {
        const response = await client.query(`SELECT test3.Content.Users FROM test3 WHERE ID = "${ID}"`)
        return response.rows[0].Users
    }catch(e) {
        console.log(e)
    }
}

var roomTemplate = {
    PlayList: '',
    Users: [],
    FilmRef: {
        isPlay: false,
        FilmTime: 0
    }
}

io.on('connection', (socket) => {

    socket.on('newRoom', (id) => {
        (async () => {
            socket.join(id)
            if( await CheckExist(id) && id.length === 12){
                dbinsert(id, roomTemplate)
            }
        })()
    })

    socket.on('new-user', (roomID, callback) => {
        userID = createID(15)
        callback(userID)
    })

    socket.on('FirstCon',(ID, userID)=>{
        try{
            (async () => {
                await io.to(socket.id).emit('First-Connect', await AddUserSql(userID, ID))
                if(await isPlaying(ID)){
                    socket.to(ID).emit('FilmTimeRequest',({socketto: socket.id}))
                }else{
                    await io.to(socket.id).emit('First-ConnectPlayListUpdate', await GetFilmUrl(ID) )
                }
                socket.to(ID).emit('PeopleUpdate', await PeopleCheck(ID))
                io.to(socket.id).emit('PeopleUpdate', await PeopleCheck(ID))
            })()  
        }catch(e){console.log(e)}
    })

    socket.on('FilmTimeResponse',(obj) => {
        (async () => {
            let x = await GetFilmUrl(obj.RoomID)
            x.FilmRef['FilmTime'] = obj.time
            x['delay'] = obj.delay
            socket.to(obj.socketto).emit('First-ConnectPlayListUpdate', (x))
        })()
    })

    socket.on('PlayPause', (obj) => {
        (async () => {
            console.log(obj.RoomID)
            socket.to(obj.RoomID).emit('PlayPauseResponse', obj.Status)
            io.to(socket.id).emit('PlayPauseResponse', obj.Status)
            StatusUpdate(obj)
            if(obj.Status == true){
                FilmTimeUpdate(obj)
            }  
        })()    
    })

    socket.on('ChangeSeekReq', (obj) => {
        socket.to(obj.RoomID).emit('ChangeSeekRes', obj.played)
    })

    socket.on('NickUpdate', (obj) => {
            NickUpdate(obj)  
    }) 

    socket.on('send-message', (obj) => {
        (async () => {
            let x = await FindNickSql(obj.id, obj.RoomID)
            obj['Nick'] = x.nick
            obj['avatar'] = x.avatar
         socket.to(obj.RoomID).emit('receive-message', (obj))
        })()
    })
    
    socket.on('AddFilm',(obj) => {
        socket.to(obj.RoomID).emit('PlayListUpdate', obj.Url)
        AddLinkToPlayListSql(obj) 
    })

    socket.on('RemoveFilmDB', ID =>{
        RemoveFilm(ID)
    })
});


server.listen(4000);

