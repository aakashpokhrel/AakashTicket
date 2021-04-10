const ErrorResponse = require("../utils/errorResponse");
const Show = require("../model/show");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE show------------------

exports.createShow = asyncHandler(async (req, res, next) => {

  const show = await Show.create(req.body);

  if (!show) {
    return next(new ErrorResponse("Error adding show"), 404);
  }

  res.status(201).json({
    success: true,
    data: show,
  });
});

//-------------------Display all show

exports.getShow = asyncHandler(async (req, res, next) => {
    const show = await Show.find({});
  
    res.status(201).json({
      success: true,
      count: show.length,
      data: show,
    });
  });

  // -----------------FIND show BY ID-------------------

exports.getShowById = asyncHandler(async (req, res, next) => {
    const show = await Show.findById(req.params.id);
  
    if (!show) {
      return next(new ErrorResponse("show not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: show,
    });
  });

  // -----------------DELETE SHOW------------------------

exports.deleteShow = asyncHandler(async (req, res, next) => {
    const show = await Show.findById(req.params.id);
  
    if (!show) {
      return next(new ErrorResponse(`No show found `), 404);
    }
  
    await show.remove();
  
    res.status(200).json({
      success: true,
      count: show.length,
      data: {},
    });
  });


  //-------------------UPDATE Show---------------------
  exports.updateShow= asyncHandler(async (req, res, next) => {
    const show = await Show.findById(req.params.id);
  
    if (!show) {
      return next(new ErrorResponse(`No show found `), 404);
    }
  
    await show.put();
  
    res.status(200).json({
      success: true,
      count: show.length,
      data: {},
    });
  });

  // ------------------UPLOAD IMAGE-----------------------

exports.ShowPhotoUpload = asyncHandler(async (req, res, next) => {
    const show = await Show.findById(req.params.id);
  
    console.log(show);
    if (!show) {
      return next(new ErrorResponse(`No show found with ${req.params.id}`), 404);
    }
  
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo and accept any extension of an image
    // if (!file.mimetype.startsWith("image")) {
    //   return next(new ErrorResponse(`Please upload an image`, 400));
    // }
  
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.name = `photo_${show.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        //console.err(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      //insert the filename into database
      await Show.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
    });
  
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });