const express = require('express')
const path = require('path')
require('dotenv').config()

//App de Express
const app = express()

//Node server
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)

//Mensajes de Sockets
require('./sockets/socket')

const publicPath = path.resolve( __dirname, 'public')

app.use( express.static(publicPath))

server.listen( process.env.PORT || 3000 , (err) => {
    if(err) throw new Error(err);
    console.log('Servidor corriendo en el puerto', process.env.PORT || 3000)
})