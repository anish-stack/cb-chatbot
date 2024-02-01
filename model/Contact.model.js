const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Contact: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    BussinessCategory: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("ContactSchema", ContactSchema);

module.exports = Contact;
