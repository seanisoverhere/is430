import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";
import { ICompanyInfo } from "@/types/aggregate";

const useCompany = () => {
  const [companyInfo, setCompanyInfo] = useState<any>();

  const getCompanyInfo = async (data: ICompanyInfo) => {
    const response: ApiResponse<any> = await xbbApi.getCompanyInfo(data);
    if (response) {
      setCompanyInfo(response.data.company);
    }
  };

  return {
    companyInfo,
    getCompanyInfo,
  };
};

export default useCompany;
