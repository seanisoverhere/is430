import apiSauce from "apisauce";
import { IAggregateScore } from "@/types/aggregate";
import { ISignupDetails, IUserDetails } from "@/types/signup";
import { IMakeLoan } from "@/types/payment";

const xbbApi = apiSauce.create({
  baseURL: "/api",
});

// READ
const getBills = (billId: number) => xbbApi.get(`/bills${billId}`);
const getTotalLoans = (uuid: number) => xbbApi.get(`/bill/all?uuid=${uuid}`);

// CREATE
const createWeightedScore = (data: IAggregateScore) =>
  xbbApi.post("/aggregate", data);
const signUp = (data: ISignupDetails) => xbbApi.post("/company/register", data);
const logIn = (data: IUserDetails) => xbbApi.post("/company/login", data);
const getLoan = (data: IMakeLoan) => xbbApi.post("/bill/pay", data);

export default {
  getBills,
  getTotalLoans,
  signUp,
  getLoan,
  logIn,
  createWeightedScore,
};
