import { userMongoStore } from "./mongo/user-mongo-store.js";
import { donationMongoStore } from "./mongo/donation-mongo-store.js";
import { candidateMongoStore } from "./mongo/candidate-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.donationStore = donationMongoStore;
        this.candidateStore = candidateMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};
