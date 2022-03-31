import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { donationService } from "./donation-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    donationService.clearAuth();
    await donationService.createUser(maggie);
    await donationService.authenticate(maggieCredentials);
    await donationService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await donationService.createUser(testUsers[i]);
    }
    await donationService.createUser(maggie);
    await donationService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await donationService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await donationService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await donationService.deleteAllUsers();
    await donationService.createUser(maggie);
    await donationService.authenticate(maggieCredentials);
    returnedUsers = await donationService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await donationService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await donationService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await donationService.deleteAllUsers();
    await donationService.createUser(maggie);
    await donationService.authenticate(maggieCredentials);
    try {
      const returnedUser = await donationService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
