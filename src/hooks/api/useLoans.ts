import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";
import { IMakeLoan } from "@/types/payment";

const useLoans = () => {
  const getLoan = async (data: IMakeLoan) => {
    const response: ApiResponse<any> = await xbbApi.getLoan(data);
    return response;
  };

  return {
    getLoan,
  };
};

export default useLoans;
