
const softCopyModel = require("../Models/softcopyModel");
require("dotenv").config();
const getNotes = async (req, res) => {
    try {
      const notes= await softCopyModel.find({});
      if(notes){
        res.json(notes);
        
      }
      else{
        res.send("notes not availables");
      }
    
    } catch (error) {
  
    }
  }
 
const postNotes = async (req, res) => {
    try {
      const response = req.body;
  
      const softcopy = await softCopyModel.create(response);
      if(softcopy)
      {
        res.json({status:true})
      }
      else{
      res.json({ status:false })
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
const admin_auth = async (req, res) => {
    try {
      res.status(200).send({ ok: true });
    } catch (error) {
  
    }
  }

  module.exports = {  postNotes, admin_auth, getNotes};