const express = require("express");
const router = express.Router();

const {
    createBooking,
    getBooking,
    getBookingById,
    deleteBooking,
} = require("../controllers/booking");

const { protect } = require("../middleware/auth");

router
.route("/")
.get(protect,getBooking)
.post(protect,createBooking);

router
.route("/:id")
.get(protect,getBookingById)
.delete(protect,deleteBooking);

module.exports = router