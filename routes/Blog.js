const express=require("express")
const router=express.Router()
const {createBlog,getBlog,deleteBlog, updateBlog}=require("../controllers/Blog")
router.post("/create-blog",createBlog)
router.get("/get-blog",getBlog)
router.put("/update-blog/:id",updateBlog)
router.delete("/delete-blog/:id",deleteBlog)
module.exports=router