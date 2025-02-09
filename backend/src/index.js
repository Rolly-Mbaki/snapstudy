import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import deckRoutes from './routes/deck.route.js'
import { connectDB } from './lib/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/decks", deckRoutes)


app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT)   
    connectDB()
})