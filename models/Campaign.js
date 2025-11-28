const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);
const messageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
    city: String,
    message: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const CampaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  vendorType: String,
  image: [],
  video: [],
  price: Number,
  address: String,
  cities :[],
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Reject', 'Terminate'],
    default: 'Pending'
  },
    messages: [messageSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },

      // ✅ New rating system
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },


});

module.exports = mongoose.model("Campaigns", CampaignSchema);