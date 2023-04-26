// import express from "express";
// import bodyParser from "body-parser";
// import { stripe } from "../app.js";
let express = require("express");
// let stripe = require("../app");
let dotenv = require("dotenv");
dotenv.config();
let bodyParser = require("body-parser");
let Router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

Router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    // Simple deserialization:
    // const event = JSON.parse(req.body);
    // console.log(event.type);
    // console.log(event.data.object);
    // console.log(event.data.object.id);

    // With signature verification:
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    const endpointSecret = STRIPE_SECRET_KEY;

    let event;

    try {
      console.log("enter try");
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("enter catch");
      console.log(error.message);
      res.status(400).json({ success: false });
      return;
    }

    console.log("before switch");
    console.log(event.type);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log("success");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ success: true });
  }
);

// export default Router;
module.exports = Router;
