export type IUserDetails = {
  email: string;
  password: string;
};

export type ISignupDetails = IUserDetails & {
  companyName: string;
  uenNo: string;
};
