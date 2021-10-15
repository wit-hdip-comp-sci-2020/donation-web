"use strict";

import * as dotenv from "dotenv";
import * as data from "./seed-data.json";

import Mongoose from "mongoose";
import { Donation } from "./donation.js";
import { Candidate } from "./candidate.js";
import { User } from "./user.js";
import seeder from "mais-mongoose-seeder";

export function initDB() {
  dotenv.config();

  Mongoose.set("useNewUrlParser", true);
  Mongoose.set("useUnifiedTopology", true);

  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  async function seed() {
    // var seed = seeder(Mongoose);
    const users = await User.find();
    const candidates = await Candidate.find();
    const donations = await Donation.find();
    const dbData = await seeder(Mongoose).seed(data.default, { dropDatabase: false, dropCollections: true });
    console.log(dbData);
  }

  db.on("error", function (err) {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", function () {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });
}
