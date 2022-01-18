import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(cors({
  origin: '*'
}))
app.use(routes)

app.listen(3001)