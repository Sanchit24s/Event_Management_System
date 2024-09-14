const UserActivity = require('../models/activitylogModel');

const logActivity = async (req, res, next) => {
    const userId = req.user._id;

    try {
        await UserActivity.create({
            userId,
            action: `${req.method} ${req.originalUrl}`,
        });
        next();
    } catch (err) {
        // console.error('Error logging user activity:', err);
        next();
    }
};

module.exports = logActivity;
