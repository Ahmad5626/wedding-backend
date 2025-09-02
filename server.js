const express = require("express");
const dontenv = require("dotenv").config();
const app=express();
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();
// const allowedOrigins = [
//   process.env.CLIENT_URL?.replace(/\/$/, ""),
  
// ];
const allowedOrigins = 'https://newwed-o9tz.vercel.app';
app.use(cors({
  origin: function (origin, callback) {
  // console.log("Origin:", origin); 
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
},
  
  credentials: true,
  methods: ["GET", "POST", "PUT","PATCH" ,"DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

const authRoute = require('./routes/authRoutes')
const uploadRoutes = require("./routes/upload");
const blogRoutes = require("./routes/Blog");
app.use("/auth", authRoute);
app.use("/api", uploadRoutes);
app.use("/v1/api", blogRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});