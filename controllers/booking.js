const ErrorResponse = require("../utils/errorResponse");
const Booking = require("../model/booking");
const asyncHandler = require("../middleware/async");

const path = require("path");


//...................Add Booking................
exports.createBooking = asyncHandler(async (req, res, next) =>{
    const booking = await Booking.create(req.body);

    if(!booking) {
        return next(new ErrorResponse("Error add booking"), 404);
    }

    res.status(201).json({
        success: true,
        data: booking,
    });
});

//............Display Booking..................

exports.getBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.find({});

    res.status(201).json({
        success: true,
        count: booking.length,
        data: booking,
    });
});

//...............Find Bookings By ID...............

exports.getBookingById = asyncHandler(async (req, res, next) =>{
    const booking = await Booking.findById(req.params.id);

    if(!booking){
        return next(new ErrorResponse(" Booking not found"), 404);
    }
    res.status(200).json({
        success: true,
        data: booking,
    });
});

//...............Delete Bookings.................

exports.deleteBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(new ErrorResponse('No Booking Found'), 404);
    }

    await booking.remove();

    res.status(200).json({
        success: true,
        count: booking.length,
        data: {},
    });
});

//................Update Bookings..............
exports.updateBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking){
        return next(new ErrorResponse('No Booking Found'), 404);
    }

    await booking.update();

    res.status(200).json({
        success: true,
        count: booking.length,
        data: {},
    });
});