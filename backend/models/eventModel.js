const mongoose = require("mongoose");

// Define the Event schema
const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [5, "Title must be at least 5 characters long"],
            maxlength: [100, "Title cannot be more than 100 characters long"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot be more than 500 characters long"],
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
            validate: {
                validator: function (v) {
                    return v >= new Date();
                },
                message: "Event date must be a future date",
            },
        },
        attendees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Creator is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
