const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const {
    createEvent,
    getEvents,
    rsvpEvent,
    getEventById,
    deleteEvent,
    addAttendee,
    removeAttendee,
} = require("../controllers/eventController");
const logActivity = require("../middleware/userActivity");

const router = express.Router();

router.post("/create", validateToken, logActivity, createEvent);
router.get("/list", validateToken, logActivity, getEvents);
router.get("/list/:id", validateToken, getEventById);
router.delete("/delete/:id", validateToken, deleteEvent);
router.post("/rsvp", validateToken, rsvpEvent);

router.post("/events/addAttendee/:id", validateToken, addAttendee);
router.post("/events/removeAttendee/:id", validateToken, removeAttendee);

module.exports = router;
