const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['home', 'college'],
    required: true,
  },
  homeAddress: {
    type: String,
    required: function() { return this.type === 'home'; },
  },
  homePhone: {
    type: String,
    required: function() { return this.type === 'home'; },
  },
  faculty: {
    type: String,
    required: function() { return this.type === 'college'; },
  },
  roomNo: {
    type: String,
    required: function() { return this.type === 'college'; },
  },
});


const Address = mongoose.model('UserAddress',addressSchema);

module.exports = Address;