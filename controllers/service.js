const ErrorResponse = require("../utils/errorResponse");
const Service = require("../model/service");
const asyncHandler = require("../middleware/async");

const path = require("path");


//...................Add Service................
exports.createService = asyncHandler(async (req, res, next) =>{
    const service = await Service.create(req.body);

    if(!service) {
        return next(new ErrorResponse("Error add service"), 404);
    }

    res.status(201).json({
        success: true,
        data: service,
    });
});

//............Display Service..................

exports.getService = asyncHandler(async (req, res, next) => {
    const service = await Service.find({});

    res.status(201).json({
        success: true,
        count: service.length,
        data: service,
    });
});

//...............Find Service By ID...............

exports.getServiceById = asyncHandler(async (req, res, next) =>{
    const service = await Service.findById(req.params.id);

    if(!service){
        return next(new ErrorResponse(" Service not found"), 404);
    }
    res.status(200).json({
        success: true,
        data: service,
    });
});

//...............Delete Service.................

exports.deleteService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorResponse('No Service Found'), 404);
    }

    await service.remove();

    res.status(200).json({
        success: true,
        count: service.length,
        data: {},
    });
});

//................Update Service..............
exports.updateService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if (!service){
        return next(new ErrorResponse('No Service Found'), 404);
    }

    await service.update();

    res.status(200).json({
        success: true,
        count: service.length,
        data: {},
    });
});