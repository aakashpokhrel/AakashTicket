const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Admin = require("../model/admin");
const crypto = require("crypto");

//--------------------------REGISTER USER-----------------

exports.register = asyncHandler(async (req, res, next) => {
  const { fname,lname,username,email,password } = req.body;
  const admin = await Admin.create({
   fname,
   lname,
   email,
   username,
   password,
  });

  sendTokenResponse(admin, 200, res);
});

//-------------------LOGIN-------------------

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Please provide username and password"), 400);
  }

  // Check admin
  const admin = await Admin.findOne({ username: username }).select("+password");
  //because in password field we have set the property select:false , but here we need as password so we added + sign

  if (!admin) {
    res
    .status(201)
    .json({
      success: false,
      message: 'Invalid credentails admin',
    });  
  }


  
  if (admin.password!= password) {
    res
    .status(201)
    .json({
      success: false,
      message: 'Invalid credentails',
    });
  }
 else{
  sendTokenResponse(admin, 200, res);
}
});

//------------------LOGOUT--------------
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: "Admin Logged out",
  });
});

//-------------------------CURRENT Admin DETAILS-----------

exports.getMe = asyncHandler(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id);
  res.status(200).json({
    success: true,
    data: admin,
  });
});

// Get token from model , create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
 
  const token = admin.getSignedJwtToken();

  const options = {
    //Cookie will expire in 30 days
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Cookie security is false .if you want https then use this code. do not use in development time
  if (process.env.NODE_ENV === "proc") {
    options.secure = true;
  }

  //we have created a cookie with a token
  res
    .status(statusCode)
    .cookie("token", token, options) // key , value ,options
    .json({
      success: true,
      token,
    });

};
