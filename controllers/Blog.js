const Blog = require("../models/Blog");

const createBlog = async (req,res) => {
 const { title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription}=req.body

try {
      const data = new Blog({title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription});
  await data.save();
  res.status(200).json({
    success: true,
    message: "Blog created successfully",
    data,
  });
} catch (error) {
    res.status(400).json({
    success: false,
    message: "Blog not created",
    error,
  });
}
};

const updateBlog=async(req,res)=>{
    const {id}=req.params
    const {title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription}=req.body
    try {
        const data=await Blog.findByIdAndUpdate(id,{title, image, description, date, shotDescription,slug,status,metaTitle,metaKeyword,metaDescription},{new:true})
        res.status(200).json({
            success:true,
            message:"Blog updated successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Blog not updated",
            error
        })
    }
}

const getBlog=async(req,res)=>{
    try {
        const data=await Blog.find()
        res.status(200).json({
            success:true,
            message:"Blog fetched successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Blog not fetched",
            error
        })
    }
}
const deleteBlog=async(req,res)=>{
    const {id}=req.params
    try {
        const data=await Blog.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Blog deleted successfully",
            data
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Blog not deleted",
            error
        })
    }
}
module.exports={createBlog,getBlog,deleteBlog,updateBlog}