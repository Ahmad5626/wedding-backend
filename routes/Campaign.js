const express= require('express');
const router= express.Router();
const { createCampaign, getCampaigns, getLoginUserCampaigns, updateCampaign, deleteCampaign, addCampaignMessage, addCampaignReview, getCampaignReviews } = require('../controllers/campaign/index');
const { authenticate } = require('../middleware/auth-middleware');



router.post("/create-campaign", createCampaign)
router.post("/add-campaign-message/:id", addCampaignMessage)
router.get("/get-all-campaigns", getCampaigns)
router.get("/get-login-user-campaigns",authenticate, getLoginUserCampaigns)
router.put("/update-campaign/:id", updateCampaign)
router.delete("/delete-campaign/:id", deleteCampaign)

// Add a review
router.post("/campaign/:id/review", addCampaignReview);

// Get all reviews
router.get("/campaign/:id/reviews", getCampaignReviews);

module.exports= router