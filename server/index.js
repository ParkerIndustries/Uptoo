const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
const db = require('./database')
const storageRouter = require('./routes/storage-router')

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'error connection -'))

app.get('/', (req, res) => {
    res.send('OK')
})

app.use('/api', storageRouter)

app.listen(port, () => console.log(`run server on port ${port}`))