import Mongoose from "mongoose";

const { Schema } = Mongoose;

const donationSchema = new Schema({
  amount: Number,
  method: String,
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
  },
});

export const Donation = Mongoose.model("Donation", donationSchema);
