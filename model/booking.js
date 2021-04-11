const mongoose = require("mongoose");

const Booking = new mongoose.Schema(
    {
        customername:{
            type: String,
        },
        location:{
            type: String,
        },
        seats:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
    }
);
module.exports = mongoose.model("Booking",Booking);