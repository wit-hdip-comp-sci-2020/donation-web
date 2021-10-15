"use strict";

import { assert } from "chai";
import { DonationService } from "./donation-service.js";
import * as fixtures from "./fixtures.json";
import lowdash from "lodash";

suite("Donation API tests", function () {
  let donations = fixtures.default.donations;
  let newCandidate = fixtures.default.newCandidate;
  let newUser = fixtures.default.newUser;

  const donationService = new DonationService(fixtures.default.donationService);

  suiteSetup(async function () {
    await donationService.deleteAllUsers();
    const returnedUser = await donationService.createUser(newUser);
    const response = await donationService.authenticate(newUser);
  });

  suiteTeardown(async function () {
    await donationService.deleteAllUsers();
    donationService.clearAuth();
  });

  setup(async function () {
    donationService.deleteAllCandidates();
    donationService.deleteAllDonations();
  });

  teardown(async function () {});

  test("create a donation", async function () {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    await donationService.makeDonation(returnedCandidate._id, donations[0]);
    const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    console.log(returnedDonations);
    assert.equal(returnedDonations.length, 1);
    assert(lowdash.some([returnedDonations[0]], donations[0]), "returned donation must be a superset of donation");
  });

  test("create multiple donations", async function () {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    for (var i = 0; i < donations.length; i++) {
      await donationService.makeDonation(returnedCandidate._id, donations[i]);
    }

    const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    assert.equal(returnedDonations.length, donations.length);
    for (var i = 0; i < donations.length; i++) {
      assert(lowdash.some([returnedDonations[i]], donations[i]), "returned donation must be a superset of donation");
    }
  });

  test("delete all donations", async function () {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    for (var i = 0; i < donations.length; i++) {
      await donationService.makeDonation(returnedCandidate._id, donations[i]);
    }

    const d1 = await donationService.getDonations(returnedCandidate._id);
    assert.equal(d1.length, donations.length);
    await donationService.deleteAllDonations();
    const d2 = await donationService.getDonations(returnedCandidate._id);
    assert.equal(d2.length, 0);
  });

  test("create a donation and check donor", async function () {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    await donationService.makeDonation(returnedCandidate._id, donations[0]);
    const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    assert.isDefined(returnedDonations[0].donor);

    const users = await donationService.getUsers();
    assert(lowdash.some([users[0]], newUser), "returnedUser must be a superset of newUser");
  });
});
