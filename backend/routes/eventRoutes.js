const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const { createEvent, getEvents, rsvpEvent, getEventById, deleteEvent } = require("../controllers/eventController");

const router = express.Router();

router.post("/create", validateToken, createEvent);
router.get("/list", validateToken, getEvents);
router.get("/list/:id", validateToken, getEventById);
router.delete("/delete/:id", validateToken, deleteEvent);
router.post("/rsvp", validateToken, rsvpEvent);

module.exports = router;