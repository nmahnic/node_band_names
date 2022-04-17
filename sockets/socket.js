const { io } = require('../index')

io.on('connection', client => {
    console.log('Cliente conectado')
//   client.on('event', data => { /* … */ })
    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    })

    client.on('mensaje', (payload) => {
        console.log(`Mensaje: ${payload.nombre}`)

        client.emit('mensaje', { admin: 'Nuevo mensaje'})
    })
    
    client.on('emitir-mensaje', (payload) => {
        console.log(`${payload.user}: ${payload.mensaje}`)

        // client.emit('nuevo-mensaje', { mensaje: payload})
        client.broadcast.emit('nuevo-mensaje', payload)
    })
})