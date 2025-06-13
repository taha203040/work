import { Router } from "express";
const subscriptionRouter = Router();
import authorize from "../middlewares/auth.middleware.js";
import createSubscription from "../controllers/subs.controllers.js";
// get all subscriptions
subscriptionRouter.get("/", (req, res) => {
  res.send("Get all subscriptions");
});
// get a specific subscription by id
subscriptionRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Get subscription with id ${id}`);
});
// create a new subscription
subscriptionRouter.post("/", authorize, createSubscription);

// subscriptionRouter.put("/:id", authorize, updateSubscription);
// delete a subscription

// subscriptionRouter.delete("/:id", authorize, deleteSubscription);

// cansel a subscription
// subscriptionRouter.post("/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;