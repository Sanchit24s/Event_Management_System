const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const remainder = require("./services/remainderService");

dotenv.config();

connectDB();


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to Node Server</h1>");
});
app.use("/api/user", authRoutes);
app.use("/api/event", eventRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running On PORT ${PORT}`);
});