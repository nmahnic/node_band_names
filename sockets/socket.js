const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/Bands')

const bands = new Bands();

bands.addBand( new Band('Queen') )
bands.addBand( new Band('Bon Jovi') )
bands.addBand( new Band('Salta la Banca') )
bands.addBand( new Band('Kiss') )
bands.addBand( new Band('Metallica') )

io.on('connection', client => {
    console.log('Cliente conectado')

    client.emit( 'active-bands', bands.getBands())

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
    
    client.on('emitir-mensaje', (payload) => {
        console.log(`${payload.user}: ${payload.mensaje}`)

        // client.emit('nuevo-mensaje', { mensaje: payload})
        client.broadcast.emit('nuevo-mensaje', payload)
    })

    client.on('emitir-votes', (payload) => {
        console.log('emitir-votes', payload['id'])
        bands.voteBand(payload['id'])

        io.emit( 'active-bands', bands.getBands())
    } )
    
    client.on('emitir-new-band', (payload) => {
        console.log('emitir-new-band', payload.name)
        bands.addBand(new Band(payload.name))

        io.emit( 'active-bands', bands.getBands())
    } )
    
    client.on('emitir-delete', (payload) => {
        console.log('emitir-delete', payload.id)
        bands.deleteBand(payload.id)

        io.emit( 'active-bands', bands.getBands())
    } )
})