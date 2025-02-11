import { Card } from "../models/card.model.js";
import { Deck } from "../models/deck.model.js";

export const getAllCards = async (req, res, next) => {
    try {
        const cards = await Card.find().sort({ createdAt: -1 })
        res.json(cards)
    } catch (error) {
        next(error)
    }
}


export const getCardById = async (req, res, next) => {
    try {
        const { id } = req.params
        const card = await Card.findById({_id: id, user: req.auth.userId})
        if (!card) {
            return res.status(404).json({ message: "Card not found" })
        }
        res.status(200).json(card)
    } catch (error) {
        next(error)
    }
}
// export const createCard = async (req, res, next) => {
//     try {
//         const { question, answer, deckId } = req.body
//         const card = new Card({
//             question,
//             answer,
//             deckId
//         })

//         await card.save()

//         // if card belogns to a deck, update cards array
//         if(deckId){
//             await Deck.findByIdAndUpdate(deckId, {
//                 $push: {
//                     cards: card._id
//                 }
//             })
//         }
//         res.status(201).json(card)
//     } catch (error) {
//         next(error)
//     }
// }

export const createCard = async (req, res, next) => {
    try {
        const { question, answer, deckId } = req.body
        const deck = await Deck.findOne({ _id: deckId, user: req.auth.userId })
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }
        const card = new Card({
            question,
            answer,
            deckId
        })
        await card.save()
        await Deck.findByIdAndUpdate(deckId, {
            $push: {
                cards: card._id
            }
        })
        res.status(201).json(card)
    } catch (error) {
        next(error)
    }
}

export const deleteCard = async (req, res, next) => {
    try {
        const { id } = req.params
        const card = await Card.findOne({ _id: id, deckId: { $exists: true } })
        if (!card) {
            return res.status(404).json({ message: "Card not found" })
        }
        const deck = await Deck.findOne({ _id: card.deckId, user: req.auth.userId })
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" })
        }
        await Card.findByIdAndDelete(id)
        await Deck.findByIdAndUpdate(card.deckId, {
            $pull: {
                cards: id
            }
        })
        res.status(200).json({ message: "Card successfully deleted" })
    } catch (error) {
        next(error)
    }
}

// export const deleteCard = async (req, res, next) => {
//     try {
//         const { id } = res.params

//         const card = await Card.findById(id)

//         // if card belongs to a deck, update cards array
//         if(card.deckId){
//             await Deck.findByIdAndUpdate(card.deckId, {
//                 $pull: {
//                     cards: id
//                 }
//             })
//         }

//         res.status(200).json({ message: "Card successfully deleted" })
//     } catch (error) {
//         next(error)
//     }
// }
