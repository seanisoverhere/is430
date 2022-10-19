import React, { useState } from "react";
import OTP from "@/components/Login/OTP";

const LoginForm = () => {
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  return (
    <div className="my-24">
      <OTP
        autoFocus
        length={6}
        className="flex justify-between items-center"
        inputClassName="w-14 h-14 text-4xl text-center border border-black"
        onChangeOTP={(otp) => console.log(otp)}
      />
    </div>
  );
};

export default LoginForm;
