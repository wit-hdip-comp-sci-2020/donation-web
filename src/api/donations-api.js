import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const donationsApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const donations = db.donationStore.getAllDonations();
      return donations;
    },
  },
  findByCandidate: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const donations = await db.donationStore.getDonationsByCandidate(request.params.id);
      return donations;
    },
  },

  makeDonation: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const candidate = await db.candidateStore.findById(request.params.id);
      if (!candidate) {
        return Boom.notFound("No Candidate with this id");
      }
      const donation = await db.donationStore.donate(
        request.payload.amount,
        request.payload.method,
        request.auth.credentials,
        candidate
      );
      return donation;
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await db.donationStore.deleteAll();
      return { success: true };
    },
  },
};
