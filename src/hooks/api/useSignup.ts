import { useState } from "react";
import xbbApi from "@/services/api/xbbApi";
import { ApiResponse } from "apisauce";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uuid, setUuid] = useState<number>(0);

  const signUp = async (data: any) => {
    setIsLoading(true);
    const response: ApiResponse<any> = await xbbApi.signUp(data);
    if (response.ok) {
      setUuid(response.data.uuid);
    }
    setIsLoading(false);
  };

  return {
    signUp,
    uuid,
    isLoading,
  };
};

export default useSignup;
