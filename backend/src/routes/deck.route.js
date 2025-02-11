import {Router} from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createDeck, deleteDeck, getAllDecks, getDeckById } from "../controllers/deck.controller.js";
import { createCard, deleteCard, getAllCards, getCardById } from "../controllers/card.controller.js";

const router = Router();    

router.use(protectRoute)

// Start everything deck related
router.get("/", getAllDecks)
router.get("/:deckId", getDeckById)

router.post("/", createDeck);
// router.put("/:deckId", editDeck);
router.delete("/:deckId", deleteDeck);
// End everything deck related

// Start everything card related
router.get("/:deckId/cards", getAllCards)
router.get("/:deckId/cards/:cardId", getCardById)

router.post("/:deckId/cards", createCard);
// router.put("/:deckId/cards/:cardId", editCard);
router.delete("/deckId/cards/:cardId", deleteCard);
// End everything card related

export default router