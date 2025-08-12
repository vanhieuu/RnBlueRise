export enum EGender {
  MALE = 0,
  FEMALE = 1,
}
export enum AuthType {
  BLUESKY_ID = 0,
  CONNECT_ID = 1,
}
export enum AppCenterRole {
  TEACHER = 1,
  STUDENT = 100,
  TEACHER_ASSISTANT = 101,
}
export interface AppCenterInfo {
  connectId: number;
  brandId: number;
  appRoleID: AppCenterRole;
  workingDepartmentCenters: string;
}
export enum DeviceType {
  WEB = 1,
  IOS = 2,
  ANDROID = 3,
  PC = 4,
  MAC = 5,
}

export interface IProfile {
  userID: number;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string | null;
  dateOfBirth: string | null; // ISO date string
  phone: string | null;
  email: string;
  gender: EGender | null;
  createdTime: string; // ISO date string
  identityType: number;
  authType: AuthType;
  appCenterInfo: AppCenterInfo;
}

export interface IAuthStudentInfo {
  connectID: string;
  brandID: string;
  brandName: string;
  brandCode: string;
  code: string;
  fullName: string;
  gender: number;
  avatarUrl: string;
  departmentID: string;
  departmentName: string;
}

export type APIResponse<T = any> = {
  code: number;
  message: string;
  data: T;
};

/** ===== Types mapped from your Mediator version ===== */
export enum CustomerAuthStep {
  SUCCESS = 0,
  CHOOSE_STUDENT = 1,
}

export type CreateOrLoginAccountResponse = {
  accessToken: string;
  refreshToken: string;
  totalRec: any;
};

export type CustomerLoginConnectResponse = {
  step: CustomerAuthStep;
  profile: IProfile;
  accessToken: string;
  refreshToken: string;
  authStudents: IAuthStudentInfo[];
};

export type RefreshTokenResponse = {
  profile: IProfile;
  accessToken: string;
  refreshToken: string;
};

/** ===== Request payloads ===== */
export type CreateAccountRequest = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole: number;
  deviceID: string;
  deviceType: DeviceType;
  pushToken?: string;
};
export enum AuthAccountType {
  TEACHING = 0,
  STUDENT = 1,
}

export type LoginRequest = {
  username: string;
  password: string;
};

export type SendOtpRecoverPasswordRequest = {
  username: string;
};

export type InputRecoverPasswordRequest = {
  username: string;
  token: string;
  otp: string;
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
  pushToken?: string;
};

export type CustomerLoginConnectRequest = {
  customerID: string | number;
  password: string;
  studentConnectID: string | number;
  filterBrandID: number;
};

export type CustomerSwitchStudentRequest = {
  customerID: string | number;
  studentConnectID: string | number;
  filterBrandID: number;
};
