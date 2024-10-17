const noteBookModel = require("../Models/noteBookModel");
const fs=require("fs-extra")
const slugify=require("slugify")
const uploadNotes= async (req,res)=>
{
   try {
    const {name,slug,description,price,discountPrice,quantity}=req.fields;
    const {photo}=req.files;
    const note = new noteBookModel({ ...req.fields,slug: slugify(name) });
    if (photo) {
        note.photo.data = fs.readFileSync(photo.path);
        note.photo.contentType = photo.type;
    }
   // console.log(photo)
    await note.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      
    });
    console.log(note)
   } catch (error) {
    console.log(error)
   }
}
const getNotes= async (req, res) => {
  try {
    const notes = await noteBookModel
      .find({})
      .select("-photo")
      .limit(20)
      .sort({ createdAt: -1 });
    
    res.status(200).send({
      success: true,
      counTotal: notes.length,
      message: "All Notes ",
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
 const getSingleNotes = async (req, res) => {
  try {
    const note = await noteBookModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
    res.status(200).json({
      success: true,
      message: "Single note Fetched",
      note,
    });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

const getPhoto = async (req, res) => {
  try {
    const note = await noteBookModel.findById(req.params.pid).select("photo");
    if (note.photo.data) {
      res.set("Content-type", note.photo.contentType);
      return res.status(200).send(note.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};
const deleteNote = async (req, res) => {
  try {
    await noteBookModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

const updateNote= async (req,res)=>
{
   try {
    const {name,slug,description,price,discountPrice,quantity,shipping}=req.fields;
    const {photo}=req.files;

    const note = await noteBookModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
        note.photo.data = fs.readFileSync(photo.path);
        note.photo.contentType = photo.type;
    }
    console.log(note)

    await note.save();
    res.status(201).send({
      success: true,
      message: "Product update Successfully",
      note,
    });
   } catch (error) {
    console.log(error)
   }
}
const noteCount=async(req,res)=>
  {
try{
  const total = await noteBookModel.find({}).estimatedDocumentCount();
  res.status(200).send({
    success: true,
    total,
  });

}catch(e)
  {
    console.log(e)
  }
  }
  const notePerPage = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
      const note = await noteBookModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        note,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };
  const searchNote = async (req, res) => {
    try {
   res.send("hello i m from search")
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
module.exports = {
   uploadNotes,
  getNotes, 
  getSingleNotes,
  getPhoto,
  deleteNote,
  updateNote,
  noteCount,
  notePerPage,
  searchNote};