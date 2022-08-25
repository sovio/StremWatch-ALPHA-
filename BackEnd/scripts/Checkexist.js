const client = require('./LogInToDatabase')

async function CheckExist(id) {
    try{
        const result = await client.query(`SELECT ID From test3`)
        for(let x in result.rows) {
            if (result.rows[x].ID == id) {
                return false
            }
        }
        return true
    }catch(e){console.log(e)}
}

module.exports = CheckExist