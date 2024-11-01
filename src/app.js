import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import photoRoutes from './routes/photo.routes.js'

const app = express()

app.use(express.static('public'))
app.use(express.json({ limit: '10mb' }))
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Prueba de Backend para Upload de Imagenes')
})

app.use('/api/photos', photoRoutes)
app.use((req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada mano, intenta con otra',
        status: 404
    })
})


export default app
