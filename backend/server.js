const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const remainder = require("./services/remainderService");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

connectDB();


const app = express();

app.use(express.json());

const allowedOrigins = ['http://localhost:4200'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(helmet());
app.use(mongoSanitize());

// Rate limiting 
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use("/api/", apiLimiter);


app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Node Server</h1>");
});
app.use("/api/user", authRoutes);
app.use("/api/event", eventRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`);
});