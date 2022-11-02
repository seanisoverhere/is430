import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUp = async (data: any) => {
    setIsLoading(true);
    const response: ApiResponse<any> = await xbbApi.signUp(data);
    if (response.ok) {
      console.log(response);
    }
    setIsLoading(false);
  };

  return {
    signUp,
    isLoading,
  };
};

export default useSignup;
