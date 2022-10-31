const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')
var mysql = require('mysql')
app.use(cors());
app.use(express.json())
// middleware
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reactplayer'
})
// middleware
// node js api we have
app.post('/api/ReactPlayerUserData', (req, res) => {
    var ItemTitle = req.body.ItemTitle
    var ItemImagee = req.body.ItemImagee
    var ItemUrl = req.body.ItemUrl
    var ItemDescriptions = req.body.ItemDescriptions
    var Likes = req.body.Likes
    var DisLikes = req.body.DisLikes
    console.log(ItemTitle)
    console.log(ItemImagee)
    console.log(ItemUrl)
    console.log(ItemDescriptions)
    console.log(Likes)
    console.log(DisLikes)

    const sqlPut = `INSERT INTO userdatabase (ItemTitle, ItemImagee,ItemUrl,ItemDescriptions,Likes ,DisLikes) VALUES ("${ItemTitle}","${ItemImagee}","${ItemUrl}","${ItemDescriptions}",${Likes},${DisLikes})`;
    db.query(sqlPut, (err, result) => {
        if (err) throw err
        console.log('1 entry added inside the database')
        res.send("Data added successfully")

    })
})
// get all the elements from the api we have
app.get('/api/ReactPlayerUserData', (req, res) => {
    const sqlGet = 'SELECT * FROM userdatabase ';
    db.query(sqlGet, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
// i have to make the update api we have
app.put("/api/ReactPlayerUserData/:id/:likeordislikes", (req, res) => {
    var id = req.params.id
    var likeordislikes = req.params.likeordislikes
    console.log("id", id, "likeordislike", likeordislikes)
    if (likeordislikes == 0) {
        const sqlUpdate1 = `UPDATE userdatabase SET Likes = Likes + 1   WHERE id = ${id}`
        db.query(sqlUpdate1, (err, result) => {
            if (err) throw err
            console.log("Entry successfully updated")
            res.send(result)
        })

    }
    else if (likeordislikes == 1) {
        const sqlUpdate2 = `UPDATE userdatabase SET DisLikes = DisLikes + 1  WHERE id = ${id}`
        db.query(sqlUpdate2, (err, result) => {
            if (err) throw err
            console.log("Entry successfully updated")
            res.send(result)
        })

    }
    else {
        res.send("Wrong id and Wrong credential")
    }

})

app.put("/api/ReactPlayerUserData/duration/:duration/:id", (req, res) => {
    var id = req.params.id;
    var duration = req.params.duration;
    const sqlUpdateDuration = `UPDATE userdatabase SET Duration = ${duration} WHERE id = ${id} `
    db.query(sqlUpdateDuration, (err, result) => {
        if (err) throw err
        console.log("Data updated successfully")
        res.send(result)
    })
})
app.get("/api/ReactPlayerUserData/duration/row/:id", (req, res) => {
    var id = req.params.id;
    const sqlDuration = `SELECT Duration from userdatabase WHERE id = ${id}`
    db.query(sqlDuration, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.get('/', (req, res) => {
    res.send(`Server running on Port,${PORT}`)
})
app.listen(PORT, () => {
    console.log("Server running successfully")
})
