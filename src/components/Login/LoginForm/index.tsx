import React from "react";
import OTP from "@/components/Login/OTP";

const LoginForm = () => {
  return (
    <div>
      Login Form
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
