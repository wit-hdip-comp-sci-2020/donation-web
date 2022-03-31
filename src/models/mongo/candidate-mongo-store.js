import { Candidate } from "./candidate.js";

export const candidateMongoStore = {
  async getAllCandidates() {
    const candidates = await Candidate.find().lean();
    return candidates;
  },

  async findById(id) {
    const candidate = await Candidate.findOne({ _id: id }).lean();
    return candidate;
  },

  async findByName(lastName, firstName) {
    const candidate = await Candidate.findOne({
      lastName,
      firstName,
    });
    return candidate;
  },
};
