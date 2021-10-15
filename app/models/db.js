"use strict";

import * as dotenv from "dotenv";
import * as data from "./seed-data.json";

import Mongoose from "mongoose";
import seeder from "mais-mongoose-seeder";

export function initDB() {
  dotenv.config();

  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  async function seed() {
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
