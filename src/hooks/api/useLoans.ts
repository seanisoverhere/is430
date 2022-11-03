import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";
import { IAggregateScore } from "@/types/aggregate";
import { IMakeLoan } from "@/types/payment";

const useLoans = () => {
  const [aggregatedScore, setAggregatedScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAggregatedScore = async (data: IAggregateScore) => {
    setIsLoading(true);
    const response: ApiResponse<any> = await xbbApi.createWeightedScore(data);
    if (response.ok) {
      setAggregatedScore(response.data.result);
    }
    setIsLoading(false);
    return response;
  };

  const getLoan = async (data: IMakeLoan) => {
    const response: ApiResponse<any> = await xbbApi.getLoan(data);
    return response;
  };

  return {
    getLoan,
    getAggregatedScore,
    aggregatedScore,
    isLoading,
  };
};

export default useLoans;
