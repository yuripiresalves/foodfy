const express = require('express')
const server = express()

server.set('view engine', 'html')

server.get('/', (req, res) => {
    return res.render(index)
})

server.listen(5000, () => {
    console.log("pai ta on")
})