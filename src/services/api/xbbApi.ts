import apiSauce from "apisauce";
import { IAggregateScore } from "@/types/aggregate";
import { ISignupDetails, IUserDetails } from "@/types/signup";

const xbbApi = apiSauce.create({
  baseURL: "/api",
});

// READ

// CREATE
const createWeightedScore = (data: IAggregateScore) =>
  xbbApi.post("/aggregate", data);

const signUp = (data: ISignupDetails) => xbbApi.post("/company/register", data);
const logIn = (data: IUserDetails) => xbbApi.post("/company/login", data);

export default {
  signUp,
  logIn,
  createWeightedScore,
};
