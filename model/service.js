const mongoose = require("mongoose");

const Service = new mongoose.Schema(
    {
        venue:{
            type: String,
        },
        ticketrate:{
            type: Number,
        },
        description:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
    }
);
module.exports = mongoose.model("Service",Service);