const express = require("express")
const router = express.Router()
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

// Cloudinary config
cloudinary.config({
  cloud_name: "dr267iyg8",
  api_key: "812936637535539",
  api_secret: "-wx8V80JGBli6lDdHNgVKNqJ-KY",
})

// Storage engine for images
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "maximtrip/images",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
    resource_type: "image",
  },
})

// Storage engine for videos
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "maximtrip/videos",
    allowed_formats: ["mp4", "avi", "mov", "wmv", "flv", "webm"],
    resource_type: "video",
  },
})

// Create multer instances
const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for images
  },
})

const uploadVideo = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for videos
  },
})

// Generic upload that handles both images and videos
const genericStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isVideo = file.mimetype.startsWith("video/")
    return {
      folder: isVideo ? "maximtrip/videos" : "maximtrip/images",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo ? ["mp4", "avi", "mov", "wmv", "flv", "webm"] : ["jpg", "png", "jpeg", "gif", "webp"],
    }
  },
})

const uploadGeneric = multer({
  storage: genericStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
})

// Routes
router.post("/upload", uploadGeneric.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      })
    }

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl: req.file.path,
      fileType: req.file.mimetype.startsWith("video/") ? "video" : "image",
      publicId: req.file.filename,
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    })
  }
})

// Specific image upload route
router.post("/upload-image", uploadImage.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      })
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      fileUrl: req.file.path,
      publicId: req.file.filename,
    })
  } catch (error) {
    console.error("Image upload error:", error)
    res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    })
  }
})

// Specific video upload route
router.post("/upload-video", uploadVideo.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No video uploaded",
      })
    }

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      fileUrl: req.file.path,
      publicId: req.file.filename,
    })
  } catch (error) {
    console.error("Video upload error:", error)
    res.status(500).json({
      success: false,
      message: "Video upload failed",
      error: error.message,
    })
  }
})

// Delete file route
router.delete("/delete/:publicId", async (req, res) => {
  try {
    const { publicId } = req.params
    const { resource_type = "image" } = req.query

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resource_type,
    })

    res.status(200).json({
      success: true,
      message: "File deleted successfully",
      result,
    })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    })
  }
})

module.exports = router
