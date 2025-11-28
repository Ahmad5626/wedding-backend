const Campaign = require('../../models/Campaign');

const createCampaign = async (req, res) => {
    const { title, description, image, video, price, address,vendorType ,createdBy,cities} = req.body;
   
    try {
        const campaign = await Campaign.create({
            title,
            description,
            image,
            video,
            price,
            vendorType,
            address,
            cities,
            createdBy
        });
        res.status(201).json({
            success: true,
            message: 'Campaign created successfully',
            data: campaign
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getLoginUserCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id });
    res.status(200).json({
      success: true,
      message: 'Campaigns fetched successfully',
      data: campaigns,
    });
  } catch (error) {
    console.error('Error fetching campaigns:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch campaigns',
      error: error.message,
    });
  }
};

const updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Campaign updated successfully',
            data: campaign
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Campaign deleted successfully',
            data: campaign
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addCampaignMessage = async (req, res) => {
  try {
    const { id } = req.params; // campaign id
    const { name, email, mobile, city, message } = req.body;

    // validate
    if (!name || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, and message are required.",
      });
    }

    // find campaign
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res
        .status(404)
        .json({ success: false, message: "Campaign not found" });
    }

    // push message
    campaign.messages.push({ name, email, mobile, city, message });
    await campaign.save();

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: campaign,
    });
  } catch (error) {
    console.error("Error adding message:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


// ✅ Add a new rating/review
const addCampaignReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Name, rating, and comment are required." });
    }

    const campaign = await Campaign.findById(id);
    if (!campaign)
      return res.status(404).json({ success: false, message: "Campaign not found" });

    // Add new review
    campaign.reviews.push({ name, email, rating, comment });

    // Update average rating
    const totalRatings = campaign.reviews.reduce((sum, r) => sum + r.rating, 0);
    campaign.totalReviews = campaign.reviews.length;
    campaign.averageRating = totalRatings / campaign.totalReviews;

    await campaign.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: campaign,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get all reviews for a campaign
const getCampaignReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);
    if (!campaign)
      return res.status(404).json({ success: false, message: "Campaign not found" });

    res.status(200).json({
      success: true,
      reviews: campaign.reviews,
      averageRating: campaign.averageRating,
      totalReviews: campaign.totalReviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
module.exports = { createCampaign, getCampaigns, getLoginUserCampaigns, updateCampaign, deleteCampaign ,addCampaignMessage,addCampaignReview,getCampaignReviews};