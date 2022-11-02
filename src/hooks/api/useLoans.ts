import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";
import { IAggregateScore } from "@/types/aggregate";

const useLoans = () => {
  const [aggregatedScore, setAggregatedScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getAggregatedScore = async (data: IAggregateScore) => {
    setIsLoading(true);
    const response: ApiResponse<any> = await xbbApi.createWeightedScore(data);
    if (response.status === 200) {
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  return {
    getAggregatedScore,
    isSuccess,
    aggregatedScore,
    isLoading,
  };
};

export default useLoans;
