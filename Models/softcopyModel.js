const mongoose=require("mongoose")

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {type: String},
    subjectCode:{type: String},
    subjectDriveLink: {type: String},
    faculty: {type: String},
    semester:{type:String},
}, {timestamps:true}
);

const Softcopy = mongoose.model('SoftcopyNote',subjectSchema);

module.exports = Softcopy;