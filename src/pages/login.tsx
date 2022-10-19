import type { NextPage } from "next";
import LoginForm from "@/components/Login/LoginForm";

const Login: NextPage = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2">
        <img src="/splash.jpg" alt="Login Splash" className="h-screen" />
      </div>
      <div className="w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
