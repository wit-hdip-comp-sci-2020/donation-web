import Mongoose from "mongoose";

const { Schema } = Mongoose;

const candidateSchema = Schema({
  firstName: String,
  lastName: String,
  office: String,
});

export const Candidate = Mongoose.model("Candidate", candidateSchema);
