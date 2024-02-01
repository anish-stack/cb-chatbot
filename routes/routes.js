const express = require('express');
const { createQuestionAndAnswer, getAllQuestionAnswer, getUserQuestionAndGiveAnswer } = require('../controllers/QuestionControllers');
const catchAsyncError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
const { CallConfirmBuyers } = require('../controllers/ContactController');

const router = express.Router();

router.post('/create-question-and-answer', catchAsyncError(createQuestionAndAnswer));
router.get('/get-question-and-answer', catchAsyncError(getAllQuestionAnswer));
router.post('/get-question-give-answer/:question', catchAsyncError(getUserQuestionAndGiveAnswer));
router.post('/get-callback-for-questions', catchAsyncError(CallConfirmBuyers));


module.exports = router; // Pass io as a parameter
