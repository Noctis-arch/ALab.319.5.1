import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    type: String,
    score: Number
  },
  { _id: false }
);

const gradeSchema = new mongoose.Schema({
  learner_id: {
    type: Number,
    required: true
  },
  class_id: {
    type: Number,
    required: true
  },
  scores: [scoreSchema]
});

export default mongoose.model("Grade", gradeSchema);