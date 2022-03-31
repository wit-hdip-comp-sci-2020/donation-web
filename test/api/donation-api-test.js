import { assert } from "chai";
import { donationService } from "./donation-service.js";
import { maggie, testCandidates, testDonations } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Donation API tests", () => {
  setup(async () => {
    await donationService.createUser(maggie);
    await donationService.authenticate(maggie);
    await donationService.deleteAllUsers();
    await donationService.createUser(maggie);
    await donationService.authenticate(maggie);
  });
  teardown(async () => {
    await donationService.deleteAllUsers();
  });

  test("create a donation", async () => {
    const returnedCandidate = await donationService.createCandidate(testCandidates[0]);
    await donationService.makeDonation(returnedCandidate._id, testDonations[0]);
    const returnedDonations = await donationService.getDonations(returnedCandidate._id);
    console.log(returnedDonations);
    assert.equal(returnedDonations.length, 1);
    assertSubset(returnedDonations[0], testDonations[0]);
  });
});
