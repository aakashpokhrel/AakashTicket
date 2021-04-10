const mongoose = require("mongoose");

const Show = new mongoose.Schema(
    {
        venue:{
            type: String,
        },
        ticketrate:{
            type: Number,
            required: [true,"Enter Ticket Rate"],
        },
        ticketperiod:{
            type: String,
        },
        photo: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Show",Show);
