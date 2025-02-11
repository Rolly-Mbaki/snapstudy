import { Deck } from "../models/deck.model.js";

export const createDeck = async (req, res, next) => {
    const { name, description, category } = req.body
    try {
        const deck = new Deck({
            name,
            description,
            category
        })

        await deck.save()

        res.status(200).json({ success: true, deck })
    } catch (error) {
        next(error)
    }
}

export const deleteDeck = async (req, res, next) => {
    try {
        const { id } = res.params

        // delete all cards that belong to the deck then delete the deck
        await Card.deleteMany({ deckId: id })
        await Deck.findByIdAndDelete(id)

        res.status(200).json({ message: "Deck successfully deleted" })
    } catch (error) {
        next(error)
    }
}

export const getAllDecks = async (req, res, next) => {
    try {
        const decks = await Deck.find({user: req.auth.userId})
        res.status(200).json(decks)
    } catch (error) {
        next(error)
    }
}

export const getDeckById = async (req, res, next) => {
    try {
        const { id } = req.params
        const deck = await Deck.findById({ _id: id, user: req.auth.userId }).populate("cards")
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }
        res.status(200).json(deck)
    } catch (error) {
        next(error)
    }
}