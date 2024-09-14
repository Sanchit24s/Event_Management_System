const User = require('../models/userModel');
const Event = require('../models/eventModel');
const cron = require('node-cron');
const { sendEmail } = require('./emailService');
const { format } = require('date-fns');

const sendReminder = async (event) => {
    try {
        const formattedDate = format(new Date(event.date), 'dd/MM/yyyy');
        const attendees = await User.find({
            _id: { $in: event.attendees }
        }).select('email');
        const emails = attendees.map(attendee => attendee.email);

        const creator = await User.findById(event.createdBy).select('email');
        if (creator) {
            emails.push(creator.email);
        }

        if (emails.length === 0) {
            console.log(`No recipients for event: ${formattedDate}`);
            return;
        }

        const payload = {
            to: emails,
            subject: `Reminder: ${event.title}`,
            text: `Reminder for the event "${event.title}" scheduled for ${formattedDate}.`
        };

        sendEmail(payload.to, payload.subject, payload.text);

        console.log(`Reminder sent for event: ${event.title}`);
    } catch (error) {
        console.error('Error sending reminder:', error);
    }
};



cron.schedule('0 6 * * *', async () => {
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);

    try {
        const events = await Event.find({
            date: {
                $lte: threeDaysFromNow.setHours(0, 0, 0, 0),
                $gt: today.setHours(0, 0, 0, 0),
            },
        });

        if (events.length === 0) {
            console.log('No events scheduled for the reminder period');
            return;
        }

        events.forEach((event) => sendReminder(event));
    } catch (error) {
        console.error('Error fetching events:', error);
    }
});

module.exports = {};