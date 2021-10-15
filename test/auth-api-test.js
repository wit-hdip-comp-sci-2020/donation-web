"use strict";

import { assert } from "chai";
import { DonationService } from "./donation-service.js";
import * as fixtures from "./fixtures.json";
import { decodeToken } from "../app/api/utils.js";

suite("Authentication API tests", function () {
  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const donationService = new DonationService(fixtures.default.donationService);

  setup(async function () {
    await donationService.deleteAllUsers();
  });

  test("authenticate", async function () {
    const returnedUser = await donationService.createUser(newUser);
    const response = await donationService.authenticate(newUser);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async function () {
    const returnedUser = await donationService.createUser(newUser);
    const response = await donationService.authenticate(newUser);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
