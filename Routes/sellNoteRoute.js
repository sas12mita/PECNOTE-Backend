const {uploadNotes,
    getNotes,
    getSingleNotes,
    getPhoto,
    deleteNote,
    updateNote,
    noteCount,
    notePerPage,
    searchNote,
    braintreePayment,
    braintreeToken
    }=require("../Controller/sellNotecontroller")
const express=require('express');
const SellNoteRouter=express.Router();
const formidable = require('express-formidable');
SellNoteRouter.route("/uploadNotes").post(formidable(), uploadNotes);
SellNoteRouter.route("/getNotes").get(getNotes);
SellNoteRouter.route("/getNotes/:slug").get(getSingleNotes);
SellNoteRouter.route("/getPhoto/:pid").get(getPhoto);
SellNoteRouter.route("/deleteNote/:pid").get(deleteNote);
SellNoteRouter.route("/updateNote/:pid").put(formidable(),updateNote);
SellNoteRouter.route("/noteCount").get(noteCount);
SellNoteRouter.route("/notePerPage").get(notePerPage);
SellNoteRouter.route("/search/:keyword").get(searchNote);

module.exports = SellNoteRouter