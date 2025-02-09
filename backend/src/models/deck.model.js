import mongoose from "mongoose";
import { type } from "os";

const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false,
        default: ""
    },
    category: {
        type: String,
        required: true,
        enum: ["Science", "Math", "History", "Progamming", "Literature", "Geography", "Art", "Other"]
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

// Unique name per user
deckSchema.index({user: 1, name: 1}, {unique: true});

export const Deck = mongoose.model("Deck", deckSchema);