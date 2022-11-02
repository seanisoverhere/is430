import apiSauce from "apisauce";
import { IAggregateScore } from "@/types/aggregate";

const xbbApi = apiSauce.create({
  baseURL: "/api",
});

// READ

// CREATE
const createWeightedScore = (data: IAggregateScore) =>
  xbbApi.post("/aggregate", data);

export default {
  createWeightedScore,
};
