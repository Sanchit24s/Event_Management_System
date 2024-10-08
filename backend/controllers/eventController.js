const Event = require("../models/eventModel");
const ActivityLog = require("../models/activitylogModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

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
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const totalCount = await Event.countDocuments();

        const events = await Event.find()
            .populate("attendees createdBy", "name email")
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.json({ events, totalCount });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Get event by id
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("attendees", "name email")
            .populate("createdBy", "name email");
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// delete event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
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

        res.json(event);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// add attendee
const addAttendee = async (req, res) => {
    try {
        const { email } = req.body;

        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (event.attendees.includes(user._id)) {
            return res.status(400).json({ error: "User is already an attendee" });
        }

        event.attendees.push(user._id);
        await event.save();

        res.json({ message: "Attendee added successfully", event });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Remove attendee
const removeAttendee = async (req, res) => {
    try {
        const { eventId, attendeeId } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(attendeeId)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Sanitize attendees array to remove null values
        event.attendees = event.attendees.filter(attendee => attendee !== null);

        // Check if attendee is part of the event
        const attendeeIndex = event.attendees.findIndex(attendee => attendee.equals(attendeeId));
        if (attendeeIndex === -1) {
            return res.status(404).json({ error: "Attendee not found" });
        }

        // Remove attendee
        event.attendees.splice(attendeeIndex, 1);
        await event.save();

        return res.json({ message: "Attendee removed successfully" });
    } catch (err) {
        console.error('Error removing attendee:', err);
        return res.status(500).json({ error: "Server Error" });
    }
};

// Get attendee
const getAttendee = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json({ attendees: event.attendees });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    deleteEvent,
    rsvpEvent,
    addAttendee,
    removeAttendee,
    getAttendee
};
