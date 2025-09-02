const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shotDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Draft"],
      default: "Active",
    },
   
 
    metaTitle: {
      type: String,
      trim: true,
    },
    metaKeyword: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    updatedBy: {
      type: String,
      trim: true,
    },
   
   
  
    date: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },       
);

module.exports = mongoose.model("Blog", BlogSchema);    
