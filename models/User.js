const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
   {
    // ======= Old Fields =======
    fullName: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, trim: true },
    OTP: { type: String },
    password: { type: String },
    registeredType: { type: String, default: "user" },
    profileImage: { type: String },

    role: {
      type: String,
      enum: ["user", "admin", "vendor"],
      default: "user",
    },

    // ======= New Fields (Vendor Profile) =======
    brandName: { type: String, trim: true },
    category: { type: String, trim: true }, // e.g. Wedding Planners, Photographers
    contactPersonName: { type: String, trim: true },
    additionalEmail: { type: String, trim: true },
    contactNumbers: [
      {
        type: {
          type: String, // e.g. Mobile, Landline
          default: "Mobile",
        },
        number: { type: String },
      },
    ],
    whatsappNumber: { type: String, trim: true },
    websiteLink: { type: String, trim: true },
    facebookUrl: { type: String, trim: true },
    instagramUrl: { type: String, trim: true },
    youtubeUrl: { type: String, trim: true },
    additionalInfo: { type: String, trim: true },
    city: { type: String, trim: true },

    // ======= Optional Fields for Verification / Timestamps =======
    isVerified: { type: Boolean, default: false },
  },
  
);

module.exports = mongoose.model("User", UserSchema);