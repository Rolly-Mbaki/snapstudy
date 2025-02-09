import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deck",
        required: true
    }
}, {timestamps: true});

// Unique question per deck
cardSchema.index({deck: 1, question: 1}, {unique: true});

export const Card = mongoose.model("Card", cardSchema);