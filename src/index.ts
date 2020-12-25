import 'reflect-metadata'
import './database/connection'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import routes from './routes'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(routes)

app.get('/', (req, res) => {
    return res.send('Ta fundando')
})

app.listen(4000, () => console.log('Server is up'))