import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";

const usePayment = () => {
  const [bill, setBill] = useState<number>(0);
  const [totalLoans, setTotalLoans] = useState<number>(0);
  const [isBillLoading, setIsBillLoading] = useState<boolean>(false);
  const [isTotalLoansLoading, setIsTotalLoansLoading] =
    useState<boolean>(false);

  const getBill = async (billId: number) => {
    setIsBillLoading(true);
    const response: ApiResponse<any> = await xbbApi.getBills(billId);
    if (response.status === 200) {
      setBill(response.data);
    }
    setIsBillLoading(false);
  };

  const getTotalLoans = async (uuid: number) => {
    setIsTotalLoansLoading(true);
    const response: ApiResponse<any> = await xbbApi.getTotalLoans(uuid);
    if (response.status === 200) {
      setTotalLoans(response.data);
    }
    setIsTotalLoansLoading(false);
  };

  return {
    bill,
    isBillLoading,
    isTotalLoansLoading,
    totalLoans,
    getBill,
    getTotalLoans,
  };
};

export default usePayment;
