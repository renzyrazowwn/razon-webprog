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

// 2. Define Dynamic CORS Options to support Vercel preview domains safely
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, or curl)
        if (!origin) return callback(null, true);
        
        // Accept requests from localhost OR any subdomain ending in .vercel.app
        if (
            origin.startsWith("http://localhost:") || 
            origin.endsWith(".vercel.app")
        ) {
            callback(null, true);
        } else {
            callback(new Error("Blocked by CORS policy"));
        }
    },
    credentials: true, // Safe to use now since origin is dynamically set, not a wildcard *
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 204, 
};

// 3. Apply Global CORS Middleware
app.use(cors(corsOptions));

// 4. Body Parsing Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 5. App Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// 6. Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("SERVER ERROR LOG:", err.stack);
    
    // Fallback headers for runtime server crashes
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.headers.origin && (req.headers.origin.startsWith("http://localhost:") || req.headers.origin.endsWith(".vercel.app"))) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    
    res.status(500).json({ 
        error: "Internal Server Error",
        message: err.message || "Something went wrong on the server." 
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));