import { assert } from "chai";
import { donationService } from "./donation-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    donationService.clearAuth();
    await donationService.createUser(maggie);
    await donationService.authenticate(maggie);
    await donationService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await donationService.createUser(maggie);
    const response = await donationService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await donationService.createUser(maggie);
    const response = await donationService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    donationService.clearAuth();
    try {
      await donationService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
