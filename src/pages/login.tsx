import type { NextPage } from "next";
import OTP from "@/components/Login/OTP";

const Login: NextPage = () => {
  return (
    <div className='bg-black min-h-screen'>
      Login Page
      <OTP
        autoFocus
        length={6}
        className="flex justify-between items-center"
        inputClassName="w-14 h-14 text-4xl text-center"
        onChangeOTP={(otp) => console.log(otp)}
      />
    </div>
  );
};

export default Login;
