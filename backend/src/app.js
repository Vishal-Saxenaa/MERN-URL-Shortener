import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("URL Shortener API is Running...");
});

export default app;