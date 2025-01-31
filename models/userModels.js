// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     },
//     phone: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     resetPasswordOtp: {
//         type: Number,
//         default: null
//     },
//     resetPasswordExpires: {
//         type: Date,
//         default: null
//     },
//     loginAttempts: {
//         type: Number,
//         default: 0
//     },
//     lockUntil:{
//         type: Date,
//         default: null,
//     },
//     passwordHistory:{
//         type: [String],
//         default: [],
//     },
//     passwordLastChanged:{
//         type: Date,
//         default: null,
//     },
// })

// // Add a virtual field to calculate if the user is currently locked
// userSchema.virtual("isLocked").get(function () {
//     return this.lockUntil && this.lockUntil > Date.now();
//   });
   
//   // Add pre-save middleware to limit password history
//   userSchema.pre("save", async function (next) {
//     const PASSWORD_HISTORY_LIMIT = 5; // Max number of past passwords to store
//     if (this.isModified("password")) {
//       // Ensure the password history only keeps the last `PASSWORD_HISTORY_LIMIT` entries
//       if (this.passwordHistory.length >= PASSWORD_HISTORY_LIMIT) {
//         this.passwordHistory.shift(); // Remove the oldest password
//       }
//       this.passwordHistory.push(this.password); // Add the new password to history
//       this.passwordLastChanged = Date.now(); // Update the password change timestamp
//     }
//     next();
//   });

// const User = mongoose.model('users', userSchema)
// module.exports = User;

const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordOTP: {
    type: Number,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
  loginAttempts: {
    type: Number,
    default: 0, // Track the number of failed login attempts
  },
  lockUntil: {
    type: Date, // Lockout expiration timestamp
    default: null,
  },
  passwordHistory: {
    type: [String], // Array to store hashed passwords for reuse prevention
    default: [],
  },
  passwordLastChanged: {
    type: Date, // Track the last time the password was changed
    default: null,
  },
  isLoggedIn: { // Newly added field
    type: Boolean,
    default: false,
  },
  twoFactorOTP: { // New Field for 2FA OTP
    type: Number,
    default: null,
  },
  twoFactorExpires: { // New Field for 2FA OTP Expiry
    type: Date,
    default: null,
  },
  isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationTokenExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
 
// Add a virtual field to calculate if the user is currently locked
userSchema.virtual("isLocked").get(function () {
  return this.lockUntil && this.lockUntil > Date.now();
});
 
// Add pre-save middleware to limit password history
userSchema.pre("save", async function (next) {
  const PASSWORD_HISTORY_LIMIT = 5; // Max number of past passwords to store
  if (this.isModified("password")) {
    // Ensure the password history only keeps the last `PASSWORD_HISTORY_LIMIT` entries
    if (this.passwordHistory.length >= PASSWORD_HISTORY_LIMIT) {
      this.passwordHistory.shift(); // Remove the oldest password
    }
    this.passwordHistory.push(this.password); // Add the new password to history
    this.passwordLastChanged = Date.now(); // Update the password change timestamp
  }
  next();
});
 
const User = mongoose.model("users", userSchema);
 
module.exports = User;