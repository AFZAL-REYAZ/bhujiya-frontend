require("dotenv").config(); // MUST be first

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./src/config/db");
const routes = require("./src/routes/router");

const app = express();

// ===== MIDDLEWARE =====
const allowedOrigins = [
  "http://localhost:5173",
  "https://jaldichips.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ===== DATABASE =====
connectDB();

// ===== ROUTES =====
app.use("/api", routes);

// ===== TEST =====
app.get("/", (req, res) => {
	res.send("Server Running Successfully 🚀");
});

// ===== PORT =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
