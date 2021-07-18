const mongoose = require('mongoose')
// const crypto = require("crypto");
// const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    passKey: {
      type: String,
      required: true,
    },
    
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);