import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";
import { ISignupDetails, IUserDetails } from "@/types/signup";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uuid, setUuid] = useState<number>(0);

  const signUp = async (data: ISignupDetails) => {
    setIsLoading(true);
    const response: ApiResponse<any> = await xbbApi.signUp(data);
    if (response.ok) {
      setUuid(response.data.uuid);
    }
    setIsLoading(false);
  };

  const logIn = async (data: IUserDetails) => {
    const response: ApiResponse<any> = await xbbApi.logIn(data);
    return response;
  };

  return {
    signUp,
    logIn,
    uuid,
    isLoading,
  };
};

export default useSignup;
