import express from "express";
import urlRoutes from "./routes/urlRoutes.js";
const app = express();

//middleware
app.use(express.json());

//Routes
app.use("/", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener API is Running...");
});

export default app;