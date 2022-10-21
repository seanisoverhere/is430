import React, { useState } from "react";
import OTP from "@/components/Login/OTP";
import { Form, Formik, Field } from "formik";
import { FaLock } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please input your email address"),
  password: Yup.string().required("Please input your password"),
});

const LoginForm = () => {
  const [isShowOTP, setIsShowOTP] = useState<boolean>(false);
  const [loginFail, setLoginFail] = useState<string>("");

  const handleLogin = (
    emaiL: string,
    password: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setIsShowOTP(true);
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center">
          <img src="/logo.png" alt="Login" className="h-52" />
        </div>
        <h2 className="-mt-6 mb-8 text-center text-3xl font-extrabold text-gray-900">
          {isShowOTP ? "Please verify your OTP" : "Sign in to your account"}
        </h2>
      </div>
      {!isShowOTP ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(value, { setSubmitting }) =>
            handleLogin(value.email, value.password, setSubmitting)
          }
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              <div>
                <label htmlFor="email">Email address</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {touched.email && errors.email && (
                  <div className="text-red-600 text-sm py-2">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {touched.password && errors.password && (
                  <div className="text-red-600 text-sm py-2">
                    {errors.password}
                  </div>
                )}

                {loginFail && (
                  <div className="text-red-600 text-sm py-2">{loginFail}</div>
                )}
              </div>

              <div className="flex items-center justify-between pb-8">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <FaLock
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <CgSpinner className="inline mr-2 w-6 h-6 text-white animate-spin" />
                      <h4 className="text-sm">Signing in...</h4>
                    </div>
                  ) : (
                    <h4 className="text-sm">Sign In</h4>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <div className="text-center pb-10">
            A One-Time Password has been sent to your mobile
          </div>
          <OTP
            autoFocus
            length={6}
            className="flex justify-between items-center"
            inputClassName="w-14 h-14 text-4xl text-center border border-black mb-8"
            onChangeOTP={(otp) => console.log(otp)}
          />
          <div className="pb-8 text-center">
            Don&apos;t have OTP? <span className="font-bold hover:cursor-pointer">Resend</span>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaLock
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            <h4 className="text-sm">Verify</h4>
          </button>
        </>
      )}
    </>
  );
};

export default LoginForm;
