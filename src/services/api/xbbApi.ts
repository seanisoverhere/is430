import apiSauce from "apisauce";
import { IAggregateScore, ICompanyInfo } from "@/types/aggregate";
import { ISignupDetails, IUserDetails } from "@/types/signup";
import { IMakeLoan } from "@/types/payment";

const xbbApi = apiSauce.create({
  baseURL: "/api",
});

// READ
const getBills = (billId: number) => xbbApi.get(`/bill/${billId}`);
const getTotalLoans = (uuid: number) => xbbApi.get(`/bill/all?uuid=${uuid}`);
const getAllInvoice = (uuid: number) => xbbApi.get(`/invoice/all?uuid=${uuid}`);
const getSingleInvoice = (invoiceId: number) =>
  xbbApi.get(`/invoice/single?invoiceId=${invoiceId}`);

// CREATE
const createWeightedScore = (data: IAggregateScore) =>
  xbbApi.post("/aggregate", data);
const signUp = (data: ISignupDetails) => xbbApi.post("/company/register", data);
const logIn = (data: IUserDetails) => xbbApi.post("/company/login", data);
const getLoan = (data: IMakeLoan) => xbbApi.post("/bill/pay", data);
const payBill = (splitLoanId: number) =>
  xbbApi.post("/bill/individual/pay", splitLoanId);
const getCompanyInfo = (data: ICompanyInfo) =>
  xbbApi.post("/company/score", data);

export default {
  getBills,
  getCompanyInfo,
  getTotalLoans,
  signUp,
  payBill,
  getLoan,
  logIn,
  createWeightedScore,
  getAllInvoice,
  getSingleInvoice,
};
