const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  OTP: String,
  password: String,
  registeredType: {default:"user" , type: String},
  profileImage: String,

  // vender

  brandName:String,
  city: String,
  venderType: String,
    
});

module.exports = mongoose.model("User", UserSchema);