// import express from "express";
// import { stripe } from "../app.js";

let express = require("express");
let stripe = require("../app");

let Router = express.Router();

// let storeItems = new Map([
//   [1, { priceInRupees: 39900, name: "Yearly Subscription" }],
//   [2, { priceInRupees: 4900, name: "Monthly Subscription" }],
// ]);

// Router.post("/yearlyIndia", async (req, res) => {
//   try {
//     let session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         let storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInRupees,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.SERVER_URL}/success.html`,
//       cancel_url: `${process.env.SERVER_URL}/cancel.html`,
//     });
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// Router.post("/monthlyIndia", async (req, res) => {
//   try {
//     let session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         let storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: "INR",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInRupees,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${process.env.SERVER_URL}/success.html`,
//       cancel_url: `${process.env.SERVER_URL}/cancel.html`,
//     });
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

/* Foriegn payment */

let storeItems = new Map([
  [1, { priceInCents: 4900, name: "Yearly Subscription" }],
  [2, { priceInCents: 500, name: "Monthly Subscription" }],
]);

Router.post("/yearly", async (req, res) => {
  try {
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        let storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
Router.post("/monthly", async (req, res) => {
  try {
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        let storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = Router;
