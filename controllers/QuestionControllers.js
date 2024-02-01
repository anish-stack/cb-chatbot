const catchAsyncError = require("../middleware/CatchAsync");
const Questionmodel = require("../model/Question.model");
const NodeCache = require("node-cache");
const cache = new NodeCache();



// create-question-and-answer
exports.createQuestionAndAnswer = catchAsyncError(async (req, res) => {
  try {
    const data = req.body;

    // Check if the request body is an array
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ error: "Invalid request body. Expected an array." });
    }

    // Create an array to store the saved documents
    const savedQuestions = [];

    // Loop through each element in the array and save it to the database
    for (const item of data) {
      const { question, answer } = item;

      // Check if any element is missing 'question' or 'answer' property
      if (!question || !answer) {
        console.error("Element missing 'question' or 'answer':", item);
        return res.status(400).json({
          error:
            'Each element in the array must have both "question" and "answer" properties.',
        });
      }

      const newQuestion = new Questionmodel({
        question,
        answer,
      });

      // Save the document and push it to the array
      const savedQuestion = await newQuestion.save();
      savedQuestions.push(savedQuestion);
    }

    res.status(201).json({ success: true, data: savedQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getAllQuestionAnswer = catchAsyncError(async (req, res) => {
  try {
    const cachedData = cache.get("QuestionAndAnswer");
    if (cachedData) {
      console.log("All QuestionAndAnswer data served from cache");
      return res.status(200).json({
        success: true,
        message: "All QuestionAndAnswer retrieved successfully",
        QuestionAndAnswer: cachedData,
      });
    }

    const questionAndAnswer = await Questionmodel.find();

    //check the length of question and ans

    if (!questionAndAnswer.length > 0) {
      throw new NotFoundError("No questions found");
    }

    // Store data in cache with a time-to-live (TTL) of 1 hour (in seconds)
    cache.set("QuestionAndAnswer", questionAndAnswer, 3600);

    console.log("All questionAndAnswer data fetched from the database");

    res.status(200).json({
      success: true,
      message: "All questionAndAnswer retrieved successfully",
      QuestionAndAnswer: questionAndAnswer,
    });
  } catch (error) {}
});


exports.getUserQuestionAndGiveAnswer = catchAsyncError(async (req,res)=>{

  try {
    const userQuestion = req.params.question;
    console.log(userQuestion)
    if(!userQuestion){
      return res.status(400).json({
        success: false,
        msg: "Invalid request"
      })
    }
    const exactAnswer = await Questionmodel.findOne({ question: new RegExp(userQuestion.trim(), 'i') });
    
    if (exactAnswer) {
      res.json(
        { msg:"get answer  by your question",
          answer: exactAnswer.answer }
        );
    } else{
      res.json({ answer: 'Sorry, I don\'t have an answer for that.' });
      
    }


  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }


})
