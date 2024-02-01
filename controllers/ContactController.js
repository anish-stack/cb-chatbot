const ContactModel = require("../model/Contact.model");
const catchAsyncError = require("../middleware/CatchAsync");

exports.CallConfirmBuyers = catchAsyncError(async (req, res) => {
  try {
    const { Name, Contact, Email, BussinessCategory } = req.body;

    if (!Name || !Contact || !Email || !BussinessCategory) {
      return res.status(400).json({
        status: false,
        msg: "Please Fill All Fields",
      });
    }

    const ContactS = new ContactModel({
      Name: Name,
      Contact: Contact,
      Email: Email,
      Bussiness_category: BussinessCategory,
    });

    await ContactS.save();

    console.log("Data Save Successfully");

    res.status(201).json({
      status: true,
      msg: "Contact Us",
    });
  } catch (error) {
    console.log(`Server Error ${error}`);
    res.status(500).json({
      status: false,
      msg: `Server Error ${error}`,
    });
  }
});
