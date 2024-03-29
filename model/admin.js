const crypto = require("crypto"); //to generate the token and hash it
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : [true,'Enter firstname']
    },
    lname : {
      type : String,
      required : [true,'Enter lastname']
  },
    username : {
        type: String,
        unique : true,
        require:[true,'Enter username']
    },
    email : {
      type : String,
      required : [true,'Enter email']
  },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false, // it will not return the password when quering
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
});

AdminSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  //Match user entered password to hashed password in database
  AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  //Generate and hash password token
  AdminSchema.methods.getResetPasswordToken = function () {
    //Generate the token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    //set expire time to 10 minutes
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
  module.exports = mongoose.model("Admin", AdminSchema);