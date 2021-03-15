const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.01:27017/products', {useNewUrlParser:true})
    .catch(err => {
        console.error('error', err.message)
    })

const db = mongoose.connection

module.exports = db