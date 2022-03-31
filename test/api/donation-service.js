import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const donationService = {
  donationUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.donationUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.donationUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.donationUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.donationUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.donationUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  async createCandidate(newCandidate) {
    const response = await axios.post(`${this.donationUrl}/api/candidates`, newCandidate);
    return response.data;
  },

  async makeDonation(id, donation) {
    const response = await axios.post(`${this.donationUrl}/api/candidates/${id}/donations`, donation);
    return response.data;
  },

  async getDonations(id) {
    const response = await axios.get(`${this.donationUrl}/api/candidates/${id}/donations`);
    return response.data;
  },
};
