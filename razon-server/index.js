require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// 1. Initialize Database Connection
connectDB();

// 2. Define Strict CORS Options
const corsOptions = {
    origin: [
    "https://razon-webprog.vercel.app",
    "http://localhost:3000"
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 204, 
};

// 3. Apply Global CORS Middleware FIRST (Handles both standard requests and pre-flight OPTIONS)
app.use(cors(corsOptions));

// 4. Body Parsing Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 5. App Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// 6. Global Error Handling Middleware (Must be the LAST middleware)
app.use((err, req, res, next) => {
    console.error("SERVER ERROR LOG:", err.stack);
    
    // Explicitly re-apply CORS headers here so client browsers read the 500 error instead of a CORS block
    res.header("Access-Control-Allow-Origin", "*");
    res.status(500).json({ 
        error: "Internal Server Error",
        message: err.message || "Something went wrong on the server." 
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));