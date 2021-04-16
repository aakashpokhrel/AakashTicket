const express = require("express");
const router = express.Router();

const {
    createBooking,
    getBooking,
    getBookingById,
    deleteBooking,
    updateBooking,
} = require("../controllers/booking");

const { protect } = require("../middleware/auth");

router
.route("/")
.get(protect,getBooking)
.post(protect,createBooking);

router
.route("/:id")
.get(protect,getBookingById)
.delete(protect,deleteBooking)
.put(protect,updateBooking);

module.exports = router