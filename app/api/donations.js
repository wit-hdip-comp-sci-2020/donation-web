"use strict";

import { Donation } from "../models/donation.js";
import { Candidate } from "../models/candidate.js";
import Boom from "@hapi/boom";
import { getUserIdFromRequest } from "./utils.js";

export const Donations = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const donations = await Donation.find().populate("candidate").populate("donor");
      return donations;
    },
  },
  findByCandidate: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const donations = await Donation.find({ candidate: request.params.id });
      return donations;
    },
  },

  makeDonation: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const userId = getUserIdFromRequest(request);
      let donation = new Donation(request.payload);
      const candidate = await Candidate.findOne({ _id: request.params.id });
      if (!candidate) {
        return Boom.notFound("No Candidate with this id");
      }
      donation.candidate = candidate._id;
      donation.donor = userId;
      donation = await donation.save();
      return donation;
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await Donation.deleteMany({});
      return { success: true };
    },
  },
};
