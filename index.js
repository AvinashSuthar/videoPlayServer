const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");
const path = require("path");
dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin || "*");
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
