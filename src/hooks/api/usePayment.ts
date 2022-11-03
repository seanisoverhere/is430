import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";

const usePayment = () => {
  const [bill, setBill] = useState<any>();
  const [totalLoans, setTotalLoans] = useState<any>();
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

  const payBill = async (splitLoanId: number) => {
    const response: ApiResponse<any> = await xbbApi.payBill(splitLoanId);
    if (response.status === 200) {
      return response.data;
    }
  };

  return {
    bill,
    isBillLoading,
    isTotalLoansLoading,
    totalLoans,
    payBill,
    getBill,
    getTotalLoans,
  };
};

export default usePayment;
