const { io } = require('../index')

io.on('connection', client => {
    console.log('Cliente conectado')

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
    
    client.on('emitir-mensaje', (payload) => {
        console.log(`${payload.user}: ${payload.mensaje}`)

        // client.emit('nuevo-mensaje', { mensaje: payload})
        client.broadcast.emit('nuevo-mensaje', payload)
    })
})