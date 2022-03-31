import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWNkNjhlMzU4NTA1NmVmZDg5YmJiYyIsImVtYWlsIjoiaG9tZXJAc2ltcHNvbi5jb20iLCJpYXQiOjE2NDYwNTcyNDQsImV4cCI6MTY0NjA2MDg0NH0.NAxgOOzfjtYDwb2-x0iuiCOhEgCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

export const DonationSpec = Joi.object()
    .keys({
      amount: Joi.number().required(),
      method: Joi.string().required(),
      candidate: Joi.string().required(),
    })
    .label("Donation");

export const DonationSpecPlus = DonationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("DonationPlus");

export const DonationArray = Joi.array().items(DonationSpecPlus).label("DonationArray");
