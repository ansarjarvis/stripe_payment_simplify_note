// import express from "express";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from "cors";
// import helmet from "helmet";
// import stripeRouter from "./routes/stripe.js";
// import webhookRouter from "./routes/webhook.js";
// import Stripe from "stripe";

let express = require("express");
let bodyParser = require("body-parser");
let dotenv = require("dotenv");
let cors = require("cors");
let helmet = require("helmet");
let stripeRouter = require("./routes/stripe");
let webhookRouter = require("./routes/webhook");
let Stripe = require("stripe");
/* configuration */

dotenv.config();
let app = express();
app.use("/webhook", webhookRouter);

//app.use(express.raw);
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

/* Stripe Configuration */
let stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* routes */

app.use("/create-checkout-session", stripeRouter);

/* Database */
let port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`server is live at port ${port}`);
});

module.exports = stripe;
