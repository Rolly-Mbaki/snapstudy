import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import deckRoutes from './routes/deck.route.js'
// import cardRoutes from './routes/card.route.js'
import { connectDB } from './lib/db.js'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
))

app.use(express.json())
app.use(clerkMiddleware()) // adds auth to req obj

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/decks", deckRoutes)
// app.use("/api/cards", cardRoutes)

// error handler
app.use((err, req, res, next) => {
    console.log("Error in creating deck", error)
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message }) 
})


app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT)   
    connectDB()
})