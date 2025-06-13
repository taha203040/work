import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price must be greater than 0"],
    },
    currnency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly", "weekly", "daily"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "entertainment",
        "news",
        "education",
        "health",
        "lifestyle",
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past or present",
      },
    },
    renwalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be in the future",
      },
    },
  },

  { timestamps: true }
);
SubscriptionSchema.pre("save", function (next) {
  if (!this.renwalDate) {
    const renwalPeriods = {
      monthly: 30,
      yearly: 365,
      weekly: 7,
      daily: 1,
    };
    this.renwalDate = new Date();
    this.renwalDate.setDate(
      this.startDate.getDate() + renwalPeriods[this.frequency]
    );
  }
  if (this.renwalDate.getDate() < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;