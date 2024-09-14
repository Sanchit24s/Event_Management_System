const Event = require("../models/eventModel");
const ActivityLog = require("../models/activitylogModel");

// Create a new event
const createEvent = async (req, res) => {
    const { title, description, date } = req.body;
    try {
        const event = new Event({
            title,
            description,
            date,
            createdBy: req.user.id,
        });
        await event.save();

        const log = new ActivityLog({
            userId: req.user.id,
            action: `Created an event: ${title}`,
        });
        await log.save();

        res.json(event);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation error",
                errors: err.message,
            });
        }

        console.error("Server error:", err);
        res.status(500).json({
            message: "Server error",
        });
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate(
            "attendees createdBy",
            "name email"
        );
        res.json(events);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Get event by id
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// delete event 
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// RSVP to an event
const rsvpEvent = async (req, res) => {
    const { eventId } = req.body;
    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ msg: "Event not found" });

        if (!event.attendees.includes(req.user.id)) {
            event.attendees.push(req.user.id);
        }

        await event.save();

        // Log the user activity
        const log = new ActivityLog({
            userId: req.user.id,
            action: `RSVP'ed to event: ${event.title}`,
        });
        await log.save();

        res.json(event);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

module.exports = { createEvent, getEvents, getEventById, deleteEvent, rsvpEvent };