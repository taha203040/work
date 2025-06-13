import Subscription from "../models/subscribtion.model.js";
const createSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      message: "Subscription created successfully",
      subscription,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default createSubscription